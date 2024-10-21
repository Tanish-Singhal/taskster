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
import { FolderKanban } from "lucide-react";
import axios from "axios";
import { BoardNameSkeleton } from "@/app/components/sidebar/BoardNameSkeleton";

export function NavBoards() {
  const { isMobile } = useSidebar();
  const [boards, setBoards] = useState<{ name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_DEVELOPMENT_URL}/api/v1/boards`,
          {
            headers: {
              Authorization: localStorage.getItem("taskster-token"),
            },
          }
        );

        const boardData = response.data.data;

        const formattedData = boardData.map((board: { name: string }) => {
          return {
            name: board.name,
          };
        });

        setBoards(formattedData);
      } catch (err) {
        setError("Failed to fetch boards data");
      } finally {
        setLoading(false);
      }
    };

    fetchBoards();
  }, []);

  if (loading) {
    return (
      <div>
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>Boards</SidebarGroupLabel>
          <SidebarMenu>
            <BoardNameSkeleton />
            <BoardNameSkeleton />
            <BoardNameSkeleton />
          </SidebarMenu>
        </SidebarGroup>
      </div>
    );
  }

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Boards</SidebarGroupLabel>
      <SidebarMenu>
        {boards.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <a href={`/boards/${item.name}`}>
                <FolderKanban />
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
                <DropdownMenuItem>
                  <Folder className="text-muted-foreground" />
                  <span>View Board</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Trash2 className="text-muted-foreground" />
                  <span>Delete Board</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
