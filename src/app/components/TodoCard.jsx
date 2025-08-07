"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ViewTodoMd from "./ViewTodoMd";
import { useContext } from "react";
import { TodoContext } from "../context/contextProvider";

export default function TodoCard({ children, id }) {
  const router = useRouter();
  const { viewTodoMD } = useContext(TodoContext);
  const viewTodo = () => {
    console.log(window.screen.width);

    if (window.screen.width <= 808) {
      router.push(`/${id}`);
    } else {
      viewTodoMD(id);
    }
  };

  return (
    <button
      onClick={viewTodo}
      // href={`/${id}`}
      className="w-full bg-white lg:bg-[#f5f5f5] h-28 rounded-md shadow-sm p-3 flex items-center justify-between"
    >
      {children}
    </button>
  );
}
