"use client";

import { useContext } from "react";
import { GoPlus } from "react-icons/go";
import { TodoContext } from "../context/contextProvider";

export default function AddModal() {
  const { addTodo, setShowNoteModal } = useContext(TodoContext);

  const showModal = () => {
    setShowNoteModal((prev) => !prev);
  };

  return (
    <div
      className="bg-[#fece1f] p-3 rounded-xl shadow-lg fixed bottom-10 right-10 cursor-pointer z-40 flex justify-between items-center md:hidden"
      onClick={showModal}
    >
      <GoPlus className="size-6" />
    </div>
  );
}
