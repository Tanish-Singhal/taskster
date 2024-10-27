import { Skeleton } from "@/components/ui/skeleton";

export function BoardSkeleton() {
  return (
    <div className="flex gap-4 flex-wrap justify-center md:justify-start">
      <Skeleton className="h-44 w-80 sm:w-[17.5rem] p-3 flex flex-col justify-end rounded-md"></Skeleton>
    </div>
  );
}
