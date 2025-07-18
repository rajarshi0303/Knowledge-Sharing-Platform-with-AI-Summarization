import React from "react";
import { Link } from "react-router-dom";

export default function ArticleCard({ article }) {
  return (
    <Link
      to={`/articles/${article._id}`}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition"
    >
      <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-2">
        {article.title}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
        by {article.createdBy?.name || "Unknown"} •{" "}
        {new Date(article.createdAt).toLocaleDateString()}
      </p>
      <p className="text-gray-700 dark:text-gray-300 line-clamp-4">
        {article.content}
      </p>
    </Link>
  );
}
