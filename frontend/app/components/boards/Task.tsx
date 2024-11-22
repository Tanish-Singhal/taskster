"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Calendar, Edit2, Trash2 } from "lucide-react";
import React from "react";

interface Task {
  _id: string;
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
  status: string;
  tags: string[];
  deadline?: string;
  columnId: string;
}

interface TaskProps {
  task: Task;
}

const Task = ({ task }: TaskProps) => {
  return (
    <Card className="group relative overflow-hidden transition-all hover:border-ring/50 dark:bg-secondary/70">
      <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500" />

      <CardHeader className="p-3 pb-2 space-y-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold text-base">Design System</h3>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
          Create a consistent look and feel for the application
        </p>
      </CardHeader>

      <CardContent className="p-3 pt-0">
        <div className="flex flex-wrap gap-1.5">
          <Badge
            variant="outline"
            className="px-2 py-0.5 text-indigo-800 bg-indigo-400 transition-colors"
          >
            Design
          </Badge>
          <Badge
            variant="outline"
            className="px-2 py-0.5 text-green-800 bg-green-400 transition-colors"
          >
            Frontend
          </Badge>
          <Badge
            variant="outline"
            className="px-2 py-0.5 text-yellow-800 bg-yellow-400 transition-colors"
          >
            Backend
          </Badge>
        </div>
      </CardContent>

      <hr />

      <CardFooter className="p-2">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center text-xs font-medium text-muted-foreground bg-muted/50 px-2 py-1 rounded-md">
            <Calendar className="mr-1 h-3 w-3" />
            20 Nov
          </div>
          <div className="flex gap-1 transition-all duration-200 opacity-0 group-hover:opacity-100">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-primary/20 hover:text-primary"
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-red-600 text-red-500 hover:text-white"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Task;
