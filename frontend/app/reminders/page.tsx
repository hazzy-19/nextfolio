'use client'

import React from "react"

import { useState } from 'react'
import { Plus, Calendar, Flag, CheckCircle2, Circle, Clock, ArrowRight, X } from 'lucide-react'
import { CalendarView } from '@/components/calendar-view'
import { cn } from '@/lib/utils'
import { isSameDay } from 'date-fns'
import Link from 'next/link'

const priorityColors = {
  high: 'border-destructive/50 bg-destructive/5',
  medium: 'border-accent/50 bg-accent/5',
  low: 'border-primary/50 bg-primary/5',
}

import { useTasks } from '@/context/tasks-context'

export default function RemindersPage() {
  const { tasks, addTask, updateTask } = useTasks()

  const [showNewTask, setShowNewTask] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const columns = [
    { id: 'todo', label: 'To Do', color: 'text-muted-foreground' },
    { id: 'in-progress', label: 'In Progress', color: 'text-accent' },
    { id: 'done', label: 'Done', color: 'text-green-500' },
  ]

  const getTasksByStatus = (status: string) => {
    let filtered = tasks.filter((task) => task.status === status)

    // Filter by date if selected
    if (selectedDate) {
      filtered = filtered.filter(task => isSameDay(new Date(task.dueDate), selectedDate))
    }

    // Newest first
    filtered.sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime())

    // If 'done' status, limit to 5 most recent if no date selected
    // If date is selected, show all for that date
    if (status === 'done' && !selectedDate) {
      return filtered.slice(0, 5)
    }

    return filtered
  }

  const handleDragStart = (e: React.DragEvent, taskId: number) => {
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('taskId', taskId.toString())
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent, status: string) => {
    e.preventDefault()
    const taskId = parseInt(e.dataTransfer.getData('taskId'))
    // Find the task and update status
    // Since we are using context, we call updateTask
    updateTask(taskId, { status: status as any })
  }

  // Sticky Note Variant Helpers
  const noteColors = ['bg-[#fef08a]', 'bg-[#bbf7d0]', 'bg-[#bfdbfe]', 'bg-[#fbcfe8]', 'bg-[#e9d5ff]', 'bg-[#fff7d1]']

  // Use a deterministic way to get color/rotate based on ID to avoid hydration mismatch
  const getNoteStyle = (id: number) => {
    const colorIndex = id % noteColors.length
    const rotate = (id % 10) - 5 // -5 to 5 degrees
    return {
      className: `${noteColors[colorIndex]} dark:bg-opacity-80`,
      rotate: rotate
    }
  }

  // Form State
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [newTaskDesc, setNewTaskDesc] = useState('')
  const [newTaskPriority, setNewTaskPriority] = useState('medium')
  const [newTaskDueDate, setNewTaskDueDate] = useState('')
  const [newTaskTags, setNewTaskTags] = useState('')

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTaskTitle) return

    addTask({
      title: newTaskTitle,
      description: newTaskDesc,
      status: 'todo',
      priority: newTaskPriority as any,
      dueDate: newTaskDueDate || new Date().toISOString(),
      tags: newTaskTags ? newTaskTags.split(',').map(tag => tag.trim()).filter(Boolean) : ['manual'],
    })

    // Reset
    setNewTaskTitle('')
    setNewTaskDesc('')
    setNewTaskPriority('medium')
    setNewTaskDueDate('')
    setNewTaskTags('')
    setShowNewTask(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-slate-900/5 dark:to-slate-900/50 p-4 md:p-8">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 -mx-4 -mt-4 px-4 pt-4 pb-4 mb-8 bg-background/80 backdrop-blur-xl border-b border-white/5 flex flex-col gap-4 md:static md:bg-transparent md:border-none md:p-0 md:m-0 md:mb-12 md:flex-row md:items-center md:justify-between">
        <div className="pl-14 md:pl-0 flex flex-col items-start gap-1">
          {selectedDate ? (
            <div className="flex flex-col gap-1 animate-in fade-in slide-in-from-left-4 duration-300">
              <button
                onClick={() => setSelectedDate(null)}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group text-sm font-medium"
              >
                <ArrowRight size={16} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
                Back to All Tasks
              </button>
              <h1 className="text-2xl md:text-4xl font-bold text-foreground leading-tight flex items-center gap-2">
                <Calendar size={24} className="text-primary hidden md:block" />
                Tasks for {selectedDate.toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}
              </h1>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-left-4 duration-300">
              <h1 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">
                Tasks & Reminders
              </h1>
              <p className="text-muted-foreground text-sm md:text-lg">
                Organize your work with Kanban board
              </p>
            </div>
          )}

          {!selectedDate && (
            <button
              onClick={() => setShowNewTask(!showNewTask)}
              className="mt-2 text-primary hover:text-primary/80 font-medium transition-colors flex items-center gap-2 md:hidden"
            >
              <Plus size={18} />
              New Task
            </button>
          )}
        </div>

        {!selectedDate && (
          <button
            onClick={() => setShowNewTask(!showNewTask)}
            className="hidden md:flex px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors items-center gap-2"
          >
            <Plus size={20} />
            <span className="hidden sm:inline">New Task</span>
          </button>
        )}
      </div>

      {/* New Task Form */}
      {showNewTask && (
        <div className="glass rounded-xl p-8 border border-primary/10 mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">New Task</h2>
          <form className="space-y-4" onSubmit={handleCreateTask}>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Title
              </label>
              <input
                type="text"
                placeholder="Task title"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-primary/5 border border-primary/20 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/40"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Priority
                </label>
                <select
                  value={newTaskPriority}
                  onChange={(e) => setNewTaskPriority(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-background text-foreground border border-primary/20 focus:outline-none focus:border-primary/40"
                >
                  <option value="medium" className="bg-background text-foreground">Medium</option>
                  <option value="low" className="bg-background text-foreground">Low</option>
                  <option value="high" className="bg-background text-foreground">High</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Due Date
                </label>
                <input
                  type="date"
                  value={newTaskDueDate}
                  onChange={(e) => setNewTaskDueDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-primary/5 border border-primary/20 text-foreground focus:outline-none focus:border-primary/40"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Category / Tags (comma separated)
              </label>
              <input
                type="text"
                placeholder="e.g. Design, Meeting, UI"
                value={newTaskTags}
                onChange={(e) => setNewTaskTags(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-primary/5 border border-primary/20 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/40"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Description
              </label>
              <textarea
                placeholder="Task description"
                value={newTaskDesc}
                onChange={(e) => setNewTaskDesc(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-primary/5 border border-primary/20 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/40 resize-none h-24"
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Create Task
            </button>
          </form>
        </div >
      )
      }



      {/* Kanban Board */}
      <div className="space-y-8">
        {columns.map((column) => {
          const columnTasks = getTasksByStatus(column.id)
          const isDoneColumn = column.id === 'done'

          return (
            <div
              key={column.id}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
              className="glass rounded-xl p-6 border border-primary/10 min-h-[300px] flex flex-col"
            >
              {/* Column Header */}
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h2 className={`text-lg font-bold ${column.color}`}>
                    {column.label}
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    {columnTasks.length}
                    {isDoneColumn && !selectedDate && tasks.filter(t => t.status === 'done').length > 5 && "+"}
                  </span>
                </div>
                {isDoneColumn && !selectedDate && tasks.filter(t => t.status === 'done').length > 0 && (
                  <Link href="/reminders/history" className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1">
                    History <ArrowRight size={12} />
                  </Link>
                )}
              </div>

              {/* Tasks Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 px-1 py-2">
                {columnTasks.map((task, index) => {
                  const { className, rotate } = getNoteStyle(task.id)
                  return (
                    <div
                      key={task.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, task.id)}
                      className={cn(
                        "sticky-note group relative aspect-square p-6 text-slate-800 shadow-lg cursor-move transition-transform duration-300 hover:scale-110 hover:z-10 hover:shadow-2xl dark:shadow-black/50 flex flex-col",
                        className
                      )}
                      style={{
                        transform: `rotate(${rotate}deg)`,
                      }}
                    >
                      {/* Pin Graphic */}
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-400 shadow-sm border border-black/10 z-20 flex items-center justify-center">
                        <div className="w-1 h-1 bg-white/50 rounded-full" />
                      </div>

                      <div className="flex-1 flex flex-col min-w-0 font-handwriting">
                        <h3 className="font-bold text-xl leading-tight mb-2 break-words">
                          {task.title}
                        </h3>
                        <p className="text-sm opacity-80 leading-snug line-clamp-4 flex-1">
                          {task.description}
                        </p>
                      </div>

                      {/* Footer Info */}
                      <div className="flex items-center justify-between pt-2 border-t border-black/5 mt-2">
                        <div className="flex flex-wrap gap-1">
                          {task.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wider font-bold bg-black/5"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-2">
                          {/* Mobile Move Control */}
                          <div className="md:hidden relative group/move">
                            <div className="p-1 rounded-full hover:bg-black/5 transition-colors cursor-pointer">
                              <ArrowRight size={14} className="opacity-50" />
                            </div>
                            <select
                              value={task.status}
                              onChange={(e) => updateTask(task.id, { status: e.target.value as any })}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              title="Move task"
                            >
                              <option value="todo" className="bg-background text-foreground">To Do</option>
                              <option value="in-progress" className="bg-background text-foreground">In Progress</option>
                              <option value="done" className="bg-background text-foreground">Done</option>
                            </select>
                          </div>

                          <div className={cn(
                            "w-3 h-3 rounded-full border shadow-sm",
                            task.priority === 'high' ? 'bg-red-500 border-red-600' :
                              task.priority === 'medium' ? 'bg-amber-400 border-amber-500' :
                                'bg-emerald-400 border-emerald-500'
                          )} title={`Priority: ${task.priority}`} />
                        </div>
                      </div>

                      {/* Date Stamp */}
                      <div className="absolute -bottom-2 -right-2 transform rotate-[-5deg] text-[10px] font-mono opacity-50 bg-white/50 px-1 rounded">
                        {new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                  )
                })}
              </div>

              {isDoneColumn && !selectedDate && tasks.filter(t => t.status === 'done').length > 5 && (
                <div className="mt-4 text-center">
                  <Link href="/reminders/history">
                    <button className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      View all completed tasks...
                    </button>
                  </Link>
                </div>
              )}

              {columnTasks.length === 0 && (
                <div className="flex items-center justify-center h-32 text-muted-foreground opacity-50 italic">
                  <p className="text-sm">Empty board...</p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Calendar View Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
          <Calendar size={28} />
          Calendar View
        </h2>
        <CalendarView
          tasks={tasks}
          onDateSelect={(date) => {
            if (date && selectedDate && isSameDay(date, selectedDate)) {
              setSelectedDate(null)
            } else {
              setSelectedDate(date)
            }
          }}
          selectedDate={selectedDate}
        />
      </div>
    </div >
  )
}
