import React from "react";

export default function ArticleForm({
  formData,
  setFormData,
  onSubmit,
  isEditing,
  cancelEdit,
}) {
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
        {isEditing ? "Edit Article" : "Create Article"}
      </h2>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-3 py-2 mt-1"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Content
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows={5}
            className="w-full border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-3 py-2 mt-1"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            {isEditing ? "Update" : "Create"}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={cancelEdit}
              className="bg-gray-300 text-gray-800 hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500 px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
