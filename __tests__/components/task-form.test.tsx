"use client"

import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { TaskForm } from "@/components/task-form"
import type { Task } from "@/types/task"

describe("TaskForm", () => {
  const mockOnSubmit = jest.fn()

  beforeEach(() => {
    mockOnSubmit.mockClear()
  })

  it("renders all form fields", () => {
    render(<TaskForm onSubmit={mockOnSubmit} />)

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/priority/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /create task/i })).toBeInTheDocument()
  })

  it("submits form with valid data", async () => {
    const user = userEvent.setup()
    render(<TaskForm onSubmit={mockOnSubmit} />)

    await user.type(screen.getByLabelText(/title/i), "Test Task")
    await user.type(screen.getByLabelText(/description/i), "Test Description")

    await user.click(screen.getByRole("button", { name: /create task/i }))

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        title: "Test Task",
        description: "Test Description",
        priority: "medium",
        status: "to-do",
      })
    })
  })

  it("does not submit form with empty title", async () => {
    const user = userEvent.setup()
    render(<TaskForm onSubmit={mockOnSubmit} />)

    await user.click(screen.getByRole("button", { name: /create task/i }))

    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it("resets form after successful submission", async () => {
    const user = userEvent.setup()
    render(<TaskForm onSubmit={mockOnSubmit} />)

    const titleInput = screen.getByLabelText(/title/i)
    const descriptionInput = screen.getByLabelText(/description/i)

    await user.type(titleInput, "Test Task")
    await user.type(descriptionInput, "Test Description")
    await user.click(screen.getByRole("button", { name: /create task/i }))

    await waitFor(() => {
      expect(titleInput).toHaveValue("")
      expect(descriptionInput).toHaveValue("")
    })
  })

  it("populates form with initial data when provided", () => {
    const initialData: Partial<Task> = {
      title: "Existing Task",
      description: "Existing Description",
      priority: "high",
      status: "in-progress",
    }

    render(<TaskForm onSubmit={mockOnSubmit} initialData={initialData} />)

    expect(screen.getByDisplayValue("Existing Task")).toBeInTheDocument()
    expect(screen.getByDisplayValue("Existing Description")).toBeInTheDocument()
  })
})
