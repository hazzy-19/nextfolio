'use client'

import { useTasks } from '@/context/tasks-context'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export default function HistoryPage() {
    const { tasks } = useTasks()

    const doneTasks = tasks
        .filter((task) => task.status === 'done')
        .sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime())

    return (
        <div className="min-h-screen bg-gradient-to-br from-background to-slate-900/5 dark:to-slate-900/50 p-4 md:p-8">
            <div className="mb-8 pl-14 md:pl-0">
                <Link
                    href="/reminders"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors"
                >
                    <ArrowLeft size={20} />
                    Back to Reminders
                </Link>
                <h1 className="text-3xl md:text-5xl font-bold text-foreground">
                    Task History
                </h1>
                <p className="text-muted-foreground text-lg">
                    Archive of completed tasks
                </p>
            </div>

            <div className="glass rounded-xl p-6 border border-primary/10">
                <div className="space-y-4">
                    {doneTasks.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                            <CheckCircle2 size={48} className="mx-auto mb-4 opacity-20" />
                            <p>No completed tasks yet.</p>
                        </div>
                    ) : (
                        doneTasks.map((task) => (
                            <div
                                key={task.id}
                                className="flex items-start gap-4 p-4 rounded-lg bg-background/50 border border-primary/5 hover:bg-primary/5 transition-colors"
                            >
                                <div className="mt-1">
                                    <CheckCircle2 size={20} className="text-primary" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-lg line-through text-muted-foreground decoration-primary/30">
                                        {task.title}
                                    </h3>
                                    <p className="text-muted-foreground text-sm line-clamp-2">
                                        {task.description}
                                    </p>
                                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                                        <span>Completed on {new Date(task.dueDate).toLocaleDateString()}</span> // In a real app we'd track completedAt separately
                                        <span className="capitalize px-2 py-0.5 rounded bg-primary/10 text-primary">
                                            {task.priority} Priority
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
