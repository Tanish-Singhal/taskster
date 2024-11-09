"use client";

import React, { useEffect } from "react";
import Boards from "@/app/components/boards/boards";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/redux-hooks";
import { fetchBoardById } from "@/store/slices/boardSlice/boardSlice";

const BoardPage = ({ params }: { params: { boardId: string } }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.board);

  useEffect(() => {
    const checkBoard = async () => {
      const result = await dispatch(fetchBoardById(params.boardId));
      if (result.type === "boards/fetchBoardById/rejected") {
        router.push("/not-found");
      }
    };
    checkBoard();
  }, [dispatch, params.boardId, router]);

  if (error) {
    router.push("/not-found");
    return null;
  }

  return (
    <div>
      <Boards />
    </div>
  );
};

export default BoardPage;
