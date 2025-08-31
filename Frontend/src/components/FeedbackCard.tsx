import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCategoryBadgeColors } from "@/lib/utils";
import type { Feedback } from "@/Types";
import { ThumbsUp } from "lucide-react";
import { useState } from "react";
import { Badge } from "./ui/badge";
import { toast } from "sonner";

const FeedbackCard = (fb: Feedback) => {
  const [upvoters, setUpvoters] = useState(fb.upvoters);

  const userId = localStorage.getItem("userId") || "";

  const hasUpvoted = upvoters?.some((id) => id.toString() === userId);

  const handleUpvote = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/feedbacks/${fb._id}/upvote`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.ok) {
        const updated = await res.json();
        setUpvoters(updated.upvoters);
        toast.success(
          hasUpvoted ? "Upvoted successfully" : "Voted successfully"
        );
      } else {
        const err = await res.json();
        console.error(err.message || "Failed to upvote");
      }
    } catch (error) {
      console.error("Error upvoting:", error);
    }
  };

  return (
    <Card
      key={fb._id}
      className="rounded-xl bg-zinc-900 text-white border border-zinc-800 hover:border-zinc-700 hover:shadow-md transition-colors"
    >
      <CardHeader className="flex justify-between items-start">
        <div>
          <CardTitle className="text-base font-medium">{fb.title}</CardTitle>
          <p className="text-xs text-zinc-500">
            By {fb.user?.name || "Anonymous"}
          </p>
        </div>
        <div className="flex gap-1.5">
          <Badge
            variant="outline"
            className={`${getCategoryBadgeColors(
              fb.category
            )} text-[10px] rounded-md px-2`}
          >
            {fb.category}
          </Badge>
          {fb.user?._id === userId && (
            <Badge className="bg-blue-600 text-white text-[10px] rounded-md px-2">
              My
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="pb-4 flex flex-col gap-4">
        <p className="text-sm text-zinc-300">{fb.description}</p>

        {/* Upvote Section */}
        <div className="flex justify-end">
          <button
            onClick={handleUpvote}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium shadow-sm transition-all
        ${
          hasUpvoted
            ? "bg-blue-600 border-blue-700 text-white hover:bg-blue-700"
            : "bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-white"
        }`}
          >
            <ThumbsUp
              className={`w-4 h-4 transition-transform ${
                hasUpvoted ? "scale-110" : "scale-100"
              }`}
            />
            <span>{upvoters?.length || 0}</span>
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedbackCard;
