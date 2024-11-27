
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { taskSchema, TaskSchema } from "@/lib/schema/taskSchema";
import { useForm, useController } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SmartDatetimeInput } from "@/components/smart-date-time-input";
import { TagsInput } from "@/components/tags-input";
import { useAppDispatch } from "@/store/redux-hooks";
import { updateTask } from "@/store/slices/taskSlice/taskSlice";

interface Task {
  _id: string;
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
  tags: string[];
  deadline?: string;
  columnId: string;
}

interface EditTaskDialogProps {
  task: Task;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EditTaskDialog = ({ task, open, onOpenChange }: EditTaskDialogProps) => {
  const dispatch = useAppDispatch();

  const form = useForm<TaskSchema>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task.title,
      description: task.description || "",
      priority: task.priority,
      deadline: task.deadline,
      tags: task.tags,
    },
  });

  const { field: deadlineField } = useController({
    name: "deadline",
    control: form.control,
  });

  const { field: tagsField } = useController({
    name: "tags",
    control: form.control,
  });

  const { field: priorityField } = useController({
    name: "priority",
    control: form.control,
  });

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      deadlineField.onChange(date.toISOString());
    } else {
      deadlineField.onChange('');
    }
  };

  const onSubmit = async (data: TaskSchema) => {
    try {
      await dispatch(updateTask({ taskId: task._id, data })).unwrap();
      onOpenChange(false);
    } catch (error) {
      form.setError('root', {
        type: 'server',
        message: error as string
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-11/12 sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                {...form.register("title")}
                placeholder="Enter task title (min 5 characters)"
              />
              {form.formState.errors.title && (
                <span className="text-destructive text-sm">
                  {form.formState.errors.title.message}
                </span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...form.register("description")}
                className="resize-none"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={priorityField.value}
                onValueChange={priorityField.onChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tags">Tags</Label>
              <TagsInput
                value={tagsField.value}
                onValueChange={(tags) => tagsField.onChange(tags)}
                placeholder="Enter tags"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="deadline">Deadline</Label>
              <SmartDatetimeInput
                value={deadlineField.value ? new Date(deadlineField.value) : undefined}
                onValueChange={handleDateChange}
                placeholder="e.g. Tomorrow morning 9am"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTaskDialog;