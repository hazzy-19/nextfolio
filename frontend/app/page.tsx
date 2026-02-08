'use client'

import { useState, useEffect } from 'react'
import { Plus, TrendingUp, FileText, CheckCircle2, ExternalLink } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useTasks } from '@/context/tasks-context'

export default function Dashboard() {
  const [newItem, setNewItem] = useState('')
  const [itemType, setItemType] = useState('note')
  const [dateString, setDateString] = useState('')
  const { addTask } = useTasks()

  const handleQuickAdd = () => {
    if (!newItem.trim()) return

    addTask({
      title: newItem,
      description: `Quick added ${itemType}`,
      status: 'todo',
      priority: 'medium',
      dueDate: new Date().toISOString(),
      tags: ['quick-add', itemType],
    })
    setNewItem('')
  }
  useEffect(() => {
    setDateString(new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }))
  }, [])

  const stats = [
    { label: 'Active Projects', value: '12', icon: TrendingUp, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Tasks Today', value: '8', icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-500/10' },
    { label: 'Diary Entries', value: '42', icon: FileText, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  ]



  const quickAddOptions = [
    { id: 'note', label: 'Note', icon: FileText },
    { id: 'link', label: 'Link', icon: ExternalLink },
    { id: 'task', label: 'Task', icon: CheckCircle2 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-slate-900/5 dark:to-slate-900/50 p-4 md:p-8 relative overflow-hidden">
      {/* Hero Section */}
      {/* Hero Section */}
      <div className="mb-8 min-h-[60vh] flex items-center justify-center p-4">
        <div className="w-full max-w-4xl rounded-3xl p-8 md:p-12 text-center relative overflow-hidden group">
          {/* Decorative background element */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />

          <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 text-foreground">
            Welcome Back
          </h1>
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-medium mb-8">
            {dateString}
          </div>
          <p className="text-muted-foreground text-lg md:text-xl max-w-lg mx-auto leading-relaxed">
            Your digital command center is ready. What will you create today?
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 md:mb-12">
        {/* Stats Cards */}
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="border-l-4 border-l-primary hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm font-medium">{stat.label}</p>
                    <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                    <Icon size={24} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Add Widget */}
      <div className="mb-8 md:mb-12">
        <Card className="border-t border-primary/20">
          <CardHeader>
            <CardTitle>Quick Add</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3 flex-wrap mb-4">
              {quickAddOptions.map((option) => {
                const Icon = option.icon
                return (
                  <Button
                    key={option.id}
                    variant={itemType === option.id ? "default" : "secondary"}
                    onClick={() => setItemType(option.id)}
                    className="gap-2"
                  >
                    <Icon size={18} />
                    {option.label}
                  </Button>
                )
              })}
            </div>
            <div className="flex gap-3">
              <Input
                type="text"
                placeholder={`Add a new ${itemType}...`}
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleQuickAdd()
                }}
                className="flex-1 bg-primary/5 border-primary/20 h-11"
              />
              <Button size="lg" className="gap-2" onClick={handleQuickAdd}>
                <Plus size={20} />
                Add
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  )
}
