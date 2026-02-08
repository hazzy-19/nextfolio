'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Plus, Heart, Share2, Trash2 } from 'lucide-react'

import { Suspense } from 'react'

import { useGallery } from '@/context/gallery-context'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'

function GalleryContent() {
  const { items, collections, addItem, addCollection, toggleLike, deleteItem } = useGallery()
  const searchParams = useSearchParams()
  const searchTerm = searchParams.get('search') || ''
  const selectedCollection = searchParams.get('collection') || 'All'

  // Upload State
  const [dialogOpen, setDialogOpen] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [newItem, setNewItem] = useState({
    title: '',
    type: 'image' as const,
    content: '',
    thumbnail: '',
    tags: '',
    height: 'h-64'
  })
  const [selectedUploadCollection, setSelectedUploadCollection] = useState('')
  const [newCollectionName, setNewCollectionName] = useState('')

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      if (!res.ok) throw new Error('Upload failed')

      const data = await res.json()
      setNewItem(prev => ({ ...prev, thumbnail: data.url, type: 'image' }))
      // Correctly imported toast from simple toast/sonner usage if available, 
      // or just rely on UI feedback. 
      // Since toast isn't imported in this file, we'll verify imports later or skip toast for now.
    } catch (error) {
      console.error(error)
      alert("Failed to upload image")
    } finally {
      setUploading(false)
    }
  }

  const handleAddItem = async () => {
    if (!newItem.title) return

    let finalCollection = selectedUploadCollection
    if (selectedUploadCollection === 'new') {
      if (!newCollectionName) return
      addCollection(newCollectionName)
      finalCollection = newCollectionName.toLowerCase().replace(/\s+/g, '-')
    }

    const tagsArray = newItem.tags.split(',').map(t => t.trim()).filter(Boolean)
    if (finalCollection) tagsArray.push(finalCollection)
    if (!tagsArray.includes(newItem.type)) tagsArray.push(newItem.type)

    addItem({
      type: newItem.type,
      title: newItem.title,
      height: newItem.height,
      thumbnail: newItem.thumbnail,
      content: newItem.content,
      tags: tagsArray,
    })

    setDialogOpen(false)
    setNewItem({ title: '', type: 'image', content: '', thumbnail: '', tags: '', height: 'h-64' })
    setNewCollectionName('')
    setSelectedUploadCollection('')
  }


  // Filter items by search AND collection
  const filteredItems = items.filter(
    (item) =>
      (searchTerm === '' ||
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.content && item.content.toLowerCase().includes(searchTerm.toLowerCase())) ||
        item.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )) &&
      (selectedCollection === 'All' || item.tags.some(t => t.toLowerCase() === selectedCollection.toLowerCase()) || selectedCollection === 'Inspiration')
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-slate-900/5 dark:to-slate-900/50 p-4 pt-20 md:p-8 relative">
      {/* Header removed - handled by Global Sidebar/Header */}

      {/* Masonry Grid */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 mb-24">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="glass rounded-xl overflow-hidden card-hover break-inside-avoid group border-0 shadow-sm hover:shadow-xl transition-all duration-300"
          >
            {/* Content */}
            {item.type === 'image' ? (
              item.thumbnail?.startsWith('/') || item.thumbnail?.startsWith('http') ? (
                <div
                  className={`${item.height} relative w-full bg-cover bg-center`}
                  style={{ backgroundImage: `url(${item.thumbnail})` }}
                />
              ) : (
                <div className={`${item.thumbnail} ${item.height} relative w-full`} />
              )
            ) : (

              <div className={`${item.height} bg-card border border-border p-6 flex flex-col justify-between`}>
                <p className="text-card-foreground font-medium leading-relaxed font-handwriting text-lg">
                  {item.content}
                </p>
              </div>
            )}

            {/* Card Content */}
            <div className="p-4">
              <h3 className="font-bold text-foreground text-sm md:text-base mb-2 truncate">
                {item.title}
              </h3>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md bg-accent/5 text-accent text-[10px] uppercase font-bold tracking-wider text-black dark:text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-border/50">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleLike(item.id)}
                    className="flex items-center gap-1.5 text-muted-foreground hover:text-destructive transition-colors group/like"
                  >
                    <Heart
                      size={16}
                      className={`transition-transform group-hover/like:scale-110 ${item.liked ? 'fill-destructive text-destructive' : ''}`}
                    />
                    <span className="text-xs font-medium">
                      {item.likes}
                    </span>
                  </button>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="p-1.5 rounded-md hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive"
                    title="Delete Item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <button
                  onClick={() => {
                    const url = window.location.origin + item.thumbnail
                    navigator.clipboard.writeText(url)
                    if (navigator.share) {
                      navigator.share({
                        title: item.title,
                        text: item.content || item.title,
                        url: url
                      }).catch(() => { })
                    } else {
                      alert("Link copied to clipboard!")
                    }
                  }}
                  className="p-1.5 rounded-md hover:bg-foreground/5 transition-colors text-muted-foreground hover:text-foreground"
                >
                  <Share2 size={16} />
                </button>
              </div>
            </div>
            {/* Description for Images - Added per user request */}
            {item.type === 'image' && item.content && (
              <div className="px-4 pb-4 pt-0">
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {item.content}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {
        filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No items found.
            </p>
          </div>
        )
      }

      {/* Collections Section */}
      <div className="mt-8 pb-32">
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
          Collections
          <span className="text-sm font-normal text-muted-foreground ml-2 px-2 py-0.5 rounded-full bg-accent/10 text-accent">
            {collections.length}
          </span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {/* Add New Collection Placeholder - NOW FIRST */}
          <div
            onClick={() => { setDialogOpen(true); setSelectedUploadCollection('new'); }}
            className="aspect-square rounded-xl border-2 border-dashed border-muted-foreground/20 flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group"
          >
            <Plus size={32} className="group-hover:scale-110 transition-transform" />
            <span className="font-medium text-sm">New Collection</span>
          </div>

          {collections.map((collection) => {
            // Dynamic Count
            const count = items.filter(i => i.tags.some(t => t.toLowerCase() === collection.slug)).length

            return (
              <Link
                key={collection.name}
                href={`/gallery/${collection.slug}`}
                className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Background Cover - Simulating Media */}
                <div className={`absolute inset-0 bg-gradient-to-br ${collection.from} ${collection.to} opacity-90 group-hover:scale-105 transition-transform duration-500`} />

                {/* Add some visual noise/pattern to make it look more like media */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

                {/* Glassy Overlay for Text */}
                <div className="absolute bottom-0 inset-x-0 p-4 bg-background/20 backdrop-blur-md border-t border-white/10 flex flex-col gap-0.5 transition-colors group-hover:bg-background/30">
                  <h3 className="font-bold text-gray-900 dark:text-white text-base md:text-lg leading-none shadow-sm">
                    {collection.name}
                  </h3>
                  <p className="text-xs text-gray-900 dark:text-white/80 font-medium">
                    {count} media items
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Upload Floating Action Button & Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <button className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 p-4 rounded-full bg-primary text-primary-foreground shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group">
            <Plus size={28} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Media</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={newItem.title}
                onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="file" className="text-right">
                Image
              </Label>
              <div className="col-span-3">
                <Input
                  id="file"
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={uploading}
                />
                {uploading && <p className="text-xs text-muted-foreground mt-1">Uploading...</p>}
                {newItem.thumbnail && <p className="text-xs text-green-500 mt-1">Image uploaded!</p>}
              </div>
            </div>
            {/* New: Content/Description Input for Images */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="content" className="text-right">
                Desc
              </Label>
              <Input
                id="content"
                value={newItem.content || ''}
                onChange={(e) => setNewItem({ ...newItem, content: e.target.value })}
                placeholder="Optional description..."
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tags" className="text-right">
                Tags
              </Label>
              <Input
                id="tags"
                value={newItem.tags}
                onChange={(e) => setNewItem({ ...newItem, tags: e.target.value })}
                placeholder="comma, separated"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddItem} disabled={uploading}>
              {uploading ? 'Uploading...' : 'Add Item'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div >
  )
}

export default function GalleryPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Loading Gallery...</div>}>
      <GalleryContent />
    </Suspense>
  )
}
