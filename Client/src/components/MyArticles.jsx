import MyArticlesCard from "./MyArticlesCard";

export default function MyArticles({ articles, onEdit, onDelete }) {
  return (
    <div className="mt-10">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Your Articles
      </h3>
      {articles.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No articles found.</p>
      ) : (
        <div className="space-y-4">
          {articles.map((article) => (
            <MyArticlesCard
              key={article._id}
              article={article}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
