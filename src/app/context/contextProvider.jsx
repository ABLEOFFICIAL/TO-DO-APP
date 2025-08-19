// contextProvider.jsx
"use client";

import { createContext, useState, useEffect } from "react";

export const TodoContext = createContext({});

export const TodoProvider = ({ children }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [viewingTodo, setViewingTodo] = useState(null);
  const [viewingTodoMD, setViewingTodoMD] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewMdOptions, setViewMdOptions] = useState(false);

  // Load todos from localStorage on mount
  const fetchTodos = () => {
    setLoading(true);
    setError(null);
    try {
      const storedTodos = localStorage.getItem("todos");
      const parsedTodos = storedTodos ? JSON.parse(storedTodos) : [];
      setTodos(
        parsedTodos.map((todo) => ({
          id: String(todo.id), // Ensure string ID
          title: todo.title || "",
          body: todo.body || "",
          completed: todo.completed ?? false,
        }))
      );
    } catch (err) {
      console.error("Failed to load todos:", err);
      setError("Failed to load todos. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Save todos to localStorage
  const saveTodos = (newTodos) => {
    try {
      localStorage.setItem("todos", JSON.stringify(newTodos));
      setTodos(newTodos);
    } catch (err) {
      console.error("Failed to save todos:", err);
      setError("Failed to save todos. Please try again.");
    }
  };

  const addTodo = (newTodo) => {
    try {
      const createdTodo = {
        id: Date.now().toString(), // Server-like string ID
        title: newTodo.title || "",
        body: newTodo.body || "",
        completed: false,
      };
      const updatedTodos = [...todos, createdTodo];
      saveTodos(updatedTodos);
      setError(null);
    } catch (err) {
      console.error("Add todo failed:", err);
      setError("Failed to add todo. Please try again.");
    }
  };

  const editTodo = (updatedTodo) => {
    try {
      const id = String(updatedTodo.id);
      console.log("Editing todo:", { id, ...updatedTodo });
      const updatedTodos = todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              title:
                updatedTodo.title !== undefined
                  ? updatedTodo.title
                  : todo.title,
              body:
                updatedTodo.body !== undefined ? updatedTodo.body : todo.body,
              completed:
                updatedTodo.completed !== undefined
                  ? updatedTodo.completed
                  : todo.completed,
            }
          : todo
      );
      saveTodos(updatedTodos);
      setError(null);
    } catch (err) {
      console.error("Edit todo failed:", err);
      setError("Failed to edit todo. Please try again.");
    }
  };

  const deleteTodo = (id) => {
    try {
      const updatedTodos = todos.filter((todo) => todo.id !== String(id));
      saveTodos(updatedTodos);
      setError(null);
    } catch (err) {
      console.error("Delete todo failed:", err);
      setError("Failed to delete todo. Please try again.");
    }
  };

  const toggleTodo = (id) => {
    try {
      const todo = todos.find((t) => t.id === String(id));
      if (!todo) throw new Error("Todo not found");
      editTodo({ ...todo, completed: !todo.completed });
    } catch (err) {
      console.error("Toggle todo failed:", err);
      setError("Failed to toggle todo. Please try again.");
    }
  };

  const markAsDone = (id) => {
    try {
      const todo = todos.find((t) => t.id === String(id));
      if (!todo) throw new Error("Todo not found");
      editTodo({ ...todo, completed: true });
    } catch (err) {
      console.error("Mark as done failed:", err);
      setError("Failed to mark todo as done. Please try again.");
    }
  };

  const viewTodo = (id) => {
    const selected = todos.find((todo) => todo.id === String(id));
    if (selected) {
      setViewingTodo(selected);
      setShowViewModal(true);
    }
  };

  const viewTodoMD = (id) => {
    const selected = todos.find((todo) => todo.id === String(id));
    if (selected) setViewingTodoMD(selected);
  };

  const filteredTodos = (todos || [])
    .filter((todo) => {
      const query = searchQuery?.toLowerCase() || "";
      return (
        todo.title?.toLowerCase().includes(query) ||
        todo.body?.toLowerCase().includes(query)
      );
    })
    .filter((todo) => {
      if (filter === "completed") return todo.completed;
      if (filter === "incomplete") return !todo.completed;
      return true;
    });

  return (
    <TodoContext.Provider
      value={{
        title,
        setTitle,
        text,
        setText,
        todos,
        setTodos,
        searchQuery,
        setSearchQuery,
        filter,
        setFilter,
        filteredTodos,
        addTodo,
        editTodo,
        deleteTodo,
        toggleTodo,
        markAsDone,
        viewTodo,
        viewingTodo,
        setViewingTodo,
        viewTodoMD,
        viewingTodoMD,
        setViewingTodoMD,
        showNoteModal,
        setShowNoteModal,
        editingTodo,
        setEditingTodo,
        showViewModal,
        setShowViewModal,
        error,
        setError,
        loading,
        setLoading,
        viewMdOptions,
        setViewMdOptions,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

// "use client";

// import { createContext, useState, useEffect } from "react";

// export const TodoContext = createContext({
//   sideBar: false,
//   setSideBar: () => {},
//   todos: [],
//   setTodos: () => {},
//   searchQuery: "",
//   setSearchQuery: () => {},
//   filter: "all",
//   setFilter: () => {},
//   filteredTodos: [],
//   toggleTodo: () => {},
//   addTodo: () => {},
//   deleteTodo: () => {},
//   editTodo: () => {},
//   showNoteModal: false,
//   setShowNoteModal: () => {},
//   editingTodo: null,
//   setEditingTodo: () => {},
//   title: "",
//   setTitle: () => {},
//   text: "",
//   setText: () => {},
//   markAsDone: () => {},
//   viewTodo: () => {},
//   viewTodoMD: () => {},
//   viewingTodo: null,
//   setViewingTodo: () => {},
//   showViewModal: false,
//   setShowViewModal: () => {},
//   error: null,
//   setError: () => {},
//   loading: false,
//   setLoading: () => {},
//   viewMdOptions: false,
//   setViewMdOptions: () => {},
// });

// export const TodoProvider = ({ children }) => {
//   const [title, setTitle] = useState("");
//   const [text, setText] = useState("");
//   const [todos, setTodos] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filter, setFilter] = useState("all"); // ✅ Correct usage
//   const [showNoteModal, setShowNoteModal] = useState(false);
//   const [editingTodo, setEditingTodo] = useState(null);
//   const [viewingTodo, setViewingTodo] = useState(null);
//   const [viewingTodoMD, setViewingTodoMD] = useState(null);
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [viewMdOptions, setViewMdOptions] = useState(false);

//   useEffect(() => {
//     const fetchTodos = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         const storedTodos = localStorage.getItem("todos");
//         if (storedTodos) {
//           const parsedTodos = JSON.parse(storedTodos);
//           if (Array.isArray(parsedTodos) && parsedTodos.length > 0) {
//             setTodos(parsedTodos);
//             setLoading(false);
//             return;
//           }
//         }

//         // If no valid todos, fetch dummy text
//         const res = await fetch("https://jsonplaceholder.typicode.com/posts");
//         if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

//         const data = await res.json();
//         const todosWithCompletion = data.slice(0, 10).map((todo) => ({
//           ...todo,
//           completed: false,
//         }));

//         setTodos(todosWithCompletion);
//         localStorage.setItem("todos", JSON.stringify(todosWithCompletion));
//       } catch (error) {
//         console.error("Failed to fetch todos:", error);
//         setError("Failed to load todos. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTodos();
//   }, []);

//   useEffect(() => {
//     console.log("Saving todos to localStorage:", todos);
//     localStorage.setItem("todos", JSON.stringify(todos));
//   }, [todos]);

//   const filteredTodos = todos
//     .filter((todo) => {
//       const query = searchQuery.toLowerCase();
//       return (
//         todo.title.toLowerCase().includes(query) ||
//         todo.body.toLowerCase().includes(query)
//       );
//     })
//     .filter((todo) => {
//       if (filter === "completed") return todo.completed;
//       if (filter === "incomplete") return !todo.completed;
//       return true;
//     });

//   console.log("Filtered todos:", filteredTodos);

//   const toggleTodo = (id) => {
//     setTodos(
//       todos.map((todo) =>
//         todo.id === id ? { ...todo, completed: !todo.completed } : todo
//       )
//     );
//   };

//   const addTodo = (newTodo) => {
//     setTodos((prevTodos) => [...prevTodos, newTodo]);
//   };

//   const deleteTodo = (id) => {
//     setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));

//     // 🆕 If the deleted todo is the one being viewed, clear the view
//     setViewingTodoMD((prev) => (prev?.id === id ? null : prev));
//     localStorage.removeItem("todosMD");
//   };

//   const markAsDone = (id) => {
//     setTodos((prevTodos) =>
//       prevTodos.map((todo) =>
//         todo.id === id ? { ...todo, completed: true } : todo
//       )
//     );
//   };

//   const editTodo = (updatedTodo) => {
//     setTodos((prevTodos) =>
//       prevTodos.map((todo) =>
//         todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo
//       )
//     );
//   };

//   const viewTodo = (id) => {
//     const selected = todos.find((todo) => todo.id === id);
//     setViewingTodo(selected);
//     setShowViewModal(true);
//   };
//   const viewTodoMD = (id) => {
//     const selected = todos.find((todo) => todo.id === id);
//     setViewingTodoMD(selected);
//   };

//   useEffect(() => {
//     localStorage.setItem("todosMD", JSON.stringify(viewingTodoMD));
//   }, [viewingTodoMD]);

//   return (
//     <TodoContext.Provider
//       value={{
//         title,
//         setTitle,
//         text,
//         setText,
//         todos,
//         setTodos,
//         searchQuery,
//         setSearchQuery,
//         filter,
//         setFilter,
//         filteredTodos,
//         toggleTodo,
//         addTodo,
//         deleteTodo,
//         editTodo,
//         showNoteModal,
//         setShowNoteModal,
//         editingTodo,
//         setEditingTodo,
//         markAsDone,
//         viewTodo,
//         viewingTodo,
//         setViewingTodo,
//         viewTodoMD,
//         viewingTodoMD,
//         setViewingTodoMD,
//         showViewModal,
//         setShowViewModal,
//         error,
//         setError,
//         loading,
//         setLoading,
//         viewMdOptions,
//         setViewMdOptions,
//       }}
//     >
//       {children}
//     </TodoContext.Provider>
//   );
// };
