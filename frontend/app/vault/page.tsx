'use client'

import { useState } from 'react'
import { Plus, Link2, Search, Folder, Archive, Trash2, ExternalLink } from 'lucide-react'

export default function VaultPage() {
  const [links] = useState([
    {
      id: 1,
      title: 'React Documentation',
      url: 'https://react.dev',
      favicon: '⚛️',
      description: 'Official React documentation and guides',
      category: 'learning',
      tags: ['react', 'javascript', 'web'],
      dateAdded: '2024-01-15',
      readLater: false,
    },
    {
      id: 2,
      title: 'Tailwind CSS',
      url: 'https://tailwindcss.com',
      favicon: '🎨',
      description: 'Utility-first CSS framework',
      category: 'tools',
      tags: ['css', 'design', 'web'],
      dateAdded: '2024-01-20',
      readLater: true,
    },
    {
      id: 3,
      title: 'Web Performance Tips',
      url: 'https://web.dev/performance',
      favicon: '⚡',
      description: 'Best practices for web performance optimization',
      category: 'learning',
      tags: ['performance', 'optimization'],
      dateAdded: '2024-02-01',
      readLater: false,
    },
    {
      id: 4,
      title: 'TypeScript Handbook',
      url: 'https://www.typescriptlang.org/docs/',
      favicon: '📘',
      description: 'Complete TypeScript reference and guides',
      category: 'learning',
      tags: ['typescript', 'javascript'],
      dateAdded: '2024-01-10',
      readLater: false,
    },
    {
      id: 5,
      title: 'Figma Design System',
      url: 'https://www.figma.com',
      favicon: '✏️',
      description: 'Collaborative design tool for teams',
      category: 'tools',
      tags: ['design', 'collaboration'],
      dateAdded: '2024-02-03',
      readLater: true,
    },
    {
      id: 6,
      title: 'CSS Grid Guide',
      url: 'https://css-tricks.com/snippets/css/complete-guide-grid/',
      favicon: '📱',
      description: 'Complete guide to CSS Grid layout',
      category: 'learning',
      tags: ['css', 'layout', 'web'],
      dateAdded: '2024-01-25',
      readLater: false,
    },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showNewLink, setShowNewLink] = useState(false)

  const categories = [
    { id: 'all', label: 'All Resources' },
    { id: 'learning', label: 'Learning' },
    { id: 'tools', label: 'Tools' },
    { id: 'inspiration', label: 'Inspiration' },
  ]

  const filteredLinks = links.filter(
    (link) =>
      (selectedCategory === 'all' || link.category === selectedCategory) &&
      (searchTerm === '' ||
        link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        link.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        link.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        ))
  )

  const stats = [
    { label: 'Total Links', value: links.length },
    { label: 'Read Later', value: links.filter((l) => l.readLater).length },
    { label: 'Categories', value: categories.length - 1 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-slate-900/5 dark:to-slate-900/50 p-4 md:p-8">
      {/* Header */}
      <div className="mb-12 flex items-center justify-between">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
            Knowledge Vault
          </h1>
          <p className="text-muted-foreground text-lg">
            Your curated collection of resources and bookmarks
          </p>
        </div>
        <button
          onClick={() => setShowNewLink(!showNewLink)}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          <span className="hidden sm:inline">Add Link</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat) => (
          <div key={stat.label} className="glass rounded-xl p-6">
            <p className="text-muted-foreground text-sm font-medium">
              {stat.label}
            </p>
            <p className="text-3xl font-bold text-foreground mt-2">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* New Link Form */}
      {showNewLink && (
        <div className="glass rounded-xl p-8 border-t-4 border-t-primary mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Add New Link</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                URL
              </label>
              <input
                type="url"
                placeholder="https://example.com"
                className="w-full px-4 py-3 rounded-lg bg-primary/5 border border-primary/20 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/40"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Title
              </label>
              <input
                type="text"
                placeholder="Resource title"
                className="w-full px-4 py-3 rounded-lg bg-primary/5 border border-primary/20 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/40"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Category
                </label>
                <select className="w-full px-4 py-3 rounded-lg bg-primary/5 border border-primary/20 text-foreground focus:outline-none focus:border-primary/40">
                  <option>Learning</option>
                  <option>Tools</option>
                  <option>Inspiration</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  placeholder="Comma-separated"
                  className="w-full px-4 py-3 rounded-lg bg-primary/5 border border-primary/20 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/40"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Description
              </label>
              <textarea
                placeholder="Brief description"
                className="w-full px-4 py-3 rounded-lg bg-primary/5 border border-primary/20 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/40 resize-none h-20"
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Save Link
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
            placeholder="Search resources..."
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

      {/* Links Grid */}
      <div className="space-y-4 mb-12">
        {filteredLinks.map((link) => (
          <div
            key={link.id}
            className="glass rounded-xl p-6 border-l-4 border-l-primary card-hover flex items-start gap-4"
          >
            {/* Favicon */}
            <div className="text-3xl flex-shrink-0">{link.favicon}</div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-foreground">
                {link.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {link.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-3">
                {link.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium border border-accent/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* URL */}
              <p className="text-xs text-muted-foreground mt-3 truncate">
                {link.url}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-2 flex-shrink-0">
              <button
                className={`p-2 rounded-lg transition-colors ${
                  link.readLater
                    ? 'bg-accent/20 text-accent'
                    : 'bg-primary/10 text-muted-foreground hover:text-foreground'
                }`}
              >
                <Archive size={20} />
              </button>
              <button className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                <ExternalLink size={20} />
              </button>
              <button className="p-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors">
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredLinks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            No resources found. Start adding links!
          </p>
        </div>
      )}

      {/* Read Later Section */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
          <Archive size={28} />
          Read Later ({links.filter((l) => l.readLater).length})
        </h2>
        <div className="glass rounded-xl p-8 border-t-4 border-t-accent">
          {links
            .filter((l) => l.readLater)
            .map((link) => (
              <div key={link.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  {link.title}
                </a>
                <button className="p-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
