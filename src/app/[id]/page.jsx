"use client";
import { use, useEffect, useState } from "react";
import { useContext } from "react";
import { TodoContext } from "../context/contextProvider";

export default function TodoPage({ params }) {
  const { todos } = useContext(TodoContext); // ✅ move out of useEffect
  const { id } = use(params); // ✅ unwrap params
  const [clickedTodo, setClickedTodo] = useState(null);

  useEffect(() => {
    const todo = todos.find((todo) => todo.id === id);
    setClickedTodo(todo);
  }, [id, todos]);

  if (!clickedTodo) return <p>Loading todo...</p>;

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-xl font-bold mb-2">{clickedTodo.title}</h1>
      <p className="mb-4">{clickedTodo.body}</p>
      <p>Status: {clickedTodo.completed ? "Completed" : "Incomplete"}</p>
    </div>
  );
}

// // app/[id]/page.jsx
// "use client";

// import { useContext } from "react";
// import { TodoContext } from "../context/contextProvider";
// import { notFound } from "next/navigation";

// export default function TodoDetails({ params }) {
//   const { todos } = useContext(TodoContext);
//   const id = parseInt(params.id);
//   const todo = todos.find((todo) => todo.id === id);

//   if (!todo) {
//     console.warn(`Todo with ID ${id} not found in context`, todos);
//     return notFound();
//   }

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-2">{todo.title}</h2>
//       <p className="text-gray-700">{todo.body}</p>
//       <p className="text-sm text-gray-400 mt-4">
//         Completed: {todo.completed ? "Yes" : "No"}
//       </p>
//     </div>
//   );
// }

// "use client";
// import { useParams } from "next/navigation";
// import { useContext, useEffect } from "react";
// import { TodoContext } from "../context/contextProvider";

// export default function TodoDetails() {
//   const { id } = useParams(); // Get the ID from the URL
//   const { todos, loading, error } = useContext(TodoContext);

//   useEffect(() => {
//     console.log("TodoDetails - URL ID:", id);
//     console.log("Available todos:", todos);
//   }, [id, todos]);

//   if (loading) {
//     return <p className="text-center mt-10">Loading todo...</p>;
//   }

//   if (error) {
//     return <p className="text-center mt-10 text-red-500">{error}</p>;
//   }

//   const todo = todos.find((t) => t.id === String(id));

//   if (!todo) {
//     console.log("Todo not found for ID:", id);
//     return <p className="text-center mt-10">Todo not found.</p>;
//   }

//   return (
//     <div className="p-8 max-w-xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">{todo.title}</h1>
//       <p className="text-gray-700">{todo.body}</p>
//       <p className="mt-4 text-sm text-gray-500">
//         Category: {todo.category || "None"}
//       </p>
//       <p className="text-sm text-gray-500">
//         Status: {todo.completed ? "Completed" : "Incomplete"}
//       </p>
//     </div>
//   );
// }
