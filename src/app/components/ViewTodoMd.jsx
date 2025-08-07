"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ImFilesEmpty } from "react-icons/im";
import { TodoContext } from "../context/contextProvider";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Options from "./Options";

export default function ViewTodoMd() {
  const { filteredTodos, viewingTodoMD, setViewingTodoMD } =
    useContext(TodoContext);
  const modalRef = useRef(null);

  const [openModalId, setOpenModalId] = useState(null);

  // When the selected todo changes, set openModalId to that todo's id
  useEffect(() => {
    if (viewingTodoMD?.id) {
      setOpenModalId(null); // start closed when changing selection; or set to viewingTodoMD.id to open by default
    }
  }, [viewingTodoMD?.id]);

  // Keep viewingTodoMD in sync with filteredTodos (unchanged)
  useEffect(() => {
    if (viewingTodoMD?.id) {
      const updated = filteredTodos.find((t) => t.id === viewingTodoMD.id);
      if (updated) {
        setViewingTodoMD(updated);
        localStorage.setItem("todosMD", JSON.stringify(updated));
      }
    }
  }, [filteredTodos, viewingTodoMD?.id, setViewingTodoMD]);

  // Load from localStorage initially (unchanged)
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

  // Outside click + Escape key handling
  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!modalRef.current) return;

      // Supports portals: check composedPath if available
      const path =
        (event.composedPath && event.composedPath()) ||
        (event.path && event.path) ||
        null;

      const clickedInside =
        path?.includes(modalRef.current) ||
        modalRef.current.contains(event.target);

      if (!clickedInside) {
        setOpenModalId(null);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpenModalId(null);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div className="bg-[#f5f5f5] h-full w-full flex flex-col gap-4 rounded-lg shadow-md p-6">
      {viewingTodoMD ? (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between relative">
              <h1 className="text-3xl font-semibold">
                {viewingTodoMD.title || "Title"}
              </h1>

              <HiOutlineDotsVertical
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // toggle only for the current todo id
                  setOpenModalId((prev) =>
                    prev === viewingTodoMD.id ? null : viewingTodoMD.id
                  );
                }}
                className="size-6 mr-5 cursor-pointer"
              />

              {/* Pass the current viewing todo id as targetId so Options knows if it should render */}
              <Options
                ref={modalRef}
                openModalId={openModalId}
                setOpenModalId={setOpenModalId}
                targetId={viewingTodoMD?.id}
              />
            </div>

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
