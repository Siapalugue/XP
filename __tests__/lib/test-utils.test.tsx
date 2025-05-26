import { createMockTask, createMockTasks } from "@/lib/test-utils"

describe("Test utilities", () => {
  describe("createMockTask", () => {
    it("creates a task with default values", () => {
      const task = createMockTask()

      expect(task).toMatchObject({
        title: "Test Task",
        description: "Test Description",
        priority: "medium",
        status: "to-do",
      })
      expect(task.id).toBeDefined()
      expect(task.createdAt).toBeDefined()
      expect(task.updatedAt).toBeDefined()
    })

    it("creates a task with overridden values", () => {
      const overrides = {
        title: "Custom Title",
        priority: "high" as const,
      }

      const task = createMockTask(overrides)

      expect(task.title).toBe("Custom Title")
      expect(task.priority).toBe("high")
      expect(task.description).toBe("Test Description") // default value
    })
  })

  describe("createMockTasks", () => {
    it("creates specified number of tasks", () => {
      const tasks = createMockTasks(5)

      expect(tasks).toHaveLength(5)
      expect(tasks[0].title).toBe("Task 1")
      expect(tasks[4].title).toBe("Task 5")
    })

    it("creates tasks with cycling priorities and statuses", () => {
      const tasks = createMockTasks(6)

      // Check priority cycling
      expect(tasks[0].priority).toBe("low")
      expect(tasks[1].priority).toBe("medium")
      expect(tasks[2].priority).toBe("high")
      expect(tasks[3].priority).toBe("low") // cycles back

      // Check status cycling
      expect(tasks[0].status).toBe("to-do")
      expect(tasks[1].status).toBe("in-progress")
      expect(tasks[2].status).toBe("done")
      expect(tasks[3].status).toBe("to-do") // cycles back
    })
  })
})
