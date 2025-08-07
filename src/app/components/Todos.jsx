"use client";

import { Suspense, useContext, useState, useEffect, useRef } from "react";
import { ImFilesEmpty } from "react-icons/im";
import { TodoContext } from "../context/contextProvider";
import TodoCard from "./TodoCard";
import Dots from "./Dots";

import { forwardRef } from "react";
import { usePathname } from "next/navigation";

export const Options = forwardRef(function Options(
  { top, left, mark, edit, view, deleteTodo },
  ref
) {
  const pathname = usePathname();
  const showView = pathname === "/"; // ✅ correctly declare the variable

  return (
    <div
      ref={ref}
      className="z-50 w-36 bg-[#f5f5f5] shadow-md rounded-lg flex flex-col text-sm p-2"
      style={{
        position: "absolute",
        top: `${top}px`,
        left: `${left}px`,
      }}
    >
      <button onClick={mark} className="hover:bg-gray-100 p-2 text-left">
        Mark as done
      </button>
      <button onClick={edit} className="hover:bg-gray-100 p-2 text-left">
        Edit
      </button>

      {showView && ( // ✅ conditionally render this block
        <button onClick={view} className="hover:bg-gray-100 p-2 text-left">
          View
        </button>
      )}

      <button
        onClick={deleteTodo}
        className="hover:bg-gray-100 p-2 text-left text-red-500"
      >
        Delete
      </button>
    </div>
  );
});

export default function Todos() {
  const {
    filteredTodos,
    markAsDone,
    deleteTodo,
    viewTodo,
    setShowNoteModal,
    setEditingTodo,
    error,
    loading,
  } = useContext(TodoContext);

  const [openModalId, setOpenModalId] = useState(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const modalRef = useRef(null);

  const handleMoreOptionsClick = (e, todoId) => {
    const modalWidth = 160;
    const modalHeight = 160;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const buttonRect = e.currentTarget.getBoundingClientRect();

    let left = buttonRect.left + window.scrollX;
    let top = buttonRect.bottom + window.scrollY + 5 - 50;

    if (left + modalWidth > viewportWidth) {
      left = viewportWidth - modalWidth - 10;
    }

    if (top + modalHeight > viewportHeight + window.scrollY) {
      top = buttonRect.top + window.scrollY - modalHeight - 5;
    }

    left = Math.max(10, Math.min(left, viewportWidth - modalWidth - 10));
    top = Math.max(10, top);

    console.log(`Modal Position for Todo ID ${todoId}:`, { top, left });

    if (openModalId === todoId) {
      setOpenModalId(null);
      return;
    }

    setOpenModalId(todoId);
    setModalPosition({ top, left });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOpenModalId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        {loading ? (
          <div className=" justify-center flex flex-col items-center h-[40vh] gap-4">
            <p className="text-center text-sm text-gray-500">
              Loading todos...
            </p>
          </div>
        ) : error ? (
          <div className="justify-center flex flex-col items-center h-[40vh] gap-4">
            <p className="text-center text-sm text-red-500">{error}</p>
          </div>
        ) : filteredTodos.length === 0 ? (
          <div className="justify-center flex flex-col items-center h-[40vh] gap-4">
            <ImFilesEmpty className="size-20 text-neutral-500" />
            <p className="text-center text-sm text-gray-500">Empty List</p>
          </div>
        ) : (
          <>
            <div className="py-5 flex flex-col gap-5 relative">
              {filteredTodos.map((todo) => (
                <TodoCard key={todo.id} id={todo.id}>
                  <div className="flex flex-col justify-between items-start w-5/6">
                    <h3 className="text-sm font-semibold">
                      {todo.title.length > 15
                        ? todo.title.slice(0, 15) + "..."
                        : todo.title}
                    </h3>
                    <p className="text-xs font-normal text-start w-5/6">
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
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleMoreOptionsClick(e, todo.id);
                    }}
                  />
                </TodoCard>
              ))}
            </div>
            {/* Modal Options */}
            {openModalId && (
              <Options
                ref={modalRef}
                top={modalPosition.top}
                left={modalPosition.left}
                mark={() => {
                  markAsDone(openModalId);
                  setOpenModalId(null);
                }}
                edit={() => {
                  const todo = filteredTodos.find((t) => t.id === openModalId);
                  setEditingTodo(todo);
                  setShowNoteModal(true);
                  setOpenModalId(null);
                }}
                view={() => {
                  viewTodo(openModalId);
                  setOpenModalId(null);
                }}
                deleteTodo={() => {
                  deleteTodo(openModalId);
                  setOpenModalId(null);
                }}
              />
            )}
          </>
        )}
      </div>
    </Suspense>
  );
}
