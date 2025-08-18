// app/api/todos/[id]/route.js
import { getTodos, saveTodos } from "@/app/lib/todo";
import { NextResponse } from "next/server";
// import { getTodos, saveTodos } from "@/app/lib/todos";

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const updates = await request.json();
    console.log("PUT received:", { id, updates }); // Debug

    const todos = await getTodos();
    const index = todos.findIndex((todo) => {
      console.log("Comparing:", todo.id, id, todo.id === id); // Debug
      return todo.id === id;
    });

    if (index === -1) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    todos[index] = {
      ...todos[index],
      title: updates.title !== undefined ? updates.title : todos[index].title,
      body: updates.body !== undefined ? updates.body : todos[index].body,
      completed:
        updates.completed !== undefined
          ? updates.completed
          : todos[index].completed,
    };

    await saveTodos(todos);
    return NextResponse.json(todos[index], { status: 200 });
  } catch (err) {
    console.error("PUT error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    console.log("DELETE received ID:", id); // Debug

    const todos = await getTodos();
    const index = todos.findIndex((todo) => {
      console.log("Comparing:", todo.id, id, todo.id === id); // Debug
      return todo.id === id;
    });

    if (index === -1) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    const deletedTodo = todos.splice(index, 1)[0];
    await saveTodos(todos);
    return NextResponse.json(deletedTodo, { status: 200 });
  } catch (err) {
    console.error("DELETE error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PUT → Update todo
// export async function PUT(request, { params }) {
//   try {
//     const { id } = params;
//     const updatedData = await request.json();

//     const index = todos.findIndex((todo) => todo.id === Number(id));
//     if (index === -1) {
//       return NextResponse.json({ error: "Todo not found" }, { status: 404 });
//     }

//     todos[index] = {
//       ...todos[index],
//       ...updatedData,
//       id: todos[index].id,
//     };

//     return NextResponse.json(todos[index]);
//   } catch (err) {
//     console.error("PUT error:", err);
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }

// // DELETE → Remove todo
// export async function DELETE(request, { params }) {
//   try {
//     const { id } = params;
//     const index = todos.findIndex((todo) => todo.id === Number(id));

//     if (index === -1) {
//       return NextResponse.json({ error: "Todo not found" }, { status: 404 });
//     }

//     todos.splice(index, 1);
//     return NextResponse.json({ message: "Todo deleted" });
//   } catch (err) {
//     console.error("DELETE error:", err);
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }
