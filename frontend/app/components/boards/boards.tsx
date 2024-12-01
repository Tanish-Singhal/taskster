"use client";

import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import React, { useEffect, useState } from "react";
import { TriangleAlert } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/redux-hooks";
import { Skeleton } from "@/components/ui/skeleton";
import ColumnSkeleton from "./ColumnSkeleton";
import CreateColumnButton from "./CreateColumnButton";
import Column from "./Column";
import { fetchColumn } from "@/store/slices/columnSlice/columnSlice";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Boards = () => {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const { columns } = useAppSelector((state) => state.column);
  const { currentBoard, loading, error } = useAppSelector((state) => state.board);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

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

          <CreateColumnButton />
        </div>

        <div className="space-y-4">
          <hr className="border-border/70" />
          <div className="flex justify-between items-center">
            <div className="relative">
              <Input
                placeholder="Search Task"
                className="w-[150px] md:w-[200px] text-sm pr-8"
                value={searchTerm}
                onChange={handleSearch}
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  ×
                </button>
              )}
            </div>
            <div>
              <Select>
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <hr className="border-border/70" />
        </div>
      </div>

      {columns.length === 0 ? (
        <div className="h-[50vh] w-full flex justify-center items-center flex-col gap-4">
          <h2 className="text-3xl lg:text-4xl text-muted-foreground">
            Create your first column to get started
          </h2>
        </div>
      ) : (
        <ScrollArea className="w-full">
          <div className="flex gap-3 md:gap-4 pb-4">
            {columns.map((column) => (
              <Column
                title={column.name}
                key={column._id}
                id={column._id}
                searchTerm={searchTerm}
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
