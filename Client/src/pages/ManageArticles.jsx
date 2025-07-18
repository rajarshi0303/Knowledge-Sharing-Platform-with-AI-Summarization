import React, { useEffect, useState } from "react";
import axios from "@/lib/axios";
import ArticleForm from "../components/ArticleForm";
import MyArticles from "../components/MyArticles";

export default function ManageArticles() {
  const [articles, setArticles] = useState([]);
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [editId, setEditId] = useState(null);

  const fetchArticles = async () => {
    try {
      const res = await axios.get("/api/articles/my");
      setArticles(res.data);
    } catch (err) {
      console.error("Error fetching articles:", err);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) return;

    try {
      if (editId) {
        await axios.put(`/api/articles/${editId}`, formData);
      } else {
        await axios.post("/api/articles", formData);
      }

      setFormData({ title: "", content: "" });
      setEditId(null);
      fetchArticles();
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  const handleEdit = (article) => {
    window.scrollTo(0, 0);
    setFormData({ title: article.title, content: article.content });
    setEditId(article._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/articles/${id}`);
      fetchArticles();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="max-w-4xl mx-auto space-y-10">
        <ArticleForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          isEditing={!!editId}
          cancelEdit={() => {
            setEditId(null);
            setFormData({ title: "", content: "" });
          }}
        />
        <MyArticles
          articles={articles}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
