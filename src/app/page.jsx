"use client";
import Logo from "./components/Logo";
import Top from "./components/Top";
import Category from "./components/Category";
import AddModal from "./components/AddModal";
import Todos from "./components/Todos";
import { GiHamburgerMenu } from "react-icons/gi";
import AddModalMd from "./components/AddModalMd";
import { CgAlbum } from "react-icons/cg";
import { CgCopy } from "react-icons/cg";
import { CgBackspace } from "react-icons/cg";
import { useContext, useState } from "react";
import { TodoContext } from "./context/contextProvider";
import ViewTodoMd from "./components/ViewTodoMd";

export default function Dashboard() {
  const [showSide, setShowSide] = useState(false);
  const { filter, setFilter } = useContext(TodoContext);
  console.log(filter);

  const sidebarLinks = [
    {
      name: "All Task",
      value: "all",
      icon: <CgAlbum className="size-6" />,
    },
    {
      name: "Completed",
      value: "completed",
      icon: <CgCopy className="size-6" />,
    },
    {
      name: "Incomplete",
      value: "incomplete",
      icon: <CgBackspace className="size-6" />,
    },
  ];

  return (
    <div className="bg-[#f5f5f5] lg:h-screen md:overflow-hidden">
      <div className="lg:flex lg:justify-between block lg:w-[1500px] ">
        {/* side bar */}
        <div className="h-screen w-1/5 hidden lg:block ">
          <div
            className={` bg-white shadow-md flex flex-col gap-10 py-10 px-4 h-screen
            ${showSide ? "w-60" : "w-fit h-fit"} transition-all duration-300`}
          >
            <div
              onClick={() => setShowSide((prev) => !prev)}
              className="cursor-pointer"
            >
              <GiHamburgerMenu className="size-6" />
            </div>
            <div className="flex flex-col gap-5">
              {sidebarLinks.map((sidebar, idx) => {
                return (
                  <span
                    key={idx}
                    onClick={() => setFilter(sidebar.value)}
                    className={`flex items-center ${
                      showSide ? "gap-3" : "gap-0"
                    } 
        ${filter === sidebar.value ? "bg-[#fece1f]" : ""} 
        p-2 rounded transition-all duration-300`}
                  >
                    {sidebar.icon}
                    {showSide && <span>{sidebar.name}</span>}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
        <div className="lg:w-4/5">
          <div className="lg:w-full  lg:bg-white p-5 w-screen relative min-h-screen">
            <div className="lg:flex justify-between items-center">
              <div className="flex items-center justify-between">
                <Logo />
                {/* Note: Folder component is not provided, so omitting it */}
              </div>
              <div className="lg:flex lg:items-center lg:gap-2">
                <Top />
                <Category />
                <AddModal />
                <AddModalMd />
              </div>
            </div>
            <div className="w-full flex justify-between gap-10">
              <div className="lg:w-2/5 w-full">
                <Todos />
              </div>
              <div className="h-screen w-3/5 py-5 hidden lg:block ">
                <ViewTodoMd />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
