import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors duration-300">
      <section className="flex-1 flex flex-col justify-center items-center text-center px-6 py-20">
        <h2 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-4">
          Share Knowledge, Learn Smarter
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mb-6">
          Create articles, get AI-powered summaries, and collaborate through
          version-controlled edits. Powered by MERN + AI.
        </p>
        <div>
          <Link
            to="/articles"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Explore Articles
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white dark:bg-gray-800 py-16 px-6 transition-colors">
        <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-12">
          Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <FeatureCard
            title="Create & Manage Articles"
            description="Write knowledge pieces with a rich editor and manage your content in your dashboard."
          />
          <FeatureCard
            title="AI Summarization"
            description="Use AI to generate quick summaries for better understanding and review."
          />
          <FeatureCard
            title="Version History"
            description="See every change made to an article over time with full revision logs."
          />
        </div>
      </section>
    </div>
  );
}

const FeatureCard = ({ title, description }) => (
  <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow hover:shadow-lg transition duration-300 bg-white dark:bg-gray-700">
    <h4 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
      {title}
    </h4>
    <p className="text-gray-600 dark:text-gray-300">{description}</p>
  </div>
);
