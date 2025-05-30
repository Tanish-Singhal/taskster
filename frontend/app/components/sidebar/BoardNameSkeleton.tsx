import { Skeleton } from "@/components/ui/skeleton";

export function BoardNameSkeleton() {
  return (
    <div className="flex items-center space-x-3 p-2">
      <Skeleton className="h-6 w-52" />
    </div>
  );
}
