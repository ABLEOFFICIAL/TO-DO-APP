"use client";

import { useContext } from "react";
import { GoPlus } from "react-icons/go";
import { TodoContext } from "../context/contextProvider";

export default function AddModal() {
  const { addTodo, setShowNoteModal } = useContext(TodoContext);

  const showModal = () => {
    setShowNoteModal((prev) => !prev);
    // const newTodo = {
    //   id: Date.now(),
    //   userId: 1,
    //   title: "New Task",
    //   body: "This is a new task",
    //   completed: false,
    // };
    // addTodo(newTodo);
  };

  return (
    <div
      className="bg-[#fece1f] p-3 rounded-xl shadow-lg fixed bottom-10 right-10 cursor-pointer z-40 flex justify-between items-center"
      onClick={showModal}
    >
      <GoPlus className="size-6" />
    </div>
  );
}

// import React from "react";
// import { GoPlus } from "react-icons/go";

// export default function AddModal() {
//   return (
//     <div
//       id="add-note"
//       className="bg-[#fece1f] p-3 rounded-xl shadow-lg fixed bottom-10 right-10 cursor-pointer z-40 flex justify-between items-center "
//     >
//       <GoPlus className="size-6" />
//     </div>
//   );
// }
