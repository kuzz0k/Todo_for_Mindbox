import React from "react"
import { ITodo } from "../types/ITodo"
import TodoItem from "./TodoItem"

interface TodoListProps {
  todos: ITodo[]
  onToggle: (id: number) => void
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle }) => {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} />
      ))}
    </ul>
  )
}

export default TodoList
