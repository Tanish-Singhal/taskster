import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { columnNameSchema, ColumnNameSchema } from "@/lib/schema/columnNameSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatNames } from "@/lib/utils";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import { useAppDispatch } from "@/store/redux-hooks";
import { fetchColumn } from "@/store/slices/columnSlice/columnSlice";

const CreateColumnDialog = () => {
  const [open, setOpen] = useState(false);
  const params = useParams();
  const boardId = params.boardId;
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ColumnNameSchema>({
    resolver: zodResolver(columnNameSchema),
  });

  const handleCreateColumn = async (data: ColumnNameSchema) => {
    try {
      const formattedData = {
        ...data,
        name: formatNames(data.name),
      };

      await axios.post(
        `${process.env.NEXT_PUBLIC_DEVELOPMENT_URL}/api/v1/columns/${boardId}`,
        formattedData,
        {
          headers: {
            Authorization: localStorage.getItem("taskster-token"),
          },
        }
      );

      dispatch(fetchColumn(boardId as string));

      reset();
      setOpen(false);

      toast.success("Column created successfully!", {
        style: {
          borderRadius: "5px",
          background: "#262626",
          color: "#ffffff",
        },
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message, {
          style: {
            borderRadius: "5px",
            background: "#262626",
            color: "#ffffff",
          },
        });
      } else {
        toast.error("Failed to create Columns", {
          style: {
            borderRadius: "5px",
            background: "#262626",
            color: "#ffffff",
          },
        });
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Create Column</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Column</DialogTitle>
          <DialogDescription>Write the name of the column you want to create.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleCreateColumn)}>
          <div className="grid grid-cols-5 gap-4 py-4 items-center">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" placeholder="TODO" className="col-span-4" {...register("name")} />
            {errors.name && (
              <span className="col-span-4 text-red-500 text-sm">{errors.name.message}</span>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateColumnDialog;
