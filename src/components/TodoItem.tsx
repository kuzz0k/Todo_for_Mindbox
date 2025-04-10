import React from 'react';
import { ITodo } from '../types/ITodo';

interface TodoItemProps {
  todo: ITodo;
  onToggle: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle }) => {
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span className="custom-checkbox"></span>
        <span className="todo-text">{todo.text}</span>
      </label>
    </li>
  );
};

export default TodoItem;
