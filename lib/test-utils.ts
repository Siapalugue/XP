import type { Task, TaskPriority, TaskStatus } from "@/types/task"

export function createMockTask(overrides: Partial<Task> = {}): Task {
  return {
    id: crypto.randomUUID(),
    title: "Test Task",
    description: "Test Description",
    priority: "medium" as TaskPriority,
    status: "to-do" as TaskStatus,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  }
}

export function createMockTasks(count: number): Task[] {
  return Array.from({ length: count }, (_, index) =>
    createMockTask({
      title: `Task ${index + 1}`,
      priority: ["low", "medium", "high"][index % 3] as TaskPriority,
      status: ["to-do", "in-progress", "done"][index % 3] as TaskStatus,
    }),
  )
}
