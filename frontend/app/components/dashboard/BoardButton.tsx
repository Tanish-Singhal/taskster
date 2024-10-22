import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { createBoardSchema, CreateBoardSchema } from "@/lib/schema/create-board";
import axios from "axios";

interface BoardButtonProps {
  onBoardCreated: () => void;
}

export const BoardButton = ({ onBoardCreated }: BoardButtonProps) => {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateBoardSchema>({
    resolver: zodResolver(createBoardSchema),
  });

  const handleCreateBoard = async (data: CreateBoardSchema) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_DEVELOPMENT_URL}/api/v1/boards`, data, {
        headers: {
          Authorization: localStorage.getItem("taskster-token"),
        },
      });

      reset();
      setOpen(false);
      onBoardCreated();

      toast.success("Board created successfully!", {
        style: {
          borderRadius: "5px",
          background: "#262626",
          color: "#ffffff",
        },
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message, {
          style: {
            borderRadius: "10px",
            background: "#171717",
            color: "#ffffff",
          },
        });
      } else {
        toast.error("Failed to create board", {
          style: {
            borderRadius: "10px",
            background: "#171717",
            color: "#ffffff",
          },
        });
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Create Board</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Create Board</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleCreateBoard)}>
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
              {isSubmitting ? "Creating..." : "Create Board"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
