'use client'

import { useState } from 'react'
import { Edit2, Save, X, Github, Linkedin, Twitter, Globe, Mail, MapPin, Briefcase, Heart } from 'lucide-react'

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: 'Alex Johnson',
    title: 'Full Stack Developer',
    bio: 'Passionate about building beautiful and functional digital experiences. Coffee enthusiast.',
    location: 'San Francisco, CA',
    email: 'alex@example.com',
    website: 'alexjohnson.dev',
    image: '👨‍💻',
  })

  const [skills, setSkills] = useState([
    { name: 'React', level: 95, category: 'Frontend' },
    { name: 'TypeScript', level: 90, category: 'Language' },
    { name: 'Node.js', level: 85, category: 'Backend' },
    { name: 'Tailwind CSS', level: 92, category: 'Frontend' },
    { name: 'PostgreSQL', level: 80, category: 'Database' },
    { name: 'NextJS', level: 88, category: 'Framework' },
  ])

  const socialLinks = [
    { icon: Github, label: 'GitHub', url: '#' },
    { icon: Linkedin, label: 'LinkedIn', url: '#' },
    { icon: Twitter, label: 'Twitter', url: '#' },
    { icon: Globe, label: 'Portfolio', url: '#' },
  ]

  const stats = [
    { label: 'Projects', value: '24' },
    { label: 'Years Experience', value: '5' },
    { label: 'Followers', value: '1.2K' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-slate-900/5 dark:to-slate-900/50 p-4 md:p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground">
          Profile
        </h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          {isEditing ? (
            <>
              <X size={20} />
              <span className="hidden sm:inline">Cancel</span>
            </>
          ) : (
            <>
              <Edit2 size={20} />
              <span className="hidden sm:inline">Edit</span>
            </>
          )}
        </button>
      </div>

      {/* Main Profile Card */}
      <div className="glass rounded-xl p-8 border-t-4 border-t-primary mb-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Avatar */}
          <div className="flex flex-col items-center md:items-start">
            <div className="text-8xl mb-4">{profile.image}</div>
            <div className="space-y-4 w-full md:w-auto">
              <label className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 cursor-pointer font-medium transition-colors">
                <span>Change Avatar</span>
                <input type="file" className="hidden" />
              </label>
              {isEditing && (
                <button className="w-full px-4 py-2 rounded-lg bg-accent/20 text-accent hover:bg-accent/30 font-medium transition-colors">
                  <Save size={18} className="inline mr-2" />
                  Save Changes
                </button>
              )}
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-primary/5 border border-primary/20 text-foreground focus:outline-none focus:border-primary/40"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={profile.title}
                    onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-primary/5 border border-primary/20 text-foreground focus:outline-none focus:border-primary/40"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Bio
                  </label>
                  <textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-primary/5 border border-primary/20 text-foreground focus:outline-none focus:border-primary/40 resize-none h-24"
                  />
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-3xl font-bold text-foreground">
                  {profile.name}
                </h2>
                <p className="text-lg text-accent font-medium mt-2">
                  {profile.title}
                </p>
                <p className="text-foreground mt-4 leading-relaxed">
                  {profile.bio}
                </p>
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-border">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-bold text-primary">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* Left Column */}
        <div className="glass rounded-xl p-6 border-l-4 border-l-accent">
          <h3 className="text-lg font-bold text-foreground mb-4">Contact Information</h3>
          <div className="space-y-4">
            {isEditing ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                    <Mail size={16} />
                    Email
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-primary/5 border border-primary/20 text-foreground focus:outline-none focus:border-primary/40"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                    <MapPin size={16} />
                    Location
                  </label>
                  <input
                    type="text"
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-primary/5 border border-primary/20 text-foreground focus:outline-none focus:border-primary/40"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                    <Globe size={16} />
                    Website
                  </label>
                  <input
                    type="url"
                    value={profile.website}
                    onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-primary/5 border border-primary/20 text-foreground focus:outline-none focus:border-primary/40"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <Mail size={20} className="text-primary" />
                  <a href={`mailto:${profile.email}`} className="text-foreground hover:text-primary transition-colors">
                    {profile.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={20} className="text-primary" />
                  <span className="text-foreground">{profile.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe size={20} className="text-primary" />
                  <a href={`https://${profile.website}`} target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
                    {profile.website}
                  </a>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Social Links */}
        <div className="glass rounded-xl p-6 border-l-4 border-l-accent">
          <h3 className="text-lg font-bold text-foreground mb-4">Social Media</h3>
          <div className="space-y-3">
            {socialLinks.map((link) => {
              const Icon = link.icon
              return (
                <a
                  key={link.label}
                  href={link.url}
                  className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
                >
                  <Icon size={20} className="text-primary" />
                  <span className="font-medium text-foreground">{link.label}</span>
                </a>
              )
            })}
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="glass rounded-xl p-8 border-t-4 border-t-primary">
        <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-2">
          <Briefcase size={28} />
          Skills & Expertise
        </h3>

        <div className="space-y-6">
          {skills.map((skill) => (
            <div key={skill.name}>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-foreground">
                    {skill.name}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {skill.category}
                  </p>
                </div>
                <span className="text-sm font-bold text-primary">
                  {skill.level}%
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-primary/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {isEditing && (
          <button className="w-full mt-8 px-6 py-3 rounded-lg bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-colors">
            Add Skill
          </button>
        )}
      </div>

      {/* Theme Customization */}
      <div className="mt-12 glass rounded-xl p-8 border-t-4 border-t-accent">
        <h3 className="text-2xl font-bold text-foreground mb-6">
          Theme Preferences
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['Light', 'Dark', 'Auto'].map((mode) => (
            <button
              key={mode}
              className="p-6 rounded-lg border-2 border-primary/20 hover:border-primary transition-colors hover:bg-primary/5"
            >
              <p className="font-semibold text-foreground">{mode}</p>
              <p className="text-sm text-muted-foreground mt-2">
                {mode === 'Light' && 'Always light theme'}
                {mode === 'Dark' && 'Always dark theme'}
                {mode === 'Auto' && 'Follow system settings'}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
