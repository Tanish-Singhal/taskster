"use client";

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
import { Plus } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { taskSchema, TaskSchema } from "@/lib/schema/taskSchema";
import { useForm, useController } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "@/store/redux-hooks";
import { createTask } from "@/store/slices/taskSlice/taskSlice";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SmartDatetimeInput } from "@/components/smart-date-time-input";
import { TagsInput } from "@/components/tags-input";
import { useState } from "react";

interface AddTaskDialogProps {
  columnId: string;
}

const AddTaskDialog = ({ columnId }: AddTaskDialogProps) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const form = useForm<TaskSchema>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "low",
      deadline: "",
      tags: [],
    },
  });

  const { field } = useController({
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

  const onSubmit = async (data: TaskSchema) => {
    try {
      await dispatch(createTask({ data, columnId })).unwrap();
      form.reset();
      setOpen(false);
    } catch (error) {
      form.setError('deadline', {
        type: 'server',
        message: error as string
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-muted-foreground/30">
              <Plus className="h-6 w-6" />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>Add new Task</TooltipContent>
      </Tooltip>
      <DialogContent className="w-11/12 sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create new Task</DialogTitle>
          <DialogDescription>Fill in the details below to create a new task.</DialogDescription>
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
                value={field.value ? new Date(field.value) : undefined}
                onValueChange={(date) => field.onChange(date?.toISOString() || '')}
                placeholder="e.g. Tomorrow morning 9am"
              />
              {form.formState.errors.deadline && (
                <span className="text-destructive text-sm">
                  Deadline is required
                </span>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskDialog;
