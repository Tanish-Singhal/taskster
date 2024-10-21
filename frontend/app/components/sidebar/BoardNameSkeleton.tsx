import { Skeleton } from "@/components/ui/skeleton";

export function BoardNameSkeleton() {
  return (
    <div className="flex items-center space-x-4 p-2">
      <Skeleton className="h-3 w-32" />
    </div>
  );
}
