"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Task } from "@/types/task"
import { CheckCircle, Clock, AlertCircle, ListTodo } from "lucide-react"

interface TaskStatsProps {
  tasks: Task[]
}

export function TaskStats({ tasks }: TaskStatsProps) {
  const stats = {
    total: tasks.length,
    todo: tasks.filter((t) => t.status === "to-do").length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    done: tasks.filter((t) => t.status === "done").length,
    highPriority: tasks.filter((t) => t.priority === "high").length,
  }

  const completionRate = stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Task Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
            <ListTodo className="w-4 h-4 text-gray-600" />
            <div>
              <p className="text-xs text-gray-600">Total</p>
              <p className="font-semibold">{stats.total}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2 bg-green-50 rounded">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <div>
              <p className="text-xs text-gray-600">Done</p>
              <p className="font-semibold text-green-700">{stats.done}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2 bg-blue-50 rounded">
            <Clock className="w-4 h-4 text-blue-600" />
            <div>
              <p className="text-xs text-gray-600">In Progress</p>
              <p className="font-semibold text-blue-700">{stats.inProgress}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2 bg-red-50 rounded">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <div>
              <p className="text-xs text-gray-600">High Priority</p>
              <p className="font-semibold text-red-700">{stats.highPriority}</p>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-600">Completion Rate</span>
            <span className="text-sm font-semibold">{completionRate}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
