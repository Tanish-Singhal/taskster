import React, { useEffect, useState } from "react";
import { BoardButton } from "./BoardButton";
import { BoardSkeleton } from "./BoardSkeleton";
import { DeleteBoardDialog } from "./DeleteBoardDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Folder, MoreHorizontal, Trash2 } from "lucide-react";
import { deleteBoard, fetchBoards } from "@/store/slices/boardSlice/boardSlice";
import { useAppDispatch, useAppSelector } from "@/store/redux-hooks";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { boards, loading, error } = useAppSelector((state) => state.board);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [boardToDelete, setBoardToDelete] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  const handleDeleteClick = (boardId: string) => {
    setBoardToDelete(boardId);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (boardToDelete) {
      dispatch(deleteBoard(boardToDelete));
      setBoardToDelete(null);
    }
    setIsDeleteDialogOpen(false);
  };

  const handleCancelDelete = () => {
    setBoardToDelete(null);
    setIsDeleteDialogOpen(false);
  };

  if (loading) {
    return (
      <div>
        <div className="flex justify-between">
          <h1 className="text-neutral-300 font-semibold text-3xl">Boards</h1>
          <BoardButton onBoardCreated={() => dispatch(fetchBoards())} />
        </div>
        <div className="flex gap-4 my-10 flex-wrap">
          <BoardSkeleton />
          <BoardSkeleton />
          <BoardSkeleton />
          <BoardSkeleton />
          <BoardSkeleton />
          <BoardSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-sidebar-foreground font-semibold text-3xl lg:text-5xl flex items-center">
            Boards
          </h1>
          <BoardButton onBoardCreated={() => dispatch(fetchBoards())} />
        </div>
        <div className="my-12 flex justify-center items-center">
          <h2 className="text-4xl lg:text-5xl text-neutral-500 mx-6 lg:mx-0">{error}</h2>
        </div>
      </div>
    );
  }

  if (boards.length === 0) {
    return (
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-sidebar-foreground font-semibold text-3xl lg:text-5xl flex items-center">
            Boards
          </h1>
          <BoardButton onBoardCreated={() => dispatch(fetchBoards())} />
        </div>
        <div className="my-14">
          <h2 className="text-4xl lg:text-5xl flex justify-center text-neutral-500">
            Create your first board
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-sidebar-foreground font-semibold text-3xl lg:text-5xl flex items-center">
          Boards
        </h1>
        <BoardButton onBoardCreated={() => dispatch(fetchBoards())} />
      </div>
      <div className="flex gap-4 my-10 flex-wrap">
        {boards.map((board) => (
          <div
            key={board._id}
            className="group relative bg-sidebar text-sidebar-foreground rounded-md h-44 w-80 p-3 flex flex-col justify-between"
          >
            <div className="flex justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <MoreHorizontal className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48" align="start">
                  <DropdownMenuItem>
                    <Folder className="text-muted-foreground" />
                    <span>View Board</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="bg-red-600 text-white focus:bg-red-800"
                    onClick={() => handleDeleteClick(board._id)}
                  >
                    <Trash2 />
                    <span>Delete Board</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <h2 className="text-3xl">{board.name}</h2>
          </div>
        ))}
      </div>

      <DeleteBoardDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default Dashboard;
