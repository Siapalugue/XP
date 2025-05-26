import { render, screen } from "@testing-library/react"
import { TaskList } from "@/components/task-list"
import { createMockTasks } from "@/lib/test-utils"

describe("TaskList", () => {
  const mockOnUpdateTask = jest.fn()
  const mockOnDeleteTask = jest.fn()

  beforeEach(() => {
    mockOnUpdateTask.mockClear()
    mockOnDeleteTask.mockClear()
  })

  it("renders empty state when no tasks", () => {
    render(<TaskList tasks={[]} onUpdateTask={mockOnUpdateTask} onDeleteTask={mockOnDeleteTask} />)

    expect(screen.getByText(/no tasks found/i)).toBeInTheDocument()
  })

  it("renders task list when tasks are provided", () => {
    const tasks = createMockTasks(3)

    render(<TaskList tasks={tasks} onUpdateTask={mockOnUpdateTask} onDeleteTask={mockOnDeleteTask} />)

    expect(screen.getByText("Task 1")).toBeInTheDocument()
    expect(screen.getByText("Task 2")).toBeInTheDocument()
    expect(screen.getByText("Task 3")).toBeInTheDocument()
  })

  it("renders correct number of task items", () => {
    const tasks = createMockTasks(5)

    render(<TaskList tasks={tasks} onUpdateTask={mockOnUpdateTask} onDeleteTask={mockOnDeleteTask} />)

    // Each task should have edit and delete buttons
    expect(screen.getAllByRole("button", { name: /edit/i })).toHaveLength(5)
    expect(screen.getAllByRole("button", { name: /delete/i })).toHaveLength(5)
  })
})
