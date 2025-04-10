import React, { useState } from "react"
import TodoForm from "./components/TodoForm"
import TodoList from "./components/TodoList"
import { ITodo } from "./types/ITodo"
import "./App.css"

const App: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([])
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all")

  const addTodo = (text: string) => {
    const newTodo: ITodo = {
      id: Date.now(),
      text,
      completed: false,
    }
    setTodos((prev) => [...prev, newTodo])
  }

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed))
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed
    if (filter === "completed") return todo.completed
    return true
  })

  const itemsLeft = todos.filter((todo) => !todo.completed).length

  return (
    <div className="todoapp">
      <h1 className="header">todos</h1>
      <div className="todo-container">
        <TodoForm onAdd={addTodo} />
        <TodoList todos={filteredTodos} onToggle={toggleTodo} />

        {todos.length > 0 && (
          <div className="footer">
            <span>
              {itemsLeft} item{itemsLeft !== 1 && "s"} left
            </span>
            <div className="filters">
              <button
                onClick={() => setFilter("all")}
                className={filter === "all" ? "selected" : ""}
              >
                All
              </button>
              <button
                onClick={() => setFilter("active")}
                className={filter === "active" ? "selected" : ""}
              >
                Active
              </button>
              <button
                onClick={() => setFilter("completed")}
                className={filter === "completed" ? "selected" : ""}
              >
                Completed
              </button>
            </div>
            <button onClick={clearCompleted}>Clear completed</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
