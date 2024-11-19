"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import React, { useEffect } from "react";
import { Search, TriangleAlert } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/redux-hooks";
import { Skeleton } from "@/components/ui/skeleton";
import ColumnSkeleton from "./ColumnSkeleton";
import CreateColumnDialog from "./CreateColumnButton";
import Column from "./Column";
import { fetchColumn } from "@/store/slices/columnSlice/columnSlice";

const Boards = () => {
  const dispatch = useAppDispatch();
  const { columns } = useAppSelector((state) => state.column);
  const { currentBoard, loading, error } = useAppSelector((state) => state.board);

  useEffect(() => {
    if (currentBoard && currentBoard._id) {
      dispatch(fetchColumn(currentBoard._id));
    }
  }, [dispatch, currentBoard]);

  if (loading) {
    return (
      <div className="h-full flex flex-col space-y-6">
        <div className="flex-none space-y-6">
          <div className="flex justify-between items-center space-x-5">
            <Skeleton className="h-12 w-64" />
            <Skeleton className="h-9 w-28" />
          </div>

          <div className="space-y-4">
            <hr className="border-border/70" />
            <div className="flex justify-between items-center">
              <div className="flex gap-3 items-center">
                <Skeleton className="h-9 w-20" />
                <Skeleton className="h-9 w-20" />
              </div>
              <div className="flex gap-3 items-center">
                <Skeleton className="h-9 w-20" />
                <Skeleton className="h-9 w-40" />
              </div>
            </div>
            <hr className="border-border/70" />
          </div>
        </div>

        <ScrollArea className="w-full">
          <div className="flex gap-3 md:gap-4 pb-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <ColumnSkeleton key={i} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="bg-muted/50" />
        </ScrollArea>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-full flex justify-center items-center flex-col gap-4 text-3xl text-neutral-500 pb-40">
        <TriangleAlert size={50} />
        <h1>Something Went Wrong</h1>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex-none space-y-6">
        <div className="flex justify-between items-center space-x-5">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            {currentBoard?.name}
          </h1>

          <CreateColumnDialog />
        </div>

        <div className="space-y-4">
          <hr className="border-border/70" />
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <Button variant="outline" size="sm">
                Board
              </Button>
              <Button variant="outline" size="sm">
                List
              </Button>
            </div>
            <div className="flex gap-3 items-center">
              <Button variant="outline" size="sm">
                Filter
              </Button>
              <div className="hidden sm:block">
                <Input placeholder="Search Task" className="w-[150px] md:w-[200px] text-sm" />
              </div>
              <Button variant="outline" size="icon" className="sm:hidden">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <hr className="border-border/70" />
        </div>
      </div>

      {columns.length === 0 ? (
        <div className="h-[50vh] w-full flex justify-center items-center flex-col gap-4">
          <h2 className="text-3xl lg:text-4xl text-muted-foreground">Create your first column to get started</h2>
        </div>
      ) : (
        <ScrollArea className="w-full">
          <div className="flex gap-3 md:gap-4 pb-4">
            {columns.map((column) => (
              <Column
               title={column.name}
               key={column._id}
               id={column._id} 
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="bg-muted/50" />
        </ScrollArea>
      )}
    </div>
  );
};

export default Boards;
