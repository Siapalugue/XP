import { loadTasks, saveTasks, clearTasks } from "@/lib/storage"
import { createMockTasks } from "@/lib/test-utils"

describe("Storage utilities", () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe("loadTasks", () => {
    it("returns empty array when no tasks in storage", () => {
      const tasks = loadTasks()
      expect(tasks).toEqual([])
    })

    it("returns parsed tasks from localStorage", () => {
      const mockTasks = createMockTasks(2)
      localStorage.setItem("taskeasy-tasks", JSON.stringify(mockTasks))

      const tasks = loadTasks()
      expect(tasks).toEqual(mockTasks)
    })

    it("returns empty array when localStorage contains invalid JSON", () => {
      localStorage.setItem("taskeasy-tasks", "invalid-json")

      const tasks = loadTasks()
      expect(tasks).toEqual([])
    })
  })

  describe("saveTasks", () => {
    it("saves tasks to localStorage", () => {
      const mockTasks = createMockTasks(2)

      saveTasks(mockTasks)

      expect(localStorage.setItem).toHaveBeenCalledWith("taskeasy-tasks", JSON.stringify(mockTasks))
    })
  })

  describe("clearTasks", () => {
    it("removes tasks from localStorage", () => {
      clearTasks()

      expect(localStorage.removeItem).toHaveBeenCalledWith("taskeasy-tasks")
    })
  })
})
