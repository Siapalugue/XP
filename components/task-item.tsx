"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { TaskForm } from "@/components/task-form"
import type { Task, TaskPriority, TaskStatus } from "@/types/task"
import { Edit, Trash2, Clock } from "lucide-react"

interface TaskItemProps {
  task: Task
  onUpdate: (id: string, updates: Partial<Task>) => void
  onDelete: (id: string) => void
}

export function TaskItem({ task, onUpdate, onDelete }: TaskItemProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
    }
  }

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case "to-do":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "done":
        return "bg-green-100 text-green-800 border-green-200"
    }
  }

  const handleStatusChange = (newStatus: TaskStatus) => {
    onUpdate(task.id, { status: newStatus })
  }

  const handleEditSubmit = (updates: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
    onUpdate(task.id, updates)
    setIsEditDialogOpen(false)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-gray-900 truncate">{task.title}</h3>
              <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
            </div>

            {task.description && <p className="text-gray-600 text-sm mb-3 line-clamp-2">{task.description}</p>}

            <div className="flex items-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>Created {formatDate(task.createdAt)}</span>
              </div>
              {task.updatedAt !== task.createdAt && <span>Updated {formatDate(task.updatedAt)}</span>}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Select value={task.status} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="to-do">To Do</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="done">Done</SelectItem>
              </SelectContent>
            </Select>

            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Task</DialogTitle>
                </DialogHeader>
                <TaskForm onSubmit={handleEditSubmit} initialData={task} submitLabel="Update Task" />
              </DialogContent>
            </Dialog>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(task.id)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
