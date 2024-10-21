import React from "react";
// import BoardButton from "./BoardButton";

// interface Board {
//   id: string;
//   name: string;
//   backgroundColor: string;
// }

const Dashboard = () => {
  // const handleBoardCreated = (board: Board) => {
  //   console.log("New board created:", board);
  // };

  return (
    <div> 
      <div className="flex justify-between">
        <h1 className="text-neutral-300 font-semibold text-2xl">Boards</h1>
        {/* <BoardButton onBoardCreated={handleBoardCreated} /> */}
      </div>
      <div className="flex gap-4 mt-4 flex-wrap">
        <div className="bg-sidebar text-sidebar-foreground rounded-md h-40 w-72 p-3 flex flex-col justify-end">
          <div></div>
          <h2 className="text-2xl flex">Startup</h2>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
