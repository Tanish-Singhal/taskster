import { Skeleton } from "@/components/ui/skeleton";

export function UserSkeleton() {
  return (
    <div className="flex items-center space-x-4 p-2">
      <Skeleton className="h-8 w-8 rounded-lg" />

      <div className="flex-1 space-y-1">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-32" />
      </div>

      <Skeleton className="h-4 w-4" />
    </div>
  );
}
