'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'sonner'

export interface Task {
    id: number
    title: string
    description?: string
    status: 'todo' | 'in-progress' | 'done'
    priority: 'low' | 'medium' | 'high'
    dueDate: string
    tags: string[]
}

interface TasksContextType {
    tasks: Task[]
    addTask: (task: Omit<Task, 'id'>) => void
    updateTask: (id: number, updates: Partial<Task>) => void
    deleteTask: (id: number) => void
}

const TasksContext = createContext<TasksContextType | undefined>(undefined)

export function TasksProvider({ children }: { children: React.ReactNode }) {
    const [tasks, setTasks] = useState<Task[]>([])

    // Fetch initial data
    useEffect(() => {
        fetch('/api/tasks')
            .then(res => res.json())
            .then(data => setTasks(data))
            .catch(err => toast.error("Failed to load tasks"))
    }, [])

    const addTask = async (newTask: Omit<Task, 'id'>) => {
        try {
            const res = await fetch('/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTask)
            })
            if (!res.ok) throw new Error('Failed to create task')
            const savedTask = await res.json()
            setTasks((prev) => [savedTask, ...prev])
            toast.success('Task added successfully')
        } catch (error) {
            toast.error('Failed to add task')
        }
    }

    const updateTask = async (id: number, updates: Partial<Task>) => {
        // Optimistic update
        setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, ...updates } : task)))

        if (updates.status) {
            try {
                await fetch(`/api/tasks/${id}/status?status=${updates.status}`, { method: 'PUT' })
            } catch (error) {
                console.error("Update failed", error)
                toast.error("Failed to update status")
                // Revert?
            }
        }
    }

    const deleteTask = async (id: number) => {
        setTasks((prev) => prev.filter((task) => task.id !== id))
        try {
            await fetch(`/api/tasks/${id}`, { method: 'DELETE' })
            toast.success('Task deleted')
        } catch (error) {
            toast.error('Failed to delete task')
        }
    }

    return (
        <TasksContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
            {children}
        </TasksContext.Provider>
    )
}

export function useTasks() {
    const context = useContext(TasksContext)
    if (context === undefined) {
        throw new Error('useTasks must be used within a TasksProvider')
    }
    return context
}
