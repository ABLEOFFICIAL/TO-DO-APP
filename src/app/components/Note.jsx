"use client";

import { useContext, useEffect } from "react";
import { TodoContext } from "../context/contextProvider";
import { v4 as uuidv4 } from "uuid";

export default function Note() {
  const {
    showNoteModal,
    setShowNoteModal,
    addTodo,
    editTodo, // <-- Add this from context
    editingTodo,
    setEditingTodo,
    title,
    setTitle,
    text,
    setText,
  } = useContext(TodoContext);

  // Pre-fill modal when editing
  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title);
      setText(editingTodo.body);
    }
  }, [editingTodo]);

  const handleSaveNote = () => {
    if (title.trim() === "" && text.trim() === "") return;

    if (editingTodo) {
      // We're editing
      editTodo({
        ...editingTodo,
        title,
        body: text,
      });
    } else {
      // We're creating
      const newTodo = {
        id: uuidv4(),
        title,
        body: text,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      addTodo(newTodo);
    }

    // Reset state
    setShowNoteModal(false);
    setEditingTodo(null);
    setTitle("");
    setText("");
  };

  return (
    <div
      className={`fixed inset-0 bg-[#e8e8e9] z-40 ${
        showNoteModal ? "" : "hidden"
      }`}
    >
      <div className="fixed bg-[#fff] z-50 w-4/5 h-auto shadow-2xl rounded-2xl mx-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pt-15 px-3 pb-3">
        <div
          className="border-[1px] border-[#e8e8e9] rounded-full inline px-2.5 py-1 absolute top-2 right-2 cursor-pointer"
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
        <div>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="focus:outline-0 w-full"
          />
          <div>
            <span className="timeCreated">
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <div>
            <textarea
              name="text-area"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write notes"
              className="min-h-44 w-full focus:outline-0"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}
