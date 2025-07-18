import React from "react";

export default function HistoryList({ history, onClose }) {
  return (
    <div className="mt-6 p-4 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800">
      <h3 className="text-lg font-semibold mb-3 text-blue-700 dark:text-blue-400">
        Edit History
      </h3>
      {history.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          No previous versions found.
        </p>
      ) : (
        history.map((rev, index) => (
          <div
            key={index}
            className="mb-4 border-b border-gray-200 dark:border-gray-700 pb-3"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Edited on: {new Date(rev.updatedAt).toLocaleString()}
            </p>
            <p className="font-semibold mt-1 text-gray-800 dark:text-gray-100">
              {rev.title}
            </p>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
              {rev.content}
            </p>
          </div>
        ))
      )}
      <button
        onClick={onClose}
        className="mt-4 text-sm text-red-600 dark:text-red-400 hover:underline"
      >
        Close History
      </button>
    </div>
  );
}
