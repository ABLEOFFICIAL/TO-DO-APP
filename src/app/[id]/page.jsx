"use client";
import { use, useEffect, useState, useContext, useRef } from "react";
import { TodoContext } from "../context/contextProvider";
import { IoMdArrowBack } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { Options } from "../components/Todos";

export default function TodoPage({ params }) {
  const { todos } = useContext(TodoContext);
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  const [clickedTodo, setClickedTodo] = useState(null);
  const router = useRouter();
  const modalRef = useRef(null);
  const [openModalId, setOpenModalId] = useState(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const {
    filteredTodos,
    markAsDone,
    deleteTodo,
    viewTodo,
    setShowNoteModal,
    setEditingTodo,
  } = useContext(TodoContext);

  const goBack = () => {
    router.back();
  };
  useEffect(() => {
    const todo = todos.find((todo) => todo.id === id);
    setClickedTodo(todo);
  }, [id, todos]);

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

  const handleMoreOptionsClick = (e, todoId) => {
    const modalWidth = 180;
    const modalHeight = 160;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const buttonRect = e.currentTarget.getBoundingClientRect();

    let left = buttonRect.left + window.scrollX;
    let top = buttonRect.bottom + window.scrollY + 5 - 230;

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

  if (!clickedTodo) return <p>Loading todo...</p>;

  return (
    <div className="min-h-screen p-5 relative">
      {" "}
      {/* <-- Make this the anchor */}
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <IoMdArrowBack onClick={goBack} className="size-6 cursor-pointer" />
          <HiOutlineDotsVertical
            onClick={(e) => {
              handleMoreOptionsClick(e, clickedTodo.id);
            }}
            className="size-6"
          />
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-semibold ">
            {clickedTodo.title || "Title"}
          </h1>
          <p className="text-xs font-normal text-neutral-950/50">
            {new Date(clickedTodo.createdAt).toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            | {clickedTodo.body.length} characters
          </p>
          <p className="text-sm font-normal ">{clickedTodo.body}</p>
        </div>
      </div>
      {/* ⬇️ Moved OUTSIDE of flex container but still inside relatively positioned wrapper */}
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
            router.push("/");
          }}
        />
      )}
    </div>
  );
}
