"use client";

import { Folder, MoreHorizontal, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { BoardNameSkeleton } from "@/app/components/sidebar/BoardNameSkeleton";
import { useAppDispatch, useAppSelector } from "@/store/redux-hooks";
import { AppDispatch } from "@/store/store";
import { deleteBoard, fetchBoards } from "@/store/slices/boardSlice/boardSlice";
import { DeleteBoardDialog } from "@/app/components/dashboard/DeleteBoardDialog";
import { useRouter } from "next/navigation";

export function NavBoards() {
  const { isMobile } = useSidebar();
  const dispatch = useAppDispatch<AppDispatch>();
  const { boards, loading, error, initialized } = useAppSelector((state) => state.board);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [boardToDelete, setBoardToDelete] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!initialized) {
      dispatch(fetchBoards());
    }
  }, [dispatch, initialized]);

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

  if (loading || !initialized) {
    return (
      <div>
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>Boards</SidebarGroupLabel>
          <SidebarMenu>
            <BoardNameSkeleton />
            <BoardNameSkeleton />
            <BoardNameSkeleton />
            <BoardNameSkeleton />
            <BoardNameSkeleton />
          </SidebarMenu>
        </SidebarGroup>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>Boards</SidebarGroupLabel>
          <SidebarMenu className="text-neutral-500 ml-2 my-2">{error}</SidebarMenu>
        </SidebarGroup>
      </div>
    );
  }

  const handleBoardClick = (boardId: string) => {
    router.push(`/board/${boardId}`);
  }

  return (
    <>
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel>Boards</SidebarGroupLabel>
        <SidebarMenu>
          {boards.map((item) => (
            <SidebarMenuItem key={item._id}>
              <SidebarMenuButton asChild>
                <a onClick={() => handleBoardClick(item._id)}>
                  <Folder />
                  <span>{item.name}</span>
                </a>
              </SidebarMenuButton>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuAction showOnHover>
                    <MoreHorizontal />
                    <span className="sr-only">More</span>
                  </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-48"
                  side={isMobile ? "bottom" : "right"}
                  align={isMobile ? "end" : "start"}
                >
                  <DropdownMenuItem onClick={() => handleBoardClick(item._id)}>
                    <Folder className="text-muted-foreground" />
                    <span>Open</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="bg-red-600 text-white focus:bg-red-700 focus:text-white"
                    onClick={() => handleDeleteClick(item._id)}
                  >
                    <Trash2 />
                    <span>Delete Board</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>

      <DeleteBoardDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}