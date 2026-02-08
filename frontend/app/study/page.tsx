'use client'

import { useState } from 'react'
import { Plus, FileText, Video, BarChart3, CheckCircle2, Clock, BookOpen, Trash2 } from 'lucide-react'

export default function StudyPage() {
  const [materials] = useState([
    {
      id: 1,
      title: 'Advanced TypeScript',
      description: 'Master TypeScript advanced patterns and techniques',
      type: 'video',
      progress: 65,
      modules: 8,
      completed: 5,
      dueDate: '2024-03-15',
      notes: 3,
    },
    {
      id: 2,
      title: 'React Performance Optimization',
      description: 'Optimize React applications for better performance',
      type: 'document',
      progress: 80,
      modules: 5,
      completed: 4,
      dueDate: '2024-02-28',
      notes: 7,
    },
    {
      id: 3,
      title: 'System Design Fundamentals',
      description: 'Learn the fundamentals of system design',
      type: 'video',
      progress: 45,
      modules: 10,
      completed: 4,
      dueDate: '2024-04-10',
      notes: 12,
    },
    {
      id: 4,
      title: 'CSS Grid & Flexbox Mastery',
      description: 'Complete guide to modern CSS layouts',
      type: 'document',
      progress: 92,
      modules: 6,
      completed: 6,
      dueDate: '2024-02-15',
      notes: 4,
    },
    {
      id: 5,
      title: 'JavaScript Algorithms',
      description: 'Data structures and algorithms in JavaScript',
      type: 'document',
      progress: 30,
      modules: 12,
      completed: 3,
      dueDate: '2024-05-01',
      notes: 8,
    },
  ])

  const [showNewMaterial, setShowNewMaterial] = useState(false)
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const stats = [
    { label: 'Active Courses', value: materials.length, icon: BookOpen },
    { label: 'Total Hours', value: '47', icon: Clock },
    { label: 'Completion Rate', value: '62%', icon: BarChart3 },
  ]

  const getMaterialIcon = (type: string) => {
    return type === 'video' ? '🎥' : '📄'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-slate-900/5 dark:to-slate-900/50 p-4 md:p-8">
      {/* Header */}
      <div className="mb-12 flex items-center justify-between">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
            Study Materials
          </h1>
          <p className="text-muted-foreground text-lg">
            Track your learning journey
          </p>
        </div>
        <button
          onClick={() => setShowNewMaterial(!showNewMaterial)}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          <span className="hidden sm:inline">Add Course</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="glass rounded-xl p-6 border-l-4 border-l-primary"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-foreground mt-2">
                    {stat.value}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-primary/10">
                  <Icon size={24} className="text-primary" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* New Material Form */}
      {showNewMaterial && (
        <div className="glass rounded-xl p-8 border-t-4 border-t-primary mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Add Study Material</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Title
              </label>
              <input
                type="text"
                placeholder="Course or material title"
                className="w-full px-4 py-3 rounded-lg bg-primary/5 border border-primary/20 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/40"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Type
                </label>
                <select className="w-full px-4 py-3 rounded-lg bg-primary/5 border border-primary/20 text-foreground focus:outline-none focus:border-primary/40">
                  <option>Document</option>
                  <option>Video</option>
                  <option>Course</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Due Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 rounded-lg bg-primary/5 border border-primary/20 text-foreground focus:outline-none focus:border-primary/40"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Description
              </label>
              <textarea
                placeholder="What is this course about?"
                className="w-full px-4 py-3 rounded-lg bg-primary/5 border border-primary/20 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/40 resize-none h-24"
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Add Material
            </button>
          </form>
        </div>
      )}

      {/* Materials List */}
      <div className="space-y-6 mb-12">
        {materials.map((material) => (
          <div
            key={material.id}
            className="glass rounded-xl overflow-hidden border-l-4 border-l-primary card-hover"
          >
            {/* Header */}
            <button
              onClick={() => setExpandedId(expandedId === material.id ? null : material.id)}
              className="w-full p-6 text-left hover:bg-primary/5 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">
                      {getMaterialIcon(material.type)}
                    </span>
                    <h3 className="text-lg font-bold text-foreground">
                      {material.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {material.description}
                  </p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <div className="text-2xl font-bold text-primary">
                    {material.progress}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Complete
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4 w-full h-2 rounded-full bg-primary/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                  style={{ width: `${material.progress}%` }}
                />
              </div>
            </button>

            {/* Expanded Content */}
            {expandedId === material.id && (
              <div className="border-t border-border p-6 bg-primary/5">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Modules</p>
                    <p className="text-2xl font-bold text-foreground">
                      {material.completed}/{material.modules}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Notes</p>
                    <p className="text-2xl font-bold text-foreground">
                      {material.notes}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-muted-foreground mb-2">
                      Due Date
                    </p>
                    <p className="text-lg font-bold text-foreground">
                      {new Date(material.dueDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>

                {/* Module Progress */}
                <div className="mb-6">
                  <h4 className="font-semibold text-foreground mb-4">
                    Module Progress
                  </h4>
                  <div className="space-y-2">
                    {Array.from({ length: material.modules }).map((_, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-background/50 transition-colors"
                      >
                        {i < material.completed ? (
                          <CheckCircle2
                            size={20}
                            className="text-green-500 flex-shrink-0"
                          />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-muted-foreground flex-shrink-0" />
                        )}
                        <span
                          className={
                            i < material.completed
                              ? 'text-foreground line-through'
                              : 'text-foreground'
                          }
                        >
                          Module {i + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-2 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 font-medium transition-colors">
                    <FileText className="inline mr-2" size={16} />
                    View Notes
                  </button>
                  <button className="flex-1 px-4 py-2 rounded-lg bg-accent/20 text-accent hover:bg-accent/30 font-medium transition-colors">
                    <Video className="inline mr-2" size={16} />
                    Resume
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Stats Section */}
      <div className="glass rounded-xl p-8 border-t-4 border-t-accent">
        <h2 className="text-2xl font-bold text-foreground mb-6">Learning Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Time Spent */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Time Spent This Week</h3>
            <div className="space-y-3">
              {[
                { day: 'Monday', hours: 2 },
                { day: 'Tuesday', hours: 3 },
                { day: 'Wednesday', hours: 1.5 },
                { day: 'Thursday', hours: 2.5 },
                { day: 'Friday', hours: 1 },
              ].map((item) => (
                <div key={item.day} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {item.day}
                  </span>
                  <div className="flex-1 mx-4 h-2 rounded-full bg-primary/10 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent"
                      style={{ width: `${(item.hours / 3) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {item.hours}h
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Completion Goals */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Goals</h3>
            <div className="space-y-4">
              {[
                { goal: 'Complete TypeScript Course', target: '80%', current: 65 },
                { goal: 'Finish 2 Video Courses', target: '2/2', current: 1 },
                { goal: 'Take 30 Notes', target: '30', current: 24 },
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">
                      {item.goal}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {item.target}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-primary/10 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent transition-all"
                      style={{ width: `${(item.current / parseInt(item.target)) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
