"use client";

import { useContext } from "react";
import { GoPlus } from "react-icons/go";
import { TodoContext } from "../context/contextProvider";

export default function AddModalMd() {
  const { setShowNoteModal } = useContext(TodoContext);

  const showModal = () => {
    setShowNoteModal((prev) => !prev);
  };

  return (
    <div
      className="bg-[#fece1f] w-40 p-3 rounded-lg shadow-lg cursor-pointer z-40 lg:flex gap-2 justify-center items-center hidden h-full py-4 font-semibold"
      onClick={showModal}
    >
      <GoPlus className="size-6 stroke-1" />
      Add List
    </div>
  );
}
