import { useEffect, useState } from "react";
import FeedbackControls from "./FeedbackControls";
import FeedbackList from "./FeedbackList";
import type { Feedback, FeedbackPageProps } from "@/Types";

export default function FeedbackPage({ refreshTrigger }: FeedbackPageProps) {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [grouped, setGrouped] = useState<Record<string, Feedback[]>>({});
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [groupBy, setGroupBy] = useState<string>("none");

  const fetchFeedbacks = async () => {
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (category && category !== "All") params.append("category", category);
    if (sortBy) params.append("sortBy", sortBy);
    if (groupBy) params.append("groupBy", groupBy);

    try {
      const res = await fetch(
        `http://localhost:5000/api/feedbacks?${params.toString()}`
      );
      const data = await res.json();

      if (groupBy === "category" && data.grouped) {
        setGrouped(data.grouped);
        setFeedbacks([]);
      } else {
        setFeedbacks(data.feedbacks || []);
        setGrouped({});
      }
    } catch (error) {
      console.error("Failed to fetch feedbacks:", error);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, [search, category, sortBy, groupBy]);

  useEffect(() => {
    if (refreshTrigger && refreshTrigger > 0) {
      fetchFeedbacks();
    }
  }, [refreshTrigger]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Feedback Board
        </h1>
      </div>

      {/* Controls */}
      <FeedbackControls
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
        groupBy={groupBy}
        setGroupBy={setGroupBy}
      />

      {/* Feedback List */}
      <FeedbackList feedbacks={feedbacks} grouped={grouped} groupBy={groupBy} />
    </div>
  );
}
