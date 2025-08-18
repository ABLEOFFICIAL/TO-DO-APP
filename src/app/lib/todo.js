// app/lib/todos.js
import fs from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "todos.json");

// Initialize todos.json if it doesn't exist
async function initialize() {
  try {
    await fs.access(filePath);
  } catch (err) {
    await fs.writeFile(filePath, JSON.stringify([], null, 2));
  }
}
initialize();

export async function getTodos() {
  try {
    const data = await fs.readFile(filePath, "utf8");
    const todos = JSON.parse(data);
    return todos.map((todo) => ({
      id: String(todo.id), // Ensure string ID
      title: todo.title || "",
      body: todo.body || "",
      completed: todo.completed ?? false,
    }));
  } catch (err) {
    console.error("Error reading todos:", err);
    return [];
  }
}

export async function saveTodos(todos) {
  try {
    await fs.writeFile(filePath, JSON.stringify(todos, null, 2));
  } catch (err) {
    console.error("Error saving todos:", err);
    throw new Error("Failed to save todos");
  }
}
