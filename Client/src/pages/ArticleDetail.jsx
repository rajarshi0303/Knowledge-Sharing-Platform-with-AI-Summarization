import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import axios from "@/lib/axios";

import HistoryList from "@/components/HistoryList";

export default function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [summary, setSummary] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const user = useAuthStore((state) => state.user);

  const fetchArticle = async () => {
    try {
      const res = await axios.get(`/api/articles/${id}`);
      setArticle(res.data);
      setSummary(res.data.summary || "");
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load article.");
    }
  };

  const handleSummarize = async () => {
    setLoadingSummary(true);
    try {
      const res = await axios.get(`/api/articles/${id}/summary`);
      setSummary(res.data.summary);
    } catch (err) {
      console.error("Summary error:", err);
      setError("Failed to generate summary.");
    } finally {
      setLoadingSummary(false);
    }
  };

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const fetchHistory = async () => {
    try {
      const res = await axios.get(`/api/articles/${id}/history`);
      setHistory(res.data);
      setShowHistory(true);
    } catch (err) {
      console.error("History error:", err);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-600 text-lg">
        {error}
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-500 text-lg">
        Loading article...
      </div>
    );
  }
  //console.log(article);

  const isAuthorOrAdmin =
    user && (user.role === "admin" || user.id === article.createdBy._id);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-10">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-400 mb-2">
          {article.title}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          by {article.createdBy?.name || "Unknown"} •{" "}
          {new Date(article.createdAt).toLocaleString()}
        </p>

        <p className="text-gray-800 dark:text-gray-200 whitespace-pre-line leading-relaxed mb-6">
          {article.content}
        </p>

        <button
          onClick={handleSummarize}
          disabled={loadingSummary}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50 dark:bg-green-500 dark:hover:bg-green-600"
        >
          {loadingSummary ? "Summarizing..." : "🧠 Generate Summary"}
        </button>

        {isAuthorOrAdmin && (
          <button
            onClick={fetchHistory}
            className="ml-4 bg-gray-300 text-black px-2 py-2 text-md md:px-5 md:py-2 rounded hover:bg-gray-400 mt-4 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
          >
            View History
          </button>
        )}

        {summary && <SummaryBox summary={summary} />}

        {showHistory && (
          <HistoryList
            history={history}
            onClose={() => setShowHistory(false)}
          />
        )}
      </div>
    </div>
  );
}

const SummaryBox = ({ summary }) => (
  <div className="mt-8 p-2 md:p-4 bg-gray-100 dark:bg-gray-700 border-l-4 border-green-500 rounded">
    <h2 className="font-semibold md:text-lg mb-2 text-green-700 dark:text-green-400">
      Summary:
    </h2>
    <p className="text-gray-700 dark:text-gray-200">{summary}</p>
  </div>
);
