import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FeedbackListProps } from "@/Types";
import FeedbackCard from "./FeedbackCard";

export default function FeedbackList({
  feedbacks,
  grouped,
  groupBy,
  search,
  category,
}: FeedbackListProps) {
  // Empty state for grouped view
  if (groupBy === "category" && Object.keys(grouped).length > 0) {
    return (
      <Accordion type="multiple" className="w-full">
        {Object.entries(grouped).map(([cat, items]) => (
          <AccordionItem value={cat} key={cat}>
            <AccordionTrigger>
              {cat} ({items.length})
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-4">
                {items.length === 0 ? (
                  <div className="text-center text-zinc-400 py-8">
                    No feedback in this category.
                  </div>
                ) : (
                  items.map((fb) => <FeedbackCard key={fb._id} {...fb} />)
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
  }

  // Empty state for ungrouped view
  if (feedbacks.length === 0) {
    let message = "No feedback to display yet. Be the first to add one!";
    if (search || (category && category !== "All")) {
      message = "No feedback found matching your criteria.";
    }
    return <div className="text-center text-zinc-400 py-12">{message}</div>;
  }

  return (
    <div className="grid gap-4">
      {feedbacks.map((fb) => (
        <FeedbackCard key={fb._id} {...fb} />
      ))}
    </div>
  );
}
