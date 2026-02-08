'use client'

import { useState } from 'react'
import { Plus, Heart, Share2, Search, Filter } from 'lucide-react'

export default function GalleryPage() {
  const [items] = useState([
    {
      id: 1,
      type: 'image',
      title: 'Mountain Vista',
      thumbnail: 'bg-gradient-to-br from-blue-500 to-purple-600',
      height: 'h-64',
      likes: 234,
      tags: ['nature', 'landscape'],
      liked: false,
    },
    {
      id: 2,
      type: 'image',
      title: 'Urban Architecture',
      thumbnail: 'bg-gradient-to-br from-gray-600 to-gray-800',
      height: 'h-72',
      likes: 189,
      tags: ['city', 'architecture'],
      liked: false,
    },
    {
      id: 3,
      type: 'image',
      title: 'Ocean Sunset',
      thumbnail: 'bg-gradient-to-br from-orange-400 to-red-600',
      height: 'h-56',
      likes: 412,
      tags: ['nature', 'sunset'],
      liked: false,
    },
    {
      id: 4,
      type: 'text',
      title: 'Digital Design Tips',
      content: '10 essential principles for modern UI design that every designer should know.',
      height: 'h-48',
      likes: 156,
      tags: ['design', 'tips'],
      liked: false,
    },
    {
      id: 5,
      type: 'image',
      title: 'Forest Path',
      thumbnail: 'bg-gradient-to-br from-green-500 to-emerald-600',
      height: 'h-80',
      likes: 378,
      tags: ['nature', 'forest'],
      liked: false,
    },
    {
      id: 6,
      type: 'image',
      title: 'City Lights',
      thumbnail: 'bg-gradient-to-br from-indigo-600 to-purple-700',
      height: 'h-60',
      likes: 521,
      tags: ['city', 'night'],
      liked: false,
    },
    {
      id: 7,
      type: 'text',
      title: 'Web Development Trends 2024',
      content: 'Exploring the latest technologies and frameworks shaping web development this year.',
      height: 'h-52',
      likes: 223,
      tags: ['development', 'trends'],
      liked: false,
    },
    {
      id: 8,
      type: 'image',
      title: 'Desert Dunes',
      thumbnail: 'bg-gradient-to-br from-yellow-500 to-orange-500',
      height: 'h-64',
      likes: 345,
      tags: ['nature', 'desert'],
      liked: false,
    },
  ])

  const [liked, setLiked] = useState(new Set())
  const [searchTerm, setSearchTerm] = useState('')

  const handleLike = (id: number) => {
    setLiked((prev) => {
      const newLiked = new Set(prev)
      if (newLiked.has(id)) {
        newLiked.delete(id)
      } else {
        newLiked.add(id)
      }
      return newLiked
    })
  }

  const filteredItems = items.filter(
    (item) =>
      searchTerm === '' ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-slate-900/5 dark:to-slate-900/50 p-4 md:p-8">
      {/* Header */}
      <div className="mb-12 flex items-center justify-between">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
            Social Gallery
          </h1>
          <p className="text-muted-foreground text-lg">
            Your creative collection and inspiration board
          </p>
        </div>
        <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
          <Plus size={20} />
          <span className="hidden sm:inline">Upload</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 flex gap-4 flex-col sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
          <input
            type="text"
            placeholder="Search gallery..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-primary/5 border border-primary/20 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/40"
          />
        </div>
        <button className="px-4 py-3 rounded-lg bg-primary/10 border border-primary/20 text-foreground hover:bg-primary/20 transition-colors flex items-center gap-2 justify-center">
          <Filter size={20} />
          <span className="hidden sm:inline">Filter</span>
        </button>
      </div>

      {/* Masonry Grid */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="glass rounded-xl overflow-hidden border-l-4 border-l-primary card-hover break-inside-avoid group"
          >
            {/* Content */}
            {item.type === 'image' ? (
              <div className={`${item.thumbnail} ${item.height} relative`} />
            ) : (
              <div className={`${item.height} bg-gradient-to-br from-primary/10 to-accent/10 p-6 flex flex-col justify-between`}>
                <p className="text-foreground font-medium leading-relaxed">
                  {item.content}
                </p>
              </div>
            )}

            {/* Card Content */}
            <div className="p-4">
              <h3 className="font-bold text-foreground text-lg mb-3">
                {item.title}
              </h3>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium border border-accent/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <button
                  onClick={() => handleLike(item.id)}
                  className="flex items-center gap-2 text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Heart
                    size={18}
                    className={liked.has(item.id) ? 'fill-destructive text-destructive' : ''}
                  />
                  <span className="text-sm font-medium">
                    {item.likes + (liked.has(item.id) ? 1 : 0)}
                  </span>
                </button>
                <button className="p-2 rounded-lg hover:bg-primary/10 transition-colors">
                  <Share2 size={18} className="text-muted-foreground hover:text-foreground" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            No items found. Start uploading!
          </p>
        </div>
      )}

      {/* Collections Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-foreground mb-6">Collections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'Inspiration', count: 24 },
            { name: 'Portfolio', count: 18 },
            { name: 'Designs', count: 42 },
          ].map((collection) => (
            <div
              key={collection.name}
              className="glass rounded-xl p-6 border-t-4 border-t-accent card-hover cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-foreground text-lg">
                    {collection.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {collection.count} items
                  </p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-accent/20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
