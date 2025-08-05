"use client";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/contextProvider";

export default function Sidebar() {
  const { sideBar } = useContext(Context);

  return (
    <aside
      className={`min-h-screen w-5/6 absolute top-0 left-0 z-50 bg-[#e8e8e9] px-5 py-7 ${
        sideBar ? "" : "hidden"
      }`}
    >
      <div className="border-b-[1px] border-neutral-400 flex justify-between items-center w-full">
        <h1 className="text-2xl font-bold py-2">Todos</h1>
        <span>x</span>
      </div>

      <div className="flex flex-col gap-5 mt-5">
        <div id="all-task" className="">
          <i className="fa-solid fa-list-check pr-3 text-lg"></i>
          <span>All tasks</span>
        </div>
        <div id="completed" className="tasks">
          <i className="fa-solid fa-check-to-slot pr-3 text-lg"></i>
          <span>Completed</span>
        </div>
        <div id="incomplete" className="tasks">
          <i className="fa-solid fa-chart-simple pr-3 text-lg"></i>
          <span>Incomplete</span>
        </div>
      </div>
    </aside>
  );
}
