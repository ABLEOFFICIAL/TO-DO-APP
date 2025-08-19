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
      createdAt: Date.now(),
    };

    todos.push(createdTodo);
    await saveTodos(todos);
    return NextResponse.json(createdTodo, { status: 201 });
  } catch (err) {
    console.error("POST error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
