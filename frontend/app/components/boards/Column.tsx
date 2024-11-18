"use client";

import React, { useState } from "react";
import Task from "./Task";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MoreHorizontal, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch } from "@/store/redux-hooks";
import DeleteColumnDialog from "./DeleteColumnDialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { deleteColumn } from "@/store/slices/columnSlice/columnSlice";

interface ColumnProps {
  id: string;
  title: string;
  // tasks: string[];
}

const Column = ({ id, title }: ColumnProps) => {
  const dispatch = useAppDispatch();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDeleteColumn = async () => {
    await dispatch(deleteColumn(id));
    setIsDeleteDialogOpen(false);
  };

  return (
    <div>
      <div className="border w-72 md:w-80 h-[calc(100vh-17rem)] bg-sidebar/60 text-sidebar-foreground rounded-lg flex flex-col">
        <div className="p-3 md:p-4 flex justify-between items-center">
          <span className="font-semibold text-lg">{title}</span>
          <div className="flex space-x-3 items-center">
            <TooltipProvider>
              <Dialog>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 hover:bg-muted-foreground/30"
                      >
                        <Plus className="h-6 w-6" />
                      </Button>
                    </DialogTrigger>
                  </TooltipTrigger>
                  <TooltipContent>Add new Task</TooltipContent>
                </Tooltip>
                <DialogContent>
                  <DialogHeader>
                    <div className="flex justify-between items-center">
                      <DialogTitle>Create new Task</DialogTitle>
                      <X className="h-6 w-6" />
                    </div>
                    <DialogDescription>
                      Fill in the details below to create a new task.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button type="submit">Create</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 hover:bg-muted-foreground/30"
                  >
                    <MoreHorizontal className="h-6 w-6" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Rename Column</DropdownMenuItem>
                  <DropdownMenuItem>Clear all Tasks</DropdownMenuItem>
                  <DropdownMenuItem
                    className="bg-red-600 text-white focus:bg-red-700 focus:text-white"
                    onClick={() => setIsDeleteDialogOpen(true)}
                  >
                    Delete Column
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TooltipProvider>
          </div>
        </div>
        <hr />
        <ScrollArea className="px-4 py-3">
          <div className="space-y-3">
            <Task key="task-1" />
            <Task key="task-2" />
            <Task key="task-3" />
            <Task key="task-4" />
            <Task key="task-5" />
          </div>
        </ScrollArea>
      </div>

      <DeleteColumnDialog 
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        columnId={id}
      />
    </div>
  );
};

export default Column;
