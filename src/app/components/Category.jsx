"use client";

import { useContext } from "react";
import { TodoContext } from "../context/contextProvider";

export function FilterCard({ children, onClick, className }) {
  return (
    <div
      className={`${className} rounded-lg p-2 text-xs font-medium cursor-pointer`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export default function Category() {
  const { filter, setFilter } = useContext(TodoContext);

  return (
    <div className="flex gap-3 mt-2">
      {["All Tasks", "Completed", "Incompleted"].map((cat, idx) => {
        const categoryValue = cat.toLowerCase().replace(" tasks", "");
        return (
          <FilterCard
            key={idx}
            onClick={() => setFilter(categoryValue)}
            className={`${
              filter === categoryValue ? "bg-[#fece1f]" : "bg-white"
            }`}
          >
            {cat}
          </FilterCard>
        );
      })}
    </div>
  );
}
