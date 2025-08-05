"use client";

import { useContext } from "react";
import { TodoContext } from "../context/contextProvider";

export default function Options({ todoId }) {
  const { toggleTodo, deleteTodo, setShowNoteModal, setEditingTodo } =
    useContext(TodoContext);

  const handleEdit = () => {
    setEditingTodo(todoId);
    setShowNoteModal(true);
  };

  return (
    <div className="flex flex-col gap-2 text-xs">
      <span onClick={() => toggleTodo(todoId)} className="cursor-pointer">
        Mark as done
      </span>
      <span onClick={handleEdit} className="cursor-pointer">
        Edit
      </span>
      <span onClick={() => deleteTodo(todoId)} className="cursor-pointer">
        Delete
      </span>
    </div>
  );
}

// import React from "react";

// export default function Options() {
//   return (
//     <div className="flex flex-col gap-2 text-xs ">
//       <span>Mark as done</span>
//       <span>Edit</span>
//       <span>Delete</span>
//     </div>
//   );
// }
