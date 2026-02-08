'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'sonner'

export interface GalleryItem {
    id: number
    type: 'image' | 'text'
    title: string
    content?: string // For text items
    thumbnail?: string // For image items
    height: string
    likes: number
    tags: string[]
    liked: boolean
}

export interface Collection {
    name: string
    slug: string
    from: string
    to: string
}

interface GalleryContextType {
    items: GalleryItem[]
    collections: Collection[]
    addItem: (item: Omit<GalleryItem, 'id' | 'likes' | 'liked'>) => void
    addCollection: (name: string) => void
    toggleLike: (id: number) => void
    deleteItem: (id: number) => void
    deleteCollection: (slug: string) => void
}

const GalleryContext = createContext<GalleryContextType | undefined>(undefined)

const INITIAL_ITEMS: GalleryItem[] = [
    {
        id: 1,
        type: 'image',
        title: 'Mountain Vista',
        thumbnail: 'bg-gradient-to-br from-blue-500 to-purple-600',
        height: 'h-64',
        likes: 234,
        tags: ['nature', 'landscape', 'inspiration'],
        liked: false,
    },
    {
        id: 2,
        type: 'image',
        title: 'Urban Architecture',
        thumbnail: 'bg-gradient-to-br from-gray-600 to-gray-800',
        height: 'h-72',
        likes: 189,
        tags: ['city', 'architecture', 'portfolio'],
        liked: false,
    },
    {
        id: 3,
        type: 'image',
        title: 'Ocean Sunset',
        thumbnail: 'bg-gradient-to-br from-orange-400 to-red-600',
        height: 'h-56',
        likes: 412,
        tags: ['nature', 'sunset', 'inspiration'],
        liked: false,
    },
    {
        id: 4,
        type: 'text',
        title: 'Digital Design Tips',
        content: '10 essential principles for modern UI design that every designer should know.',
        height: 'h-48',
        likes: 156,
        tags: ['design', 'tips', 'designs'],
        liked: false,
    },
    {
        id: 5,
        type: 'image',
        title: 'Forest Path',
        thumbnail: 'bg-gradient-to-br from-green-500 to-emerald-600',
        height: 'h-80',
        likes: 378,
        tags: ['nature', 'forest', 'inspiration'],
        liked: false,
    },
    {
        id: 6,
        type: 'image',
        title: 'City Lights',
        thumbnail: 'bg-gradient-to-br from-indigo-600 to-purple-700',
        height: 'h-60',
        likes: 521,
        tags: ['city', 'night', 'portfolio'],
        liked: false,
    },
    {
        id: 7,
        type: 'text',
        title: 'Web Development Trends 2024',
        content: 'Exploring the latest technologies and frameworks shaping web development this year.',
        height: 'h-52',
        likes: 223,
        tags: ['development', 'trends', 'designs'],
        liked: false,
    },
    {
        id: 8,
        type: 'image',
        title: 'Desert Dunes',
        thumbnail: 'bg-gradient-to-br from-yellow-500 to-orange-500',
        height: 'h-64',
        likes: 345,
        tags: ['nature', 'desert', 'inspiration'],
        liked: false,
    },
]

const INITIAL_COLLECTIONS: Collection[] = [
    { name: 'Inspiration', slug: 'inspiration', from: 'from-pink-500', to: 'to-rose-500' },
    { name: 'Portfolio', slug: 'portfolio', from: 'from-amber-400', to: 'to-orange-500' },
    { name: 'Designs', slug: 'designs', from: 'from-emerald-400', to: 'to-cyan-500' },
    { name: 'Photography', slug: 'photography', from: 'from-violet-500', to: 'to-purple-500' },
]

export function GalleryProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<GalleryItem[]>([])
    const [collections, setCollections] = useState<Collection[]>([])

    // Fetch initial data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [itemsRes, colsRes] = await Promise.all([
                    fetch('/api/gallery'),
                    fetch('/api/gallery/collections')
                ])
                if (itemsRes.ok) setItems(await itemsRes.json())
                if (colsRes.ok) setCollections(await colsRes.json())
            } catch (error) {
                console.error("Failed to fetch gallery data", error)
                toast.error("Failed to load gallery")
            }
        }
        fetchData()
    }, [])

    const addItem = async (newItem: Omit<GalleryItem, 'id' | 'likes' | 'liked'>) => {
        try {
            const res = await fetch('/api/gallery', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newItem)
            })
            if (!res.ok) throw new Error('Failed to add item')

            const savedItem = await res.json()
            setItems((prev) => [savedItem, ...prev])
            toast.success('Added to Gallery')
        } catch (error) {
            toast.error('Failed to add item')
        }
    }

    const addCollection = async (name: string) => {
        // Check if exists locally first to save a call
        if (collections.some(c => c.name.toLowerCase() === name.toLowerCase())) {
            toast.error('Collection already exists')
            return
        }

        try {
            const res = await fetch('/api/gallery/collections', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    slug: name.toLowerCase().replace(/\s+/g, '-'),
                    from_color: 'from-blue-400', // Default for now
                    to_color: 'to-indigo-500'
                })
            })
            if (!res.ok) throw new Error('Failed to create collection')

            const newCollection = await res.json()
            setCollections(prev => [...prev, newCollection])
            toast.success(`Collection "${name}" created`)
        } catch (error) {
            toast.error('Failed to create collection')
        }
    }

    const toggleLike = async (id: number) => {
        // Optimistic update
        setItems(prev => prev.map(item => {
            if (item.id === id) {
                return { ...item, liked: !item.liked, likes: item.liked ? item.likes - 1 : item.likes + 1 }
            }
            return item
        }))

        try {
            await fetch(`/api/gallery/${id}/like`, { method: 'POST' })
        } catch (error) {
            // Revert on failure? For now, just silent fail or toast
            console.error("Like failed", error)
        }
    }

    const deleteItem = async (id: number) => {
        try {
            const res = await fetch(`/api/gallery/${id}`, { method: 'DELETE' })
            if (!res.ok) throw new Error('Failed to delete item')
            setItems(prev => prev.filter(item => item.id !== id))
            toast.success('Item deleted')
        } catch (error) {
            toast.error('Failed to delete item')
        }
    }

    const deleteCollection = async (slug: string) => {
        try {
            const res = await fetch(`/api/gallery/collections/${slug}`, { method: 'DELETE' })
            if (!res.ok) throw new Error('Failed to delete collection')
            setCollections(prev => prev.filter(c => c.slug !== slug))
            toast.success('Collection deleted')
        } catch (error) {
            toast.error('Failed to delete collection')
        }
    }

    return (
        <GalleryContext.Provider value={{ items, collections, addItem, addCollection, toggleLike, deleteItem, deleteCollection }}>
            {children}
        </GalleryContext.Provider>
    )
}

export function useGallery() {
    const context = useContext(GalleryContext)
    if (context === undefined) {
        throw new Error('useGallery must be used within a GalleryProvider')
    }
    return context
}
