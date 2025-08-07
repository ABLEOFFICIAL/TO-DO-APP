"use client";
import React, { useContext, useEffect } from "react";
import { ImFilesEmpty } from "react-icons/im";
import { TodoContext } from "../context/contextProvider";

export default function ViewTodoMd() {
  const { viewingTodoMD, setViewingTodoMD } = useContext(TodoContext);

  // ✅ Load from localStorage on component mount
  useEffect(() => {
    const stored = localStorage.getItem("todosMD");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setViewingTodoMD(parsed);
      } catch (err) {
        console.error("Failed to parse todosMD from localStorage", err);
      }
    }
  }, [setViewingTodoMD]);

  return (
    <div className="bg-[#f5f5f5] h-full w-full flex flex-col gap-4 rounded-lg shadow-md p-6">
      {viewingTodoMD ? (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-semibold">
              {viewingTodoMD.title || "Title"}
            </h1>
            <p className="text-xs font-normal text-neutral-950/50">
              {new Date(viewingTodoMD.createdAt || Date.now()).toLocaleString(
                "en-US",
                {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}{" "}
              | {viewingTodoMD.body?.length || 0} characters
            </p>
            <p className="text-sm font-normal w-5/6">{viewingTodoMD.body}</p>
          </div>
        </div>
      ) : (
        <div className="justify-center flex flex-col items-center gap-4 h-2/5">
          <ImFilesEmpty className="size-20 text-neutral-500" />
          <p className="text-center text-sm text-gray-500">
            Select a task to view details
          </p>
        </div>
      )}
    </div>
  );
}
