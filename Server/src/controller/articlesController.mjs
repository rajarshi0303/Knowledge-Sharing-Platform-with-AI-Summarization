import axios from "axios";
import Article from "../models/Article.mjs";

// Create a new article
export const createArticle = async (req, res) => {
  const { title, content } = req.body;
  const createdBy = req.user.id;

  try {
    const article = await Article.create({ title, content, createdBy });
    res.status(201).json(article);
  } catch (err) {
    res.status(500).json({ message: "Error creating article" });
  }
};

// Get all articles
export const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find()
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });
    res.json(articles);
  } catch (err) {
    console.error("Error fetching articles:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get articles created by the logged-in user
export const getMyArticles = async (req, res) => {
  const userId = req.user.id;

  try {
    const articles = await Article.find({ createdBy: userId }).sort({
      createdAt: -1,
    });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: "Error fetching articles" });
  }
};

// Get a single article by ID
export const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate(
      "createdBy",
      "name"
    );
    if (!article) return res.status(404).json({ message: "Article not found" });
    res.json(article);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get article revision history
export const getArticleHistory = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) return res.status(404).json({ message: "Article not found" });

    const isAuthor = article.createdBy.toString() === req.user.id;
    const isAdmin = req.user.role === "admin";

    if (!isAuthor && !isAdmin) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.json(article.revisions || []);
  } catch (err) {
    console.error("Error fetching history:", err);
    res.status(500).json({ message: "Server error while fetching history" });
  }
};

// Update an article
export const updateArticle = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const article = await Article.findById(id);
    if (!article) return res.status(404).json({ message: "Not found" });

    if (article.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Only create a revision if the content or title has changed
    const isTitleChanged = article.title !== title;
    const isContentChanged = article.content !== content;

    if (!isTitleChanged && !isContentChanged) {
      return res.status(400).json({ message: "No changes detected" });
    }

    // Save current version to history before updating
    article.revisions.push({
      title: article.title,
      content: article.content,
      updatedAt: new Date(),
    });

    article.title = title;
    article.content = content;

    await article.save();
    res.json(article);
  } catch (err) {
    console.error("Edit error:", err);
    res.status(500).json({ message: "Edit failed" });
  }
};

// Delete an article
export const deleteArticle = async (req, res) => {
  const { id } = req.params;

  try {
    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    if (article.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await article.deleteOne();
    res.json({ message: "Article deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Server error during delete" });
  }
};

export const generateSummary = async (req, res) => {
  const { id } = req.params;

  try {
    const article = await Article.findById(id);
    if (!article) return res.status(404).json({ message: "Article not found" });

    if (article.summary) {
      return res.json({ summary: article.summary }); // Return cached summary
    }

    // Call Hugging Face Inference API
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
      { inputs: article.content.slice(0, 1024) }, // truncate long text
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
        },
      }
    );

    const summary = response.data?.[0]?.summary_text || "No summary available";

    // Save to DB
    article.summary = summary;
    await article.save();

    res.json({ summary });
  } catch (err) {
    console.error("Summarization failed:", err?.response?.data || err.message);
    res.status(500).json({ message: "Failed to generate summary" });
  }
};
