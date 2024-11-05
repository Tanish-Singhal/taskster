"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import React from "react";
import Column from "./Column";
import { Search } from "lucide-react";

const Boards = () => {
  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex-none space-y-6">
        <div className="flex justify-between items-center space-x-5">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Testing is boring an
          </h1>
          <Button variant="default" size="sm">
            Create Column
          </Button>
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

      <ScrollArea className="w-full ">
        <div className="flex gap-3 md:gap-4 pb-4">
          <Column key="column-1" title="Backlog" />
          <Column key="column-2" title="TODO" />
          <Column key="column-3" title="In Progress" />
          <Column key="column-4" title="Feedback" />
          <Column key="column-5" title="Testing" />
          <Column key="column-6" title="Deploy" />
          <Column key="column-7" title="Done" />
        </div>
        <ScrollBar orientation="horizontal" className="bg-muted/50" />
      </ScrollArea>
    </div>
  );
};

export default Boards;
