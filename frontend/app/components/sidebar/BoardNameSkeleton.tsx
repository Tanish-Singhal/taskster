import { Skeleton } from "@/components/ui/skeleton";

export function BoardNameSkeleton() {
  return (
    <div className="flex items-center space-x-3 p-2">
      <Skeleton className="h-4 w-32" />
    </div>
  );
}
