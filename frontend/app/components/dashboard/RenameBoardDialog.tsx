import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createBoardSchema, CreateBoardSchema } from "@/lib/schema/create-board";
import { formatBoardName } from "@/lib/utils";

interface RenameBoardDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onRename: (data: CreateBoardSchema) => void;
  currentName: string;
}

export const RenameBoardDialog = ({ isOpen, onClose, onRename, currentName }: RenameBoardDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateBoardSchema>({
    resolver: zodResolver(createBoardSchema),
    defaultValues: {
      name: currentName
    }
  });

  useEffect(() => {
    if (isOpen) {
      reset({ name: currentName });
    }
  }, [isOpen, currentName, reset]);

  const handleFormSubmit = (data: CreateBoardSchema) => {
    onRename({
      ...data,
      name: formatBoardName(data.name)
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Rename Board</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" className="col-span-3" {...register("name")} />
              {errors.name && (
                <p className="col-start-2 col-span-3 text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Renaming..." : "Rename Board"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};