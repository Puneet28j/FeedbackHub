import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FeedbackControlsProps } from "@/Types";
import { Search } from "lucide-react";

export default function FeedbackControls({
  search,
  setSearch,
  category,
  setCategory,
  sortBy,
  setSortBy,
  groupBy,
  setGroupBy,
}: FeedbackControlsProps) {
  return (
    <div className="w-full bg-white dark:bg-zinc-900 border rounded-lg p-3 space-y-3">
      {/* Search */}
      <SearchBox search={search} setSearch={setSearch} />

      {/* Filters - Compact row */}
      <div className="flex gap-2">
        <Select onValueChange={setCategory} value={category}>
          <SelectTrigger className="flex-1 h-9 text-sm">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Bug">Bug</SelectItem>
            <SelectItem value="Improvement">Improvement</SelectItem>
            <SelectItem value="Feature">Feature</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={setSortBy} value={sortBy}>
          <SelectTrigger className="flex-1 h-9 text-sm">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={setGroupBy} value={groupBy}>
          <SelectTrigger className="flex-1 h-9 text-sm">
            <SelectValue placeholder="Group" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="category">Category</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export function SearchBox({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (val: string) => void;
}) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
      <Input
        placeholder="Search feedback..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="pl-9 h-9 text-sm"
      />
    </div>
  );
}
