import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formatNames } from "@/lib/utils";
import { columnNameSchema, ColumnNameSchema } from "@/lib/schema/columnNameSchema";
import axios from "axios";
import { useAppDispatch } from "@/store/redux-hooks";
import { fetchColumn } from "@/store/slices/columnSlice/columnSlice";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

interface RenameColumnDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  columnId: string;
  currentName: string;
}

const RenameColumnDialog = ({ isOpen, onOpenChange, columnId, currentName }: RenameColumnDialogProps) => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const boardId = params.boardId;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ColumnNameSchema>({
    resolver: zodResolver(columnNameSchema),
    defaultValues: {
      name: currentName,
    },
  });

  const handleRenameColumn = async (data: ColumnNameSchema) => {
    try {
      const formattedData = {
        ...data,
        name: formatNames(data.name),
      };

      await axios.put(
        `${process.env.NEXT_PUBLIC_DEVELOPMENT_URL}/api/v1/columns/${columnId}`,
        formattedData,
        {
          headers: {
            Authorization: localStorage.getItem("taskster-token"),
          },
        }
      );

      dispatch(fetchColumn(boardId as string));
      onOpenChange(false);
      reset();

      toast.success("Column renamed successfully!", {
        style: {
          borderRadius: "5px",
          background: "#262626",
          color: "#ffffff",
        },
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "Failed to rename column", {
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
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Rename Column</DialogTitle>
          <DialogDescription>Enter a new name for the column.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleRenameColumn)}>
          <div className="grid grid-cols-5 gap-4 py-4 items-center">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" className="col-span-4" {...register("name")} />
            {errors.name && (
              <span className="col-span-4 col-start-2 text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RenameColumnDialog;