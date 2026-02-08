'use client'

import { useState } from 'react'
import { Plus, Calendar, Search, Trash2, Edit2 } from 'lucide-react'

const moodEmojis = ['😊', '😢', '😤', '😴', '😍', '🤔']
const weatherOptions = ['☀️ Sunny', '🌤️ Cloudy', '🌧️ Rainy', '❄️ Snowy']

export default function DiaryPage() {
  const [entries] = useState([
    {
      id: 1,
      date: '2024-02-08',
      title: 'Q1 Planning Session',
      content: 'Had a productive meeting about quarterly goals. Discussed priorities and timelines.',
      mood: '😊',
      weather: '☀️ Sunny',
      tags: ['work', 'planning'],
      category: 'work',
    },
    {
      id: 2,
      date: '2024-02-07',
      title: 'Morning Reflection',
      content: 'Started the day with meditation. Feeling more focused and centered.',
      mood: '😍',
      weather: '🌤️ Cloudy',
      tags: ['personal', 'meditation'],
      category: 'personal',
    },
    {
      id: 3,
      date: '2024-02-06',
      title: 'New Project Launch',
      content: 'Excited to announce the launch of our new dashboard project! The team did amazing work.',
      mood: '😊',
      weather: '☀️ Sunny',
      tags: ['work', 'projects', 'achievement'],
      category: 'work',
    },
    {
      id: 4,
      date: '2024-02-05',
      title: 'Learning Day',
      content: 'Spent the day exploring new TypeScript features and React patterns.',
      mood: '🤔',
      weather: '🌧️ Rainy',
      tags: ['learning', 'programming'],
      category: 'ideas',
    },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showNewEntry, setShowNewEntry] = useState(false)

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'personal', label: 'Personal' },
    { id: 'work', label: 'Work' },
    { id: 'ideas', label: 'Ideas' },
  ]

  const filteredEntries = entries.filter(
    (entry) =>
      (selectedCategory === 'all' || entry.category === selectedCategory) &&
      (searchTerm === '' ||
        entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.content.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-slate-900/5 dark:to-slate-900/50 p-4 md:p-8">
      {/* Header */}
      <div className="mb-12 flex items-center justify-between">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
            Digital Diary
          </h1>
          <p className="text-muted-foreground text-lg">
            Your personal timeline and reflections
          </p>
        </div>
        <button
          onClick={() => setShowNewEntry(!showNewEntry)}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          <span className="hidden sm:inline">New Entry</span>
        </button>
      </div>

      {/* New Entry Form */}
      {showNewEntry && (
        <div className="glass rounded-xl p-8 border-t-4 border-t-primary mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">New Diary Entry</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Title
              </label>
              <input
                type="text"
                placeholder="Entry title"
                className="w-full px-4 py-3 rounded-lg bg-primary/5 border border-primary/20 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/40"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Mood
                </label>
                <div className="flex gap-2 flex-wrap">
                  {moodEmojis.map((mood) => (
                    <button
                      key={mood}
                      type="button"
                      className="text-3xl p-2 rounded-lg hover:bg-primary/20 transition-colors"
                    >
                      {mood}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Weather
                </label>
                <select className="w-full px-4 py-3 rounded-lg bg-primary/5 border border-primary/20 text-foreground focus:outline-none focus:border-primary/40">
                  {weatherOptions.map((weather) => (
                    <option key={weather}>{weather}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Content
              </label>
              <textarea
                placeholder="Write your thoughts..."
                className="w-full px-4 py-3 rounded-lg bg-primary/5 border border-primary/20 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/40 resize-none h-32"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Tags
              </label>
              <input
                type="text"
                placeholder="Add tags (comma-separated)"
                className="w-full px-4 py-3 rounded-lg bg-primary/5 border border-primary/20 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/40"
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Save Entry
            </button>
          </form>
        </div>
      )}

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
          <input
            type="text"
            placeholder="Search entries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-primary/5 border border-primary/20 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/40"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-primary/10 text-foreground hover:bg-primary/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-6">
        {filteredEntries.map((entry) => (
          <div key={entry.id} className="flex gap-6">
            {/* Timeline dot */}
            <div className="flex flex-col items-center">
              <div className="w-4 h-4 rounded-full bg-primary border-4 border-background dark:border-slate-950" />
              <div className="w-1 h-20 bg-gradient-to-b from-primary to-transparent" />
            </div>

            {/* Entry card */}
            <div className="flex-1 glass rounded-xl p-6 border-l-4 border-l-accent card-hover">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{entry.mood}</span>
                    <span className="text-sm text-muted-foreground">
                      {new Date(entry.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    {entry.title}
                  </h3>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 rounded-lg hover:bg-primary/10 transition-colors">
                    <Edit2 size={18} className="text-muted-foreground hover:text-foreground" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-destructive/10 transition-colors">
                    <Trash2 size={18} className="text-muted-foreground hover:text-destructive" />
                  </button>
                </div>
              </div>

              <p className="text-foreground mb-4 leading-relaxed">
                {entry.content}
              </p>

              <div className="flex flex-wrap gap-3 items-center pt-4 border-t border-border">
                <span className="text-lg">{entry.weather}</span>
                <div className="flex flex-wrap gap-2">
                  {entry.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredEntries.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            No entries found. Start writing!
          </p>
        </div>
      )}
    </div>
  )
}
