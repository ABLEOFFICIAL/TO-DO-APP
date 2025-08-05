"use client";
import { Suspense, useContext, useState } from "react";
import { ImFilesEmpty } from "react-icons/im";
import { TodoContext } from "../context/contextProvider";
import TodoCard from "./TodoCard";
import Dots from "./Dots";

export default function Todos() {
  const {
    filteredTodos,
    markAsDone,
    deleteTodo,
    viewTodo,
    setEditingTodo,
    setShowNoteModal,
  } = useContext(TodoContext);

  const [openModalId, setOpenModalId] = useState(null);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        {filteredTodos.length === 0 ? (
          <div className="justify-center flex flex-col items-center h-[40vh] gap-4">
            <ImFilesEmpty className="size-20 text-neutral-500" />
            <p className="text-center text-sm text-gray-500">Empty List</p>
          </div>
        ) : (
          <div className="py-5 flex flex-col gap-5 relative">
            {filteredTodos.map((todo) => (
              <TodoCard key={todo.id}>
                <div className="flex flex-col justify-between w-5/6">
                  <h3 className="text-sm font-semibold">
                    {todo.title.length > 15
                      ? todo.title.slice(0, 15) + "..."
                      : todo.title}
                  </h3>
                  <p className="text-xs font-normal w-5/6">
                    {todo.body.length > 80
                      ? todo.body.slice(0, 80) + "..."
                      : todo.body}
                  </p>
                  <span className="text-neutral-400 text-xs font-medium">
                    {new Date().toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>

                {/* Dots button */}
                <Dots
                  onClick={() =>
                    setOpenModalId(openModalId === todo.id ? null : todo.id)
                  }
                />

                {/* Modal Options */}
                {openModalId === todo.id && (
                  <div className="absolute right-5 top-10 z-50 w-40 bg-white border shadow-md rounded-lg flex flex-col text-sm">
                    <button
                      onClick={() => {
                        markAsDone(todo.id);
                        setOpenModalId(null);
                      }}
                      className="hover:bg-gray-100 p-2 text-left"
                    >
                      ✅ Mark as done
                    </button>
                    <button
                      onClick={() => {
                        setEditingTodo(todo);
                        setShowNoteModal(true);
                        setOpenModalId(null);
                      }}
                      className="hover:bg-gray-100 p-2 text-left"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => {
                        viewTodo(todo.id);
                        setOpenModalId(null);
                      }}
                      className="hover:bg-gray-100 p-2 text-left"
                    >
                      👁️ View
                    </button>
                    <button
                      onClick={() => {
                        deleteTodo(todo.id);
                        setOpenModalId(null);
                      }}
                      className="hover:bg-gray-100 p-2 text-left text-red-500"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                )}
              </TodoCard>
            ))}
          </div>
        )}
      </div>
    </Suspense>
  );
}
