
import { useAppDispatch } from "@/store/redux-hooks";
import { deleteColumn } from "@/store/slices/columnSlice/columnSlice";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeleteColumnDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  columnId: string;
}

const DeleteColumnDialog = ({ isOpen, onOpenChange, columnId }: DeleteColumnDialogProps) => {
  const dispatch = useAppDispatch();

  const handleDeleteColumn = async () => {
    await dispatch(deleteColumn(columnId));
    onOpenChange(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="w-11/12 sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this column and all its tasks.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteColumn}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteColumnDialog;