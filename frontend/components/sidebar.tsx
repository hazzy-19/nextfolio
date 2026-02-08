'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
} from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
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
  const [open, setOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const isActive = (href: string) => {
    if (href === '/' && pathname === '/') return true
    if (href !== '/' && pathname.startsWith(href)) return true
    return false
  }

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

      {/* Search */}
      <div className="px-6 mb-8 relative">
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

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50 lg:hidden border border-white/10 bg-background/50 backdrop-blur-md shadow-sm">
            <Menu size={24} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 border-r w-72 backdrop-blur-xl bg-background/80">
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
