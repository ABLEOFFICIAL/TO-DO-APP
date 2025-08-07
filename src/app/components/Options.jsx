"use client";
import { useContext } from "react";
import { TodoContext } from "../context/contextProvider";

export default function Options({ openModalId, setOpenModalId }) {
  const {
    filteredTodos,
    markAsDone,
    deleteTodo,
    setShowNoteModal,
    setEditingTodo,
    viewMdOptions,
    setViewMdOptions,
  } = useContext(TodoContext);

  return (
    viewMdOptions && (
      <div className="z-50 w-36 bg-[#f5f5f5] shadow-md rounded-lg flex flex-col text-sm p-2 absolute top-2 right-2">
        <button
          onClick={() => {
            markAsDone(openModalId);
            setOpenModalId(null);
            setViewMdOptions(false);
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
    )
  );
}
