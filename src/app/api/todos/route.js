// app/api/todos/route.js
import { getTodos, saveTodos } from "@/app/lib/todo";
import { NextResponse } from "next/server";
// import { getTodos, saveTodos } from "@/app/lib/todos";

export async function GET() {
  const todos = await getTodos();
  console.log("GET todos:", todos); // Debug
  return NextResponse.json(todos, { status: 200 });
}

export async function POST(request) {
  try {
    const newTodo = await request.json();
    if (!newTodo.title && !newTodo.body) {
      return NextResponse.json(
        { error: "Title or body is required" },
        { status: 400 }
      );
    }

    const todos = await getTodos();
    const createdTodo = {
      id: Date.now().toString(),
      title: newTodo.title || "",
      body: newTodo.body || "",
      completed: false,
    };

    todos.push(createdTodo);
    await saveTodos(todos);
    return NextResponse.json(createdTodo, { status: 201 });
  } catch (err) {
    console.error("POST error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// // GET → Fetch todos
// export async function GET() {
//   return NextResponse.json(todos);
// }

// // POST → Add new todo
// export async function POST(request) {
//   try {
//     const newTodo = await request.json();
//     todos.push({
//       id: Date.now(),
//       title: newTodo.title || "",
//       body: newTodo.body || "",
//       completed: false,
//     });
//     return NextResponse.json(todos[todos.length - 1]);
//   } catch (err) {
//     console.error("POST error:", err);
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }

// export async function POST(request) {
//   const newTodo = await request.json();

//   const res = await fetch(BASE_URL, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(newTodo),
//   });

//   const data = await res.json();

//   return NextResponse.json(data, {
//     headers: { "Content-Type": "application/json" },
//   });
// }
