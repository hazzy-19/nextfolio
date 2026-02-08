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
    const [tasks, setTasks] = useState<Task[]>([
        {
            id: 1,
            title: 'Review design mockups',
            description: 'Check the latest UI designs for the dashboard and provide feedback on color contrast.',
            status: 'todo',
            priority: 'high',
            dueDate: new Date().toISOString(),
            tags: ['design', 'ui'],
        },
        {
            id: 2,
            title: 'Implement API integration',
            description: 'Connect the frontend to backend API using the new endpoints.',
            status: 'in-progress',
            priority: 'high',
            dueDate: new Date(Date.now() + 86400000).toISOString(),
            tags: ['backend', 'api'],
        },
        {
            id: 3,
            title: 'Update documentation',
            description: 'Document the new calendar features and sticky note interactions.',
            status: 'todo',
            priority: 'medium',
            dueDate: new Date(Date.now() + 172800000).toISOString(),
            tags: ['docs'],
        },
        {
            id: 4,
            title: 'Fix mobile layout',
            description: 'Ensure the sidebar trigger does not overlap with page content on small screens.',
            status: 'in-progress',
            priority: 'high',
            dueDate: new Date().toISOString(),
            tags: ['mobile', 'bug'],
        },
        {
            id: 5,
            title: 'Coffee break',
            description: 'Take a break and stretch.',
            status: 'done',
            priority: 'low',
            dueDate: new Date(Date.now() - 86400000).toISOString(),
            tags: ['health'],
        },
        {
            id: 6,
            title: 'Research libraries',
            description: 'Look into new animation libraries for the hero section.',
            status: 'todo',
            priority: 'low',
            dueDate: new Date(Date.now() + 432000000).toISOString(),
            tags: ['research'],
        },
        {
            id: 7,
            title: 'Team meeting',
            description: 'Weekly sync with the engineering team.',
            status: 'todo',
            priority: 'medium',
            dueDate: new Date(Date.now() + 259200000).toISOString(),
            tags: ['meeting'],
        },
        {
            id: 8,
            title: 'Plan sprint',
            description: 'Prioritize backlog items for the next sprint.',
            status: 'todo',
            priority: 'high',
            dueDate: new Date(Date.now() + 518400000).toISOString(),
            tags: ['planning'],
        },
        {
            id: 9,
            title: 'Optimize images',
            description: 'Compress hero images for better load time.',
            status: 'done',
            priority: 'medium',
            dueDate: new Date(Date.now() - 172800000).toISOString(),
            tags: ['performance'],
        },
        {
            id: 10,
            title: 'Test accessibility',
            description: 'Run audit on the reminders page.',
            status: 'todo',
            priority: 'high',
            dueDate: new Date(Date.now() + 604800000).toISOString(),
            tags: ['a11y'],
        },
    ])

    const addTask = (newTask: Omit<Task, 'id'>) => {
        const task: Task = {
            ...newTask,
            id: Date.now(),
        }
        setTasks((prev) => [task, ...prev])
        toast.success('Task added successfully')
    }

    const updateTask = (id: number, updates: Partial<Task>) => {
        setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, ...updates } : task)))
    }

    const deleteTask = (id: number) => {
        setTasks((prev) => prev.filter((task) => task.id !== id))
        toast.success('Task deleted')
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
