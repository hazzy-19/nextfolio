'use client'

import { useState } from 'react'
import { Plus, Github, ExternalLink, Calendar } from 'lucide-react'

export default function ProjectsPage() {
  const [projects] = useState([
    {
      id: 1,
      title: 'Nexfolio Dashboard',
      description: 'Personal digital portfolio and dashboard system',
      progress: 45,
      languages: ['TypeScript', 'React', 'Tailwind'],
      lastUpdated: '2 hours ago',
      github: 'nexfolio',
    },
    {
      id: 2,
      title: 'AI Content Generator',
      description: 'Intelligent content creation tool with multiple models',
      progress: 78,
      languages: ['Python', 'FastAPI', 'PostgreSQL'],
      lastUpdated: '1 day ago',
      github: 'ai-content-gen',
    },
    {
      id: 3,
      title: 'Mobile Analytics App',
      description: 'Real-time analytics dashboard for mobile apps',
      progress: 92,
      languages: ['React Native', 'Node.js', 'MongoDB'],
      lastUpdated: '3 hours ago',
      github: 'mobile-analytics',
    },
    {
      id: 4,
      title: 'Design System',
      description: 'Comprehensive UI component library and design tokens',
      progress: 65,
      languages: ['React', 'Storybook', 'TypeScript'],
      lastUpdated: '5 days ago',
      github: 'design-system',
    },
    {
      id: 5,
      title: 'Cloud Backup Tool',
      description: 'Encrypted cloud storage and backup solution',
      progress: 30,
      languages: ['Go', 'AWS', 'PostgreSQL'],
      lastUpdated: '1 week ago',
      github: 'cloud-backup',
    },
    {
      id: 6,
      title: 'Web Performance Monitor',
      description: 'Monitor and optimize web application performance',
      progress: 55,
      languages: ['JavaScript', 'Node.js', 'InfluxDB'],
      lastUpdated: '2 days ago',
      github: 'perf-monitor',
    },
  ])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-slate-900/5 dark:to-slate-900/50 p-4 md:p-8">
      {/* Header */}
      <div className="mb-12 flex items-center justify-between">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
            Projects
          </h1>
          <p className="text-muted-foreground text-lg">
            Track your GitHub projects and repositories
          </p>
        </div>
        <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
          <Plus size={20} />
          <span className="hidden sm:inline">New Project</span>
        </button>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-wrap gap-3">
        <button className="px-4 py-2 rounded-lg bg-primary/20 text-primary border border-primary/40 font-medium transition-colors">
          All
        </button>
        <button className="px-4 py-2 rounded-lg hover:bg-primary/10 text-muted-foreground font-medium transition-colors">
          In Progress
        </button>
        <button className="px-4 py-2 rounded-lg hover:bg-primary/10 text-muted-foreground font-medium transition-colors">
          Completed
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="glass card-hover rounded-xl p-6 border-l-4 border-l-primary flex flex-col"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-foreground">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {project.description}
                </p>
              </div>
              <button className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors">
                <Github size={20} className="text-primary" />
              </button>
            </div>

            {/* Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-muted-foreground">
                  Progress
                </span>
                <span className="text-sm font-bold text-primary">
                  {project.progress}%
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-primary/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>

            {/* Languages */}
            <div className="mb-4 flex flex-wrap gap-2">
              {project.languages.map((lang) => (
                <span
                  key={lang}
                  className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium border border-accent/20"
                >
                  {lang}
                </span>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar size={14} />
                {project.lastUpdated}
              </div>
              <button className="p-2 rounded-lg hover:bg-primary/10 transition-colors">
                <ExternalLink size={16} className="text-primary" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Manually Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Add Manually</h2>
        <div className="glass rounded-xl p-8 border-t-4 border-t-accent">
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Project Title
                </label>
                <input
                  type="text"
                  placeholder="Enter project title"
                  className="w-full px-4 py-3 rounded-lg bg-primary/5 border border-primary/20 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/40"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Progress (%)
                </label>
                <input
                  type="number"
                  placeholder="0-100"
                  className="w-full px-4 py-3 rounded-lg bg-primary/5 border border-primary/20 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/40"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Description
              </label>
              <textarea
                placeholder="Project description"
                className="w-full px-4 py-3 rounded-lg bg-primary/5 border border-primary/20 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/40 resize-none h-24"
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 rounded-lg bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-colors"
            >
              Add Project
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
