"use client";

import { useContext, useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { TodoContext } from "../context/contextProvider";

export default function Top() {
  const { sideBar, setSideBar, setSearchQuery } = useContext(TodoContext);

  const showSideBar = () => {
    setSideBar((prev) => !prev);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Ensure client-side rendering doesn't cause mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <header className="relative w-full lg:w-64 mx-auto flex items-center">
      <IoMdSearch className="absolute left-4 cursor-pointer size-6" />

      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search notes..."
        className="bg-[#e8e8e9] pl-12 w-full pr-2 py-4 rounded-lg text-md focus:outline-0"
        onChange={handleSearch}
      />
    </header>
  );
}

// "use client";
// import React, { useContext } from "react";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { Context } from "../context/contextProvider";

// export default function Top() {
//   const { sideBar, setSidebar } = useContext(Context);
//   const showsideBar = () => {
//     setSidebar((prev) => !prev);
//   };
//   return (
//     <header className="relative w-full mx-auto  flex items-center ">
//       <GiHamburgerMenu
//         onClick={showsideBar}
//         className="absolute left-4 cursor-pointer size-6"
//       />

//       <input
//         type="text"
//         name="search"
//         id="search"
//         placeholder="Search notes..."
//         className="bg-[#e8e8e9] pl-13 w-full pr-2 py-4 rounded-lg text-md focus:outline-0"
//       />
//     </header>
//   );
// }
