import React from "react";

export default function MyArticlesCard({ article, onEdit, onDelete }) {
  return (
    <div className="bg-white dark:bg-gray-800 px-6 py-8 rounded shadow space-y-2">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-lg font-semibold text-blue-700 dark:text-blue-400 truncate overflow-hidden whitespace-nowrap max-w-[60%] md:max-w-[80%]">
          {article.title}
        </h4>
        <div className="space-x-2 flex-shrink-0">
          <button
            onClick={() => onEdit(article)}
            className="text-sm text-white bg-yellow-500 px-3 py-1 rounded hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(article._id)}
            className="text-sm text-white bg-red-500 px-3 py-1 rounded hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
        {article.content}
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Created: {new Date(article.createdAt).toLocaleString()}
      </p>
    </div>
  );
}
