"use client"

import { useState, useEffect } from "react"
import { TaskForm } from "@/components/task-form"
import { TaskList } from "@/components/task-list"
import { TaskStats } from "@/components/task-stats"
import type { Task, TaskStatus } from "@/types/task"
import { loadTasks, saveTasks } from "@/lib/storage"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TaskManagementApp() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filter, setFilter] = useState<TaskStatus | "all">("all")

  useEffect(() => {
    const savedTasks = loadTasks()
    setTasks(savedTasks)
  }, [])

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  const addTask = (taskData: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setTasks((prev) => [...prev, newTask])
  }

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updates, updatedAt: new Date().toISOString() } : task)),
    )
  }

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const filteredTasks = tasks.filter((task) => (filter === "all" ? true : task.status === filter))

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 }
    return priorityOrder[b.priority] - priorityOrder[a.priority]
  })

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">TaskEasy</h1>
          <p className="text-gray-600">Simple task management for productive teams</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Task Creation */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Create New Task</CardTitle>
              </CardHeader>
              <CardContent>
                <TaskForm onSubmit={addTask} />
              </CardContent>
            </Card>

            <div className="mt-6">
              <TaskStats tasks={tasks} />
            </div>
          </div>

          {/* Task List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Tasks</CardTitle>
                <Tabs value={filter} onValueChange={(value) => setFilter(value as TaskStatus | "all")}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="to-do">To Do</TabsTrigger>
                    <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                    <TabsTrigger value="done">Done</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent>
                <TaskList tasks={sortedTasks} onUpdateTask={updateTask} onDeleteTask={deleteTask} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
