import { useEffect, useState } from "react";
import FeedbackControls from "./FeedbackControls";
import FeedbackList from "./FeedbackList";
import type { Feedback, FeedbackPageProps } from "@/Types";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function FeedbackPage({ refreshTrigger }: FeedbackPageProps) {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [grouped, setGrouped] = useState<Record<string, Feedback[]>>({});
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [groupBy, setGroupBy] = useState<string>("none");
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [pagination, setPagination] = useState<{
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  });

  const fetchFeedbacks = async () => {
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (category && category !== "All") params.append("category", category);
    if (sortBy) params.append("sortBy", sortBy);
    if (groupBy) params.append("groupBy", groupBy);
    params.append("page", page.toString());
    params.append("limit", limit.toString());
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/feedbacks?${params.toString()}`
      );
      const data = await res.json();

      if (groupBy === "category" && data.grouped) {
        setGrouped(data.grouped);
        setFeedbacks([]);
        setPagination(
          data.pagination || {
            total: 0,
            page: 1,
            limit: 10,
            totalPages: 1,
          }
        );
      } else {
        setFeedbacks(data.feedbacks || []);
        setGrouped({});
        setPagination(
          data.pagination || {
            total: 0,
            page: 1,
            limit: 10,
            totalPages: 1,
          }
        );
      }
    } catch (error) {
      console.error("Failed to fetch feedbacks:", error);
    }
  };

  useEffect(() => {
    setPage(1); // Reset to first page on filter/sort/group change
  }, [search, category, sortBy, groupBy]);

  useEffect(() => {
    fetchFeedbacks();
  }, [search, category, sortBy, groupBy, page, limit]);

  useEffect(() => {
    if (refreshTrigger && refreshTrigger > 0) {
      fetchFeedbacks();
    }
  }, [refreshTrigger]);

  // Simple pagination controls
  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () =>
    setPage((p) => Math.min(pagination.totalPages, p + 1));

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
      <FeedbackList
        feedbacks={feedbacks}
        grouped={grouped}
        groupBy={groupBy}
        search={search}
        category={category}
      />

      {/* Pagination Controls */}
      <Pagination className="mt-6">
        <PaginationContent className="flex items-center gap-2">
          {/* Prev Button */}
          <PaginationItem>
            <PaginationPrevious
              onClick={handlePrev}
              className={`cursor-pointer rounded-md bg-zinc-900 text-white px-3 py-2 transition hover:bg-zinc-800 ${
                page === 1
                  ? "pointer-events-none opacity-50 cursor-not-allowed"
                  : ""
              }`}
            />
          </PaginationItem>

          {/* Page Numbers */}
          {Array.from({ length: pagination.totalPages }, (_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                isActive={page === i + 1}
                onClick={() => setPage(i + 1)}
                className={`rounded-md px-3 py-2 cursor-pointer transition ${
                  page === i + 1
                    ? "bg-white text-black font-semibold shadow-md"
                    : "bg-zinc-900 text-white hover:bg-zinc-800"
                }`}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* Next Button */}
          <PaginationItem>
            <PaginationNext
              onClick={handleNext}
              className={`cursor-pointer rounded-md bg-zinc-900 text-white px-3 py-2 transition hover:bg-zinc-800 ${
                page === pagination.totalPages
                  ? "pointer-events-none opacity-50 cursor-not-allowed"
                  : ""
              }`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
