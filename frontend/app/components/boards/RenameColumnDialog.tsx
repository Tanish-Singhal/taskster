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
import { useAppDispatch } from "@/store/redux-hooks";
import { renameColumn } from "@/store/slices/columnSlice/columnSlice";

interface RenameColumnDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  columnId: string;
  currentName: string;
}

const RenameColumnDialog = ({ isOpen, onOpenChange, columnId, currentName }: RenameColumnDialogProps) => {
  const dispatch = useAppDispatch();

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
        name: formatNames(data.name),
      };

      await dispatch(renameColumn({ columnId, name: formattedData.name })).unwrap();
      onOpenChange(false);
      reset();
    } catch {
      // Error handling is done in the slice
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