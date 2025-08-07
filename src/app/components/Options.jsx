"use client";
import React, { forwardRef, useContext } from "react";
import { TodoContext } from "../context/contextProvider";

const Options = forwardRef(({ openModalId, setOpenModalId, targetId }, ref) => {
  const {
    filteredTodos,
    markAsDone,
    deleteTodo,
    setShowNoteModal,
    setEditingTodo,
  } = useContext(TodoContext);

  // Only show when the openModalId matches the current todo being viewed
  if (!openModalId || openModalId !== targetId) return null;

  const handleInsideClick = (e) => {
    // prevent outer handlers from firing
    e.stopPropagation();
  };

  return (
    <div
      ref={ref}
      onPointerDown={handleInsideClick}
      className="z-50 w-36 bg-[#f5f5f5] shadow-md rounded-lg flex flex-col text-sm p-2 absolute top-2 right-2"
    >
      <button
        onClick={() => {
          markAsDone(openModalId);
          setOpenModalId(null);
        }}
        className="hover:bg-gray-100 p-2 text-left"
      >
        Mark as done
      </button>

      <button
        onClick={() => {
          const todo = filteredTodos.find((t) => t.id === openModalId);
          setEditingTodo(todo);
          setShowNoteModal(true);
          setOpenModalId(null);
        }}
        className="hover:bg-gray-100 p-2 text-left"
      >
        Edit
      </button>

      <button
        onClick={() => {
          deleteTodo(openModalId);
          setOpenModalId(null);
        }}
        className="hover:bg-gray-100 p-2 text-left text-red-500"
      >
        Delete
      </button>
    </div>
  );
});

Options.displayName = "Options";
export default Options;
