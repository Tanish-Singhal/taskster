import { Skeleton } from "@/components/ui/skeleton";

export function BoardSkeleton() {
  return (
    <div className="flex items-center">
      <Skeleton className="h-44 w-full sm:w-72 p-3 flex flex-col justify-end rounded-md"></Skeleton>
    </div>
  );
}
