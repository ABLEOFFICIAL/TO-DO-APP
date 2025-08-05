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
  viewingTodo: null,
  setViewingTodo: () => {},
  showViewModal: false,
  setShowViewModal: () => {},
});

export const TodoProvider = ({ children }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [viewingTodo, setViewingTodo] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    } else {
      const fetchTodos = async () => {
        try {
          const res = await fetch("https://jsonplaceholder.typicode.com/posts");
          const data = await res.json();
          const todosWithCompletion = data.slice(0, 100).map((todo) => ({
            ...todo,
            completed: false,
          }));
          setTodos(todosWithCompletion);
        } catch (error) {
          console.error("Failed to fetch todos:", error);
        }
      };

      fetchTodos();
    }
  }, []);

  useEffect(() => {
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
      if (filter === "incompleted") return !todo.completed;
      return true;
    });

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
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const markAsDone = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: true } : todo
      )
    );
  };

  const viewTodo = (id) => {
    const selected = todos.find((todo) => todo.id === id);
    setViewingTodo(selected);
    setShowViewModal(true);
  };

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
        showNoteModal,
        setShowNoteModal,
        editingTodo,
        setEditingTodo,
        markAsDone,
        viewTodo,
        viewingTodo,
        setViewingTodo,
        showViewModal,
        setShowViewModal,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
