'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
  Home,
  Github,
  BookOpen,
  CheckSquare,
  ImageIcon,
  Link2,
  GraduationCap,
  User,
  Menu,
  Search,
  Settings,
  Moon,
  Sun,
  X
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { useGallery } from '@/context/gallery-context'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Projects', href: '/projects', icon: Github },
  { name: 'Diary', href: '/diary', icon: BookOpen },
  { name: 'Tasks', href: '/reminders', icon: CheckSquare },
  { name: 'Gallery', href: '/gallery', icon: ImageIcon },
  { name: 'Vault', href: '/vault', icon: Link2 },
  { name: 'Study', href: '/study', icon: GraduationCap },
  { name: 'Profile', href: '/profile', icon: User },
]

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const { theme, setTheme } = useTheme()
  const inputRef = useRef<HTMLInputElement>(null)

  const { collections } = useGallery()

  const isActive = (href: string) => {
    if (href === '/' && pathname === '/') return true
    if (href !== '/' && pathname.startsWith(href)) return true
    return false
  }

  // Handle Search Expansion Focus
  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [searchOpen])

  // Sync search value with URL param on mount/update
  useEffect(() => {
    const currentSearch = searchParams.get('search') || ''
    setSearchValue(currentSearch)
  }, [searchParams])

  const handleSearch = (value: string) => {
    setSearchValue(value)
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set('search', value)
    } else {
      params.delete('search')
    }
    router.push(`${pathname}?${params.toString()}`)
  }

  const handleCollectionClick = (collection: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (collection === 'All') {
      params.delete('collection')
    } else {
      params.set('collection', collection)
    }
    router.push(`${pathname}?${params.toString()}`)
  }

  const currentCollection = searchParams.get('collection') || 'All'

  const SidebarContent = () => (
    <div className="flex flex-col h-full py-6">
      {/* Logo */}
      <div className="px-6 mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Nexfolio
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Your digital portfolio
        </p>
      </div>

      {/* Search (Desktop Only) */}
      <div className="px-6 mb-8 relative hidden lg:block">
        <Search className="absolute left-9 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
        <Input
          type="text"
          placeholder="Search..."
          className="pl-10 bg-primary/10 border-primary/20"
        />
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-4">
        <nav className="flex flex-col gap-2">
          {navigation.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)

            return (
              <Button
                key={item.name}
                variant={active ? "secondary" : "ghost"}
                asChild
                className={cn(
                  "justify-start gap-4",
                  active && "bg-primary/20 text-primary border border-primary/40 hover:bg-primary/30"
                )}
                onClick={() => setOpen(false)}
              >
                <Link href={item.href}>
                  <Icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </Button>
            )
          })}
        </nav>
      </ScrollArea>

      {/* Settings */}
      <div className="px-4 mt-auto pt-4 border-t flex items-center justify-between gap-2">
        <Button variant="ghost" className="flex-1 justify-start gap-4" asChild>
          <Link href="/settings">
            <Settings size={20} />
            <span className="font-medium">Settings</span>
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="text-muted-foreground hover:text-foreground"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </div>
  )

  const isGallery = pathname === '/gallery'

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        {/* Mobile Header / Navbar */}
        <div className="lg:hidden fixed top-0 left-0 right-0 z-50 h-16 bg-background/80 backdrop-blur-md border-b border-white/10 flex items-center px-4 gap-4">
          {/* Left: Hamburger */}
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="shrink-0">
              <Menu size={24} />
            </Button>
          </SheetTrigger>

          {/* Middle: Content (Gallery Collections or Page Title) */}
          <div className="flex-1 overflow-hidden flex items-center justify-center relative">
            {isGallery ? (
              <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex w-max space-x-2 p-1">
                  {['All', ...collections.map(c => c.name)].map((collection) => (
                    <button
                      key={collection}
                      onClick={() => handleCollectionClick(collection)}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                        currentCollection === collection
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "hover:bg-accent/10 text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {collection}
                    </button>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" className="invisible" />
              </ScrollArea>
            ) : (
              <h1 className="text-lg font-bold truncate text-foreground">
                {navigation.find(n => n.href === pathname)?.name || 'Nexfolio'}
              </h1>
            )}
          </div>

          {/* Right: Search */}
          <div className={cn("flex items-center justify-end shrink-0 transition-all duration-300", searchOpen ? "absolute inset-0 bg-background z-50 px-4" : "relative")}>
            {searchOpen ? (
              <div className="flex items-center w-full gap-2 animate-in fade-in slide-in-from-right-10 duration-200">
                <Search size={20} className="text-muted-foreground shrink-0" />
                <Input
                  ref={inputRef}
                  value={searchValue}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search gallery..."
                  className="flex-1 border-none bg-transparent focus-visible:ring-0 px-0 h-14"
                />
                <Button variant="ghost" size="icon" onClick={() => { setSearchOpen(false); handleSearch(''); }} className="shrink-0">
                  <X size={20} />
                </Button>
              </div>
            ) : (
              <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)}>
                <Search size={24} />
              </Button>
            )}
          </div>
        </div>

        <SheetContent side="left" className="p-0 border-r w-72 backdrop-blur-xl bg-background/95 text-foreground border-border/10">
          <SheetHeader className="sr-only">
            <SheetTitle>Nexfolio Navigation</SheetTitle>
            <SheetDescription>Mobile navigation menu</SheetDescription>
          </SheetHeader>
          <SidebarContent />
        </SheetContent>
      </Sheet>

      <div className="hidden lg:flex flex-col w-72 glass-subtle border-r h-screen sticky top-0">
        <SidebarContent />
      </div>
    </>
  )
}
