import { Skeleton } from "@/components/ui/skeleton";

const ColumnSkeleton = () => {
  return (
    <div className="border w-72 md:w-80 h-[calc(100vh-17rem)] bg-sidebar rounded-lg flex flex-col">
      <div className="p-3 md:p-4 flex justify-between items-center">
        <Skeleton className="h-6 w-32" />
        <div className="flex space-x-3">
          <Skeleton className="h-6 w-6 rounded-md" />
          <Skeleton className="h-6 w-6 rounded-md" />
        </div>
      </div>
      <hr className="border-muted" />
      <div className="px-4 py-3 space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-28 w-full rounded-md" />
        ))}
      </div>
    </div>
  );
}

export default ColumnSkeleton;
