export async function GetTodos() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      cache: "force-cache", // Ensure consistent data during SSR
    });
    const data = await res.json();
    return data.map((todo) => ({ ...todo, completed: false }));
  } catch (error) {
    console.error("Error fetching todos:", error);
    // Fallback to provided JSON data
    return [
      {
        userId: 1,
        id: 1,
        title:
          "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
        completed: false,
      },
      // ... (rest of the provided JSON data, truncated for brevity)
    ];
  }
}

// import React from "react";

// export default async function GetTodos() {
//   const res = await fetch("https://jsonplaceholder.typicode.com/posts");
//   return res.json();
// }
