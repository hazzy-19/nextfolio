'use client'

import React, { useState } from 'react'
import {
    format,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    isSameMonth,
    isSameDay,
    addMonths,
    subMonths,
    addYears,
    subYears,
    isToday,
    setMonth,
    setYear,
    getYear
} from 'date-fns'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Calendar as CalendarIcon, Maximize2, Minimize2, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Task {
    id: number
    title: string
    dueDate: string
    priority: string // 'high' | 'medium' | 'low'
    status: string // 'todo' | 'in-progress' | 'done'
}

interface CalendarViewProps {
    tasks: Task[]
    onDateSelect?: (date: Date | null) => void
    selectedDate?: Date | null
}

type ViewMode = 'calendar' | 'month-picker' | 'year-picker'

export function CalendarView({ tasks, onDateSelect, selectedDate }: CalendarViewProps) {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [isExpanded, setIsExpanded] = useState(false)
    const [viewMode, setViewMode] = useState<ViewMode>('calendar')

    const monthStart = startOfMonth(currentDate)
    const monthEnd = endOfMonth(currentDate)
    const startDate = startOfWeek(monthStart)
    const endDate = endOfWeek(monthEnd)

    const calendarDays = eachDayOfInterval({
        start: startDate,
        end: endDate,
    })

    // Priority Color Map for Pins (Ball color)
    const getPriorityColor = (task: Task) => {
        if (task.status === 'done') {
            // Teal scale for done tasks
            switch (task.priority) {
                case 'high': return 'bg-teal-700 shadow-teal-700/50'
                case 'medium': return 'bg-teal-500 shadow-teal-500/50'
                case 'low': return 'bg-teal-300 shadow-teal-300/50'
                default: return 'bg-teal-400 shadow-teal-400/50'
            }
        }
        // Standard scale for active tasks
        switch (task.priority) {
            case 'high': return 'bg-red-500 shadow-red-500/50'
            case 'medium': return 'bg-amber-400 shadow-amber-400/50'
            case 'low': return 'bg-emerald-400 shadow-emerald-400/50'
            default: return 'bg-blue-400 shadow-blue-400/50'
        }
    }

    const getDayTasks = (day: Date) => {
        return tasks.filter(task => isSameDay(new Date(task.dueDate), day))
    }

    const navigateMonth = (direction: 'prev' | 'next') => {
        setCurrentDate(direction === 'prev' ? subMonths(currentDate, 1) : addMonths(currentDate, 1))
    }

    const navigateYear = (direction: 'prev' | 'next') => {
        setCurrentDate(direction === 'prev' ? subYears(currentDate, 1) : addYears(currentDate, 1))
    }

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ]

    const currentYear = getYear(currentDate)
    const years = Array.from({ length: 12 }, (_, i) => currentYear - 6 + i)

    return (
        <div className={cn(
            "glass rounded-xl p-6 border border-primary/10 transition-all duration-500 ease-in-out",
            isExpanded ? "fixed inset-4 z-50 bg-background/95 backdrop-blur-xl border border-primary/20 shadow-2xl overflow-auto" : "relative"
        )}>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                        {viewMode === 'calendar' && (
                            <>
                                <Button variant="ghost" size="icon" onClick={() => navigateYear('prev')} className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                    <ChevronsLeft className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => navigateMonth('prev')} className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                            </>
                        )}
                    </div>

                    <Button
                        variant="ghost"
                        className="text-xl md:text-2xl font-bold flex items-center gap-2 min-w-[200px] justify-center hover:bg-primary/10"
                        onClick={() => setViewMode(viewMode === 'calendar' ? 'month-picker' : 'calendar')}
                    >
                        <CalendarIcon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                        {format(currentDate, 'MMMM yyyy')}
                        <ChevronDown className={cn("h-4 w-4 transition-transform", viewMode !== 'calendar' && "rotate-180")} />
                    </Button>

                    <div className="flex items-center gap-1">
                        {viewMode === 'calendar' && (
                            <>
                                <Button variant="ghost" size="icon" onClick={() => navigateMonth('next')} className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => navigateYear('next')} className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                    <ChevronsRight className="h-4 w-4" />
                                </Button>
                            </>
                        )}
                    </div>
                </div>

                <div className="flex gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                            setCurrentDate(new Date())
                            setViewMode('calendar')
                            if (onDateSelect) onDateSelect(new Date())
                        }}
                        className="hidden md:flex"
                    >
                        Today
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="bg-primary/5 hover:bg-primary/10 border-primary/20"
                    >
                        {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                    </Button>
                </div>
            </div>

            {/* Month/Year Picker View */}
            {viewMode === 'month-picker' && (
                <div className="grid grid-cols-3 gap-4 animate-in fade-in zoom-in-95 duration-200 p-4">
                    {months.map((month, index) => (
                        <Button
                            key={month}
                            variant={index === currentDate.getMonth() ? "default" : "outline"}
                            className="h-12"
                            onClick={() => {
                                setCurrentDate(setMonth(currentDate, index))
                                setViewMode('year-picker')
                            }}
                        >
                            {month}
                        </Button>
                    ))}
                </div>
            )}

            {viewMode === 'year-picker' && (
                <div className="grid grid-cols-4 gap-4 animate-in fade-in zoom-in-95 duration-200 p-4">
                    {years.map((year) => (
                        <Button
                            key={year}
                            variant={year === currentYear ? "default" : "outline"}
                            className="h-12"
                            onClick={() => {
                                setCurrentDate(setYear(currentDate, year))
                                setViewMode('calendar')
                            }}
                        >
                            {year}
                        </Button>
                    ))}
                </div>
            )}

            {/* Days Grid */}
            {viewMode === 'calendar' && (
                <div className="grid grid-cols-7 gap-2 md:gap-4 h-full animate-in fade-in duration-300">
                    {/* Weekday Headers */}
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                        <div key={day} className="text-center font-bold text-muted-foreground text-sm py-2">
                            {day}
                        </div>
                    ))}

                    {/* Calendar Days */}
                    {calendarDays.map((day, i) => {
                        const dayTasks = getDayTasks(day)
                        const isCurrentMonth = isSameMonth(day, currentDate)
                        const isTodayDate = isToday(day)
                        const isSelected = selectedDate && isSameDay(day, selectedDate)

                        return (
                            <div
                                key={day.toISOString()}
                                onClick={() => onDateSelect && onDateSelect(day)}
                                className={cn(
                                    "relative aspect-square rounded-xl flex flex-col items-center justify-start py-2 border transition-all duration-200 group cursor-pointer",
                                    !isCurrentMonth ? "bg-muted/20 text-muted-foreground border-transparent opacity-50" : "bg-card/50 text-foreground border-border/50 hover:border-primary/50 hover:bg-primary/5 hover:shadow-lg hover:-translate-y-1",
                                    isTodayDate && "ring-2 ring-primary ring-offset-2 ring-offset-background bg-primary/5 font-bold",
                                    isSelected && "ring-2 ring-primary ring-offset-2 ring-offset-background bg-primary/10 scale-105 z-10 shadow-xl border-primary",
                                    isExpanded ? "min-h-[100px] md:min-h-[120px]" : "min-h-[40px]"
                                )}
                            >
                                <span className={cn(
                                    "text-sm mb-1",
                                    isTodayDate && "text-primary",
                                    isSelected && "text-accent font-bold"
                                )}>
                                    {format(day, 'd')}
                                </span>

                                {/* Pins Container - 3D Effect */}
                                <div className="flex gap-1 flex-wrap justify-center mt-auto mb-1 max-w-[90%] relative z-10">
                                    {dayTasks.slice(0, isExpanded ? 5 : 3).map((task, index) => (
                                        <div
                                            key={`${task.id}-${index}`}
                                            className="relative group/pin"
                                            title={`${task.title} (${task.priority})`}
                                        >
                                            {/* Pin Head (Sphere) */}
                                            <div className={cn(
                                                "rounded-full shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.3),2px_2px_4px_rgba(0,0,0,0.3)] border-[0.5px] border-white/20",
                                                getPriorityColor(task),
                                                isExpanded ? "w-4 h-4 md:w-5 md:h-5" : "w-2.5 h-2.5 md:w-3 md:h-3"
                                            )} />
                                            {/* Pin highlighted reflection for 3D look */}
                                            <div className={cn(
                                                "absolute top-[20%] left-[20%] rounded-full bg-white/60 blur-[0.5px]",
                                                isExpanded ? "w-1.5 h-1.5" : "w-1 h-1"
                                            )} />
                                        </div>
                                    ))}
                                    {dayTasks.length > (isExpanded ? 5 : 3) && (
                                        <span className="text-[10px] text-muted-foreground ml-0.5 self-center">+</span>
                                    )}
                                </div>

                                {/* Expanded View: Show Titles */}
                                {isExpanded && dayTasks.length > 0 && (
                                    <div className="hidden md:flex flex-col w-full px-2 gap-1 mt-1 overflow-hidden">
                                        {dayTasks.slice(0, 2).map(task => (
                                            <div key={task.id} className="text-[10px] truncate w-full p-1 rounded bg-muted/50">
                                                {task.title}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
