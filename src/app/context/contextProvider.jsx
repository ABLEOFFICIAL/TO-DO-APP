"use client";

import { createContext, useState, useEffect } from "react";

export const TodoContext = createContext({
  sideBar: false,
  setSideBar: () => {},
  todos: [],
  setTodos: () => {},
  searchQuery: "",
  setSearchQuery: () => {},
  filter: "all",
  setFilter: () => {},
  filteredTodos: [],
  toggleTodo: () => {},
  addTodo: () => {},
  deleteTodo: () => {},
  editTodo: () => {},
  showNoteModal: false,
  setShowNoteModal: () => {},
  editingTodo: null,
  setEditingTodo: () => {},
  title: "",
  setTitle: () => {},
  text: "",
  setText: () => {},
  markAsDone: () => {},
  viewTodo: () => {},
  viewTodoMD: () => {},
  viewingTodo: null,
  setViewingTodo: () => {},
  showViewModal: false,
  setShowViewModal: () => {},
  error: null,
  setError: () => {},
  loading: false,
  setLoading: () => {},
  viewMdOptions: false,
  setViewMdOptions: () => {},
});

export const TodoProvider = ({ children }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all"); // ✅ Correct usage
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [viewingTodo, setViewingTodo] = useState(null);
  const [viewingTodoMD, setViewingTodoMD] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewMdOptions, setViewMdOptions] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      setError(null);

      // Log localStorage content
      const storedTodos = localStorage.getItem("todos");
      console.log("Stored todos in localStorage:", storedTodos);

      if (storedTodos) {
        try {
          const parsedTodos = JSON.parse(storedTodos);
          if (Array.isArray(parsedTodos)) {
            console.log("Parsed todos from localStorage:", parsedTodos);
            setTodos(parsedTodos);
            setLoading(false);
            return;
          } else {
            console.error("Invalid todos format in localStorage, resetting...");
            localStorage.removeItem("todos"); // Clear corrupted data
          }
        } catch (error) {
          console.error("Failed to parse todos from localStorage:", error);
          localStorage.removeItem("todos"); // Clear corrupted data
        }
      }

      // Fetch from API if no valid localStorage data
      try {
        console.log("Fetching todos from API...");
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        const todosWithCompletion = data.slice(0, 100).map((todo) => ({
          ...todo,
          completed: false,
        }));
        console.log("Fetched todos from API:", todosWithCompletion);
        setTodos(todosWithCompletion);
      } catch (error) {
        console.error("Failed to fetch todos:", error);
        setError("Failed to load todos. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  useEffect(() => {
    console.log("Saving todos to localStorage:", todos);
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const filteredTodos = todos
    .filter((todo) => {
      const query = searchQuery.toLowerCase();
      return (
        todo.title.toLowerCase().includes(query) ||
        todo.body.toLowerCase().includes(query)
      );
    })
    .filter((todo) => {
      if (filter === "completed") return todo.completed;
      if (filter === "incomplete") return !todo.completed;
      return true;
    });

  console.log("Filtered todos:", filteredTodos);

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const addTodo = (newTodo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));

    // 🆕 If the deleted todo is the one being viewed, clear the view
    setViewingTodoMD((prev) => (prev?.id === id ? null : prev));
    localStorage.removeItem("todosMD");
  };

  const markAsDone = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: true } : todo
      )
    );
  };

  const editTodo = (updatedTodo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo
      )
    );
  };

  const viewTodo = (id) => {
    const selected = todos.find((todo) => todo.id === id);
    setViewingTodo(selected);
    setShowViewModal(true);
  };
  const viewTodoMD = (id) => {
    const selected = todos.find((todo) => todo.id === id);
    setViewingTodoMD(selected);
  };

  useEffect(() => {
    localStorage.setItem("todosMD", JSON.stringify(viewingTodoMD));
  }, [viewingTodoMD]);

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
        toggleTodo,
        addTodo,
        deleteTodo,
        editTodo,
        showNoteModal,
        setShowNoteModal,
        editingTodo,
        setEditingTodo,
        markAsDone,
        viewTodo,
        viewingTodo,
        setViewingTodo,
        viewTodoMD,
        viewingTodoMD,
        setViewingTodoMD,
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
