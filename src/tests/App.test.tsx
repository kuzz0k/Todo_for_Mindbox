import { render, screen, fireEvent } from "@testing-library/react"
import App from "../App.tsx"
import "@testing-library/jest-dom"

test("добавление новой задачи", () => {
  render(<App />)

  const input = screen.getByPlaceholderText("Add a new task")
  const addButton = screen.getByText("Add")

  fireEvent.change(input, { target: { value: "Новая задача" } })
  fireEvent.click(addButton)

  expect(screen.getByText("Новая задача")).toBeInTheDocument()
})

test("отметка задачи как выполненной", () => {
  render(<App />)

  const input = screen.getByPlaceholderText("Add a new task")
  const addButton = screen.getByText("Add")

  fireEvent.change(input, { target: { value: "Тестовая задача" } })
  fireEvent.click(addButton)

  const checkbox = screen.getByRole("checkbox")
  fireEvent.click(checkbox)

  expect(screen.getByText("Тестовая задача").closest("li")).toHaveClass(
    "completed"
  )
})

test("очистка выполненных задач", () => {
  render(<App />)

  const input = screen.getByPlaceholderText("Add a new task")
  const addButton = screen.getByText("Add")

  fireEvent.change(input, { target: { value: "Тестовая задача" } })
  fireEvent.click(addButton)

  const checkbox = screen.getByRole("checkbox")
  fireEvent.click(checkbox)

  const clearButton = screen.getByText("Clear Completed")
  fireEvent.click(clearButton)

  expect(screen.queryByText("Тестовая задача")).toBeNull()
})

test("фильтрация задач", () => {
  render(<App />)

  const input = screen.getByPlaceholderText("Add a new task")
  const addButton = screen.getByText("Add")

  fireEvent.change(input, { target: { value: "Задача 1" } })
  fireEvent.click(addButton)

  fireEvent.change(input, { target: { value: "Задача 2" } })
  fireEvent.click(addButton)

  const checkbox = screen.getByRole("checkbox")
  fireEvent.click(checkbox) // Отмечаем первую задачу как выполненную

  const filterActiveButton = screen.getByText("Active")
  fireEvent.click(filterActiveButton)

  expect(screen.queryByText("Задача 1")).not.toBeInTheDocument()
  expect(screen.getByText("Задача 2")).toBeInTheDocument()
})
