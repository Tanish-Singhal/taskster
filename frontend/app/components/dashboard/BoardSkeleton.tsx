import { Skeleton } from "@/components/ui/skeleton";

export function BoardSkeleton() {
  return (
    <div className="flex items-center space-x-4 p-2">
      <Skeleton className="h-44 w-72 p-3 flex flex-col justify-end rounded-md"></Skeleton>
    </div>
  );
}
