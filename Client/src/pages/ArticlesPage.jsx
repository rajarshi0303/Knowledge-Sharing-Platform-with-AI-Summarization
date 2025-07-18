import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import ArticleCard from "../components/ArticleCard";

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios
      .get("/api/articles")
      .then((res) => setArticles(res.data))
      .catch((err) => console.error("Error fetching articles:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 text-center mb-8">
          🌍 All Knowledge Articles
        </h2>
        {articles.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 text-lg mt-20">
            No articles found.
          </div>
        ) : (
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
