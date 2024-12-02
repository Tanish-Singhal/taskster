"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Calendar, Edit2, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { format } from "date-fns";
import { formatNames } from "@/lib/utils";
import ViewTaskDialog from "./ViewTaskDialog";
import EditTaskDialog from "./EditTaskDialog";
import { useAppDispatch } from "@/store/redux-hooks";
import { deleteTask } from "@/store/slices/taskSlice/taskSlice";
import DeleteTaskAlert from "./DeleteTaskAlert";
import type { Task } from "@/types";

interface TaskProps {
  task: Task;
  searchTerm?: string;
  priorityFilter?: string | undefined;
}

const getTagColor = (tag: string) => {
  const colorSchemes = {
    short: "bg-blue-400 text-blue-700 border-blue-500",
    medium: "bg-purple-400 text-purple-700 border-purple-500",
    long: "bg-green-400 text-green-700 border-green-500",
    veryLong: "bg-orange-400 text-orange-700 border-orange-500"
  };

  if (tag.length <= 3) return colorSchemes.short;
  if (tag.length <= 6) return colorSchemes.medium;
  if (tag.length <= 9) return colorSchemes.long;
  return colorSchemes.veryLong;
};

const Task = ({ task, searchTerm = "", priorityFilter = "" }: TaskProps) => {
  const dispatch = useAppDispatch();
  const [showDetails, setShowDetails] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const formattedDeadline = format(new Date(task.deadline), "MMM d");
  const formattedTitle = formatNames(task.title);

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowEdit(true);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteAlert(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setIsDeleting(true);
      await dispatch(deleteTask(task._id)).unwrap();
      setShowDeleteAlert(false);
    } catch {
      // Error will be handled by the toast in the thunk
    } finally {
      setIsDeleting(false);
    }
  };

  const matchesSearch = searchTerm ? 
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) : true;

  const matchesPriority = !priorityFilter || priorityFilter === 'all' || task.priority === priorityFilter;
  
  if (!matchesSearch || !matchesPriority) {
    return null;
  }

  return (
    <>
      <Card 
        className="group relative overflow-hidden transition-all hover:border-ring/50 dark:bg-secondary/70 cursor-pointer max-w-[280px]"
        onClick={() => setShowDetails(true)}
      >
        <div className="absolute top-2 right-2 w-2 h-2">
          {task.priority === 'high' && <div className="w-full h-full bg-red-500 rounded-full" />}
        </div>

        <CardHeader className="p-3 pb-2 space-y-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1 max-w-[240px]">
              <h3 className="font-semibold text-base break-words line-clamp-2">{formattedTitle}</h3>
            </div>  
          </div>
        </CardHeader>

        {task.tags.length > 0 && (
          <CardContent className="p-3 pt-0">
            <div className="space-x-1">
              {task.tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className={`px-2 py-0.5 transition-colors ${getTagColor(tag)}`}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        )}

        <hr />

        <CardFooter className="p-2">
          <div className="flex w-full items-center justify-between">
            {formattedDeadline && (
              <div className="flex items-center text-xs font-medium text-muted-foreground bg-muted/50 px-2 py-1 rounded-md">
                <Calendar className="mr-1 h-3 w-3" />
                {formattedDeadline}
              </div>
            )}
            <div className="flex gap-1 transition-all duration-200 opacity-0 group-hover:opacity-100">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-primary/20 hover:text-primary"
                      onClick={handleEdit}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Edit task</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-red-600 text-red-500 hover:text-white"
                      onClick={handleDelete}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Delete task</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </CardFooter>
      </Card>
      <ViewTaskDialog 
        task={task}
        open={showDetails}
        onOpenChange={setShowDetails}
      />
      <EditTaskDialog 
        task={task}
        open={showEdit}
        onOpenChange={setShowEdit}
      />
      <DeleteTaskAlert
        open={showDeleteAlert}
        onOpenChange={setShowDeleteAlert}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
      />
    </>
  );
};

export default Task;
