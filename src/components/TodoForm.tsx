import React from "react"
import { useForm } from "react-hook-form"

interface FormValues {
  todo: string
}

interface TodoFormProps {
  onAdd: (text: string) => void
}

const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
  const { register, handleSubmit, reset } = useForm<FormValues>()

  const onSubmit = (data: FormValues) => {
    if (data.todo.trim()) {
      onAdd(data.todo.trim())
      reset()
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        {...register("todo")}
      />
    </form>
  )
}

export default TodoForm
