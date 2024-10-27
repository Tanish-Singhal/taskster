"use client";

import React, { useEffect, useState } from "react";
import { CreateBoardDialog } from "./CreateBoardDialog";
import { BoardSkeleton } from "./BoardSkeleton";
import { DeleteBoardDialog } from "./DeleteBoardDialog";
import { RenameBoardDialog } from "./RenameBoardDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Folder, MoreHorizontal, SquarePen, Trash2 } from "lucide-react";
import { deleteBoard, fetchBoards, renameBoard } from "@/store/slices/boardSlice/boardSlice";
import { useAppDispatch, useAppSelector } from "@/store/redux-hooks";
import { useRouter } from "next/navigation";

interface Board {
  _id: string;
  name: string;
}

const Dashboard = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const { boards, loading, error } = useAppSelector((state) => state.board);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [boardToDelete, setBoardToDelete] = useState<string | null>(null);
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [boardToRename, setBoardToRename] = useState<{ id: string; name: string } | null>(null);

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

  const handleRenameClick = (board: { _id: string; name: string }) => {
    setBoardToRename({ id: board._id, name: board.name });
    setIsRenameDialogOpen(true);
  };

  const handleRename = async (data: { name: string }) => {
    if (boardToRename) {
      try {
        await dispatch(renameBoard({ boardId: boardToRename.id, name: data.name })).unwrap();
        setIsRenameDialogOpen(false);
        setBoardToRename(null);
      } catch {
        // Handle error silently
      }
    }
  };

  if (loading) {
    return (
      <div>
        <div className="flex justify-between">
          <h1 className="text-neutral-300 font-semibold text-3xl md:text-5xl">Boards</h1>
          <CreateBoardDialog onBoardCreated={() => dispatch(fetchBoards())} />
        </div>
        <div className="flex gap-4 my-10 flex-wrap justify-center md:justify-start">
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
          <h1 className="text-sidebar-foreground font-semibold text-3xl md:text-5xl">Boards</h1>
          <CreateBoardDialog onBoardCreated={() => dispatch(fetchBoards())} />
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
          <h1 className="text-sidebar-foreground font-semibold text-3xl md:text-5xl">Boards</h1>
          <CreateBoardDialog onBoardCreated={() => dispatch(fetchBoards())} />
        </div>
        <div className="my-14">
          <h2 className="text-4xl lg:text-5xl flex justify-center text-neutral-500">
            Create your first board
          </h2>
        </div>
      </div>
    );
  }

  const handleBoardClick = (boardId: string) => {
    router.push(`/board/${boardId}`);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-sidebar-foreground font-semibold text-4xl md:text-5xl">Boards</h1>
        <CreateBoardDialog onBoardCreated={() => dispatch(fetchBoards())} />
      </div>
      <div className="flex gap-4 my-10 flex-wrap justify-center md:justify-start">
        {boards.map((board: Board) => (
          <div
            key={board._id}
            className="group relative bg-sidebar hover:bg-neutral-200 dark:hover:bg-zinc-900 text-sidebar-foreground rounded-md h-44 w-80 sm:w-[17.5rem] p-3 flex flex-col justify-between"
            onClick={() => handleBoardClick(board._id)}
          >
            <div className="flex justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger
                  asChild
                  className="hover:bg-neutral-300 dark:hover:bg-neutral-700 rounded-sm w-6 h-5 cursor-pointer"
                >
                  <MoreHorizontal />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48" align="start">
                  <DropdownMenuItem onClick={() => handleBoardClick(board._id)}>
                    <Folder className="text-muted-foreground" />
                    <span>Open</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRenameClick(board);
                    }}
                  >
                    <SquarePen className="text-muted-foreground" />
                    <span>Rename</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="bg-red-600 text-white focus:bg-red-700 focus:text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClick(board._id);
                    }}
                  >
                    <Trash2 />
                    <span>Delete Board</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <h2 className="text-2xl md:text-3xl">{board.name}</h2>
          </div>
        ))}
      </div>

      <DeleteBoardDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
      <RenameBoardDialog
        isOpen={isRenameDialogOpen}
        onClose={() => {
          setIsRenameDialogOpen(false);
          setBoardToRename(null);
        }}
        onRename={handleRename}
        currentName={boardToRename?.name || ""}
      />
    </div>
  );
};

export default Dashboard;
