'use client'

import { useState } from 'react'
import { useGallery } from '@/context/gallery-context'
import Link from 'next/link'
import { ArrowLeft, Plus, Heart, Share2, Trash2, Settings } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function CollectionPage() {
    const params = useParams()
    const { items, toggleLike, deleteCollection } = useGallery()

    // Handle potential array or string for collection param
    const collectionSlug = Array.isArray(params.collection) ? params.collection[0] : params.collection
    const collectionName = collectionSlug ? collectionSlug.charAt(0).toUpperCase() + collectionSlug.slice(1).replace(/-/g, ' ') : 'Collection'

    // Secure Delete State
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [confirmCode, setConfirmCode] = useState('')
    const [userInputCode, setUserInputCode] = useState('')
    const router = useRouter()

    // Filter based on collection slug

    // Filter based on collection slug
    // Check if tags include the collection slug (case insensitive)
    const filteredItems = items.filter(item =>
        item.tags.some(tag => tag.toLowerCase() === collectionSlug?.toLowerCase())
    )

    return (
        <div className="min-h-screen bg-gradient-to-br from-background to-slate-900/5 dark:to-slate-900/50 p-4 md:p-8">
            {/* Header */}
            <div className="mb-12 flex items-center justify-between pt-12 pl-14 md:pt-0 md:pl-0">
                <div className="flex items-center gap-4">
                    <Link href="/gallery" className="p-2 -ml-2 rounded-full hover:bg-foreground/5 transition-colors text-muted-foreground hover:text-foreground">
                        <ArrowLeft size={24} />
                    </Link>
                    <div>
                        <h1 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">
                            {collectionName}
                        </h1>
                        <p className="text-muted-foreground text-sm">
                            {filteredItems.length} items
                        </p>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all active:scale-95 shadow-md flex items-center gap-2">
                        <Plus size={18} />
                        <span className="hidden sm:inline">Upload</span>
                    </button>

                    <Dialog open={deleteDialogOpen} onOpenChange={(open) => {
                        setDeleteDialogOpen(open);
                        if (open) setConfirmCode(Math.floor(1000 + Math.random() * 9000).toString());
                    }}>
                        <DialogTrigger asChild>
                            <button className="p-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive hover:text-white transition-colors">
                                <Trash2 size={20} />
                            </button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Delete Collection</DialogTitle>
                                <DialogDescription>
                                    This will delete the collection <strong>{collectionName}</strong>.
                                    Items in this collection will remain in the "All" view but the grouping will be gone.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="py-4 space-y-4">
                                <div className="p-4 bg-muted/50 rounded-lg text-center">
                                    <p className="text-sm text-muted-foreground mb-1">Type this code to confirm:</p>
                                    <p className="text-4xl font-mono font-bold tracking-widest text-primary select-none pointer-events-none">
                                        {confirmCode}
                                    </p>
                                </div>
                                <Input
                                    placeholder="Enter code"
                                    value={userInputCode}
                                    onChange={(e) => setUserInputCode(e.target.value)}
                                    className="text-center text-lg tracking-widest uppercase"
                                    maxLength={4}
                                />
                            </div>
                            <DialogFooter>
                                <Button
                                    variant="destructive"
                                    disabled={userInputCode !== confirmCode}
                                    onClick={() => {
                                        deleteCollection(collectionSlug)
                                        setDeleteDialogOpen(false)
                                        router.push('/gallery')
                                    }}
                                >
                                    Delete Forever
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Masonry Grid */}
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 mb-16">
                {filteredItems.map((item) => (
                    <div
                        key={item.id}
                        className="glass rounded-xl overflow-hidden card-hover break-inside-avoid group border-0 shadow-sm hover:shadow-xl transition-all duration-300"
                    >
                        {/* Content */}
                        {item.type === 'image' ? (
                            <div className={`${item.thumbnail} ${item.height} relative w-full`} />
                        ) : (
                            <div className={`${item.height} bg-gradient-to-br from-primary/5 to-accent/5 p-6 flex flex-col justify-between`}>
                                <p className="text-foreground font-medium leading-relaxed font-handwriting text-lg">
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
                                        className="px-2 py-0.5 rounded-md bg-accent/5 text-accent text-[10px] uppercase font-bold tracking-wider"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-between pt-3 border-t border-border/50">
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
                                    onClick={() => console.log('Share clicked')}
                                    className="p-1.5 rounded-md hover:bg-foreground/5 transition-colors text-muted-foreground hover:text-foreground"
                                >
                                    <Share2 size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredItems.length === 0 && (
                <div className="text-center py-24">
                    <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Plus size={32} className="text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Empty Collection</h3>
                    <p className="text-muted-foreground mb-6 max-w-xs mx-auto">
                        This collection is empty. Start adding some inspiration!
                    </p>
                    <button className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
                        Upload Media
                    </button>

                    <div className="mt-12 pt-12 border-t border-border/20 max-w-md mx-auto">
                        <h4 className="text-destructive font-bold mb-2">Danger Zone</h4>
                        <p className="text-xs text-muted-foreground mb-4">
                            To delete this collection, type <strong>delete {collectionName}</strong> below.
                        </p>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder={`delete ${collectionName}`}
                                className="flex-1 bg-background border border-border rounded-md px-3 py-2 text-sm"
                                id="delete-confirm"
                            />
                            <button
                                onClick={() => {
                                    const input = document.getElementById('delete-confirm') as HTMLInputElement
                                    if (input.value === `delete ${collectionName}`) {
                                        deleteCollection(collectionSlug)
                                        // window.location.href = '/gallery' // quick redirect
                                    } else {
                                        alert("Incorrect confirmation text")
                                    }
                                }}
                                className="px-4 py-2 bg-destructive/10 text-destructive hover:bg-destructive hover:text-white rounded-md text-sm font-medium transition-colors"
                            >
                                Delete Collection
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
