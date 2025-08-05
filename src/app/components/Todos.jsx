"use client";
import { Suspense, useContext, useState, useEffect, useRef } from "react";
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
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const modalRef = useRef(null);

  const handleMoreOptionsClick = (e, todoId) => {
    const modalWidth = 180;
    const modalHeight = 160;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Get bounding box of the button
    const buttonRect = e.currentTarget.getBoundingClientRect();

    // Calculate modal position based on button position
    let left = buttonRect.left + window.scrollX;
    let top = buttonRect.bottom + window.scrollY + 5 - 230; // Add slight spacing below

    // Adjust to keep modal within viewport horizontally
    if (left + modalWidth > viewportWidth) {
      left = viewportWidth - modalWidth - 10;
    }

    // Adjust to keep modal within viewport vertically
    if (top + modalHeight > viewportHeight + window.scrollY) {
      top = buttonRect.top + window.scrollY - modalHeight - 5; // Show above
    }

    // Final safeguard
    left = Math.max(10, Math.min(left, viewportWidth - modalWidth - 10));
    top = Math.max(10, top);

    // Toggle modal
    if (openModalId === todoId) {
      setOpenModalId(null);
      return;
    }

    setOpenModalId(todoId);
    setModalPosition({ top, left });
  };

  // Close modal when clicking outside
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
                <Dots onClick={(e) => handleMoreOptionsClick(e, todo.id)} />
              </TodoCard>
            ))}

            {/* Modal Options */}
            {openModalId && (
              <div
                ref={modalRef}
                className="z-50 w-36 bg-[#f5f5f5] shadow-md rounded-lg flex flex-col text-sm p-2"
                style={{
                  position: "absolute",
                  top: `${modalPosition.top}px`,
                  left: `${modalPosition.left}px`,
                }}
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
                    const todo = filteredTodos.find(
                      (t) => t.id === openModalId
                    );
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
                    viewTodo(openModalId);
                    setOpenModalId(null);
                  }}
                  className="hover:bg-gray-100 p-2 text-left"
                >
                  View
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
            )}
          </div>
        )}
      </div>
    </Suspense>
  );
}
