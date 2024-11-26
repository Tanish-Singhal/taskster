"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Task {
  _id: string;
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
  tags: string[];
  deadline?: string;
  columnId: string;
}

interface ViewTaskDialogProps {
  task: Task;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ViewTaskDialog = ({ task, open, onOpenChange }: ViewTaskDialogProps) => {
  const formattedDeadline = task.deadline ? format(new Date(task.deadline), "PPP 'at' p") : "No deadline";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-11/12 sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{task.title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-6">
          {task.description && (
            <div className="grid gap-2">
              <Label>Description</Label>
              <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {task.description}
                </p>
              </ScrollArea>
            </div>
          )}
          
          <div className="grid gap-2">
            <Label>Priority</Label>
            <span className="text-sm text-muted-foreground capitalize">{task.priority}</span>
          </div>

          {task.tags.length > 0 && (
            <div className="grid gap-2">
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-1.5">
                {task.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-muted-foreground">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="grid gap-2">
            <Label>Deadline</Label>
            <span className="text-sm text-muted-foreground">{formattedDeadline}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewTaskDialog;