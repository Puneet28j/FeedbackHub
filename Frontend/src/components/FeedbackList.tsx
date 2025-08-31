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
}: FeedbackListProps) {
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
                {items.map((fb) => (
                  <FeedbackCard key={fb._id} {...fb} />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
  }

  return (
    <div className="grid gap-4">
      {feedbacks.map((fb) => (
        <FeedbackCard key={fb._id} {...fb} />
      ))}
    </div>
  );
}
