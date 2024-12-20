"use client";

import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/redux-hooks";
import { fetchTasks } from "@/store/slices/taskSlice/taskSlice";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteColumnDialog from "./DeleteColumnDialog";
import RenameColumnDialog from "./RenameColumnDialog";
import AddTaskDialog from "./AddTaskDialog";
import TaskComponent from "./Task";
import type { Task } from "@/types";
import { Droppable, Draggable } from "@hello-pangea/dnd";

interface ColumnProps {
  id: string;
  title: string;
  searchTerm?: string;
  priorityFilter?: string;
}

const Column = ({ id, title, searchTerm, priorityFilter }: ColumnProps) => {
  const dispatch = useAppDispatch();
  const { tasks } = useAppSelector((state) => state.task);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchTasks(id));
  }, [dispatch, id]);

  const columnTasks = tasks
    .filter((task: Task) => task.columnId === id)

  return (
    <div>
      <div className="border w-80 h-[calc(100vh-17rem)] bg-sidebar/60 text-sidebar-foreground rounded-lg flex flex-col">
        <div className="p-3 md:p-4 flex justify-between items-center">
          <div className="flex-1 min-w-0 pr-2">
            <span className="font-semibold text-lg truncate block">{title}</span>
          </div>
          <div className="flex-shrink-0 flex space-x-3 items-center">
            <TooltipProvider>
              <AddTaskDialog columnId={id} />
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
                  <DropdownMenuItem onClick={() => setIsRenameDialogOpen(true)}>
                    Rename Column
                  </DropdownMenuItem>
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
          <Droppable droppableId={id}>
            {(provided) => (
              <div 
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-3"
              >
                {columnTasks.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4 text-xl font-semibold">
                    No tasks yet
                  </p>
                ) : (
                  columnTasks.map((task: Task, index: number) => (
                    <Draggable 
                      key={task._id} 
                      draggableId={task._id} 
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskComponent 
                            task={task} 
                            searchTerm={searchTerm}
                            priorityFilter={priorityFilter}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </ScrollArea>
      </div>

      <DeleteColumnDialog 
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        columnId={id}
      />
      
      <RenameColumnDialog
        isOpen={isRenameDialogOpen}
        onOpenChange={setIsRenameDialogOpen}
        columnId={id}
        currentName={title}
      />
    </div>
  );
};

export default Column;
