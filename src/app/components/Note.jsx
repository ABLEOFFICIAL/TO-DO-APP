"use client";

import { useContext, useEffect } from "react";
import { TodoContext } from "../context/contextProvider";
// import { v4 as uuidv4 } from "uuid";

export default function Note() {
  const {
    showNoteModal,
    setShowNoteModal,
    addTodo,
    editTodo,
    editingTodo,
    setEditingTodo,
    title,
    setTitle,
    text,
    setText,
  } = useContext(TodoContext);

  // Pre-fill form if editing
  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title);
      setText(editingTodo.body);
    }
  }, [editingTodo]);

  const handleSaveNote = () => {
    if (title.trim() === "" && text.trim() === "") return;

    const todoData = {
      title: title || "",
      body: text || "",
      completed: editingTodo ? editingTodo.completed : false,
    };

    if (editingTodo) {
      editTodo({
        id: editingTodo.id, // String ID from server
        ...todoData,
      });
    } else {
      addTodo(todoData); // Let server assign ID
    }

    setShowNoteModal(false);
    setEditingTodo(null);
    setTitle("");
    setText("");
  };

  return (
    <div
      className={`fixed inset-0 bg-[#e8e8e9]/60 z-40 ${
        showNoteModal ? "" : "hidden"
      }`}
    >
      <div
        className="fixed bg-white z-50 w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%]
                   max-h-[90vh] overflow-y-auto shadow-2xl rounded-2xl 
                   top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                   pt-10 px-5 pb-5"
      >
        {/* Save/Close Button */}
        <div
          className="border border-neutral-200 rounded-full px-2.5 py-1 absolute top-3 right-3 cursor-pointer hover:bg-neutral-100 transition"
          onClick={handleSaveNote}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-4">
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="focus:outline-none w-full text-xl font-semibold"
          />
          <span className="text-sm text-neutral-500">
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
            })}
          </span>
          <textarea
            name="text-area"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write notes..."
            className="min-h-48 w-full focus:outline-none text-base resize-none"
          ></textarea>
        </div>
      </div>
    </div>
  );
}
