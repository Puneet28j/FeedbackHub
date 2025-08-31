export interface Feedback {
  _id: string;
  title: string;
  description: string;
  category: "Bug" | "Improvement" | "Feature";
  upvoters?: string[];
  user?: { _id: string; name: string; email: string };
}

export interface FeedbackPageProps {
  refreshTrigger?: number;
}
export interface FeedbackListProps {
  feedbacks: Feedback[];
  grouped: Record<string, Feedback[]>;
  groupBy: string;
}

export interface FeedbackControlsProps {
  search: string;
  setSearch: (val: string) => void;
  category: string;
  setCategory: (val: string) => void;
  sortBy: string;
  setSortBy: (val: string) => void;
  groupBy: string;
  setGroupBy: (val: string) => void;
}
export type Category = "Bug" | "Improvement" | "Feature" | string;
