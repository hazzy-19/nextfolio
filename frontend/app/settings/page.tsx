'use client'

import { useState } from 'react'
import { Save, Moon, Sun, Bell, Shield, Database, Trash2 } from 'lucide-react'

export default function SettingsPage() {
  const [theme, setTheme] = useState('auto')
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    reminders: true,
    social: false,
  })

  const [privacy, setPrivacy] = useState({
    profilePublic: true,
    showActivity: true,
    allowMessages: true,
  })

  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-slate-900/5 dark:to-slate-900/50 p-4 md:p-8">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
          Settings
        </h1>
        <p className="text-muted-foreground text-lg">
          Manage your preferences and account
        </p>
      </div>

      {/* Save Notification */}
      {saved && (
        <div className="mb-8 p-4 rounded-lg bg-green-500/20 border border-green-500/40 text-green-700 dark:text-green-400">
          Settings saved successfully!
        </div>
      )}

      {/* Settings Sections */}
      <div className="space-y-8">
        {/* Theme Settings */}
        <div className="glass rounded-xl p-8 border-t-4 border-t-primary">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Sun size={28} />
            Theme & Appearance
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-4">
                Theme Preference
              </label>
              <div className="flex gap-4">
                {[
                  { id: 'light', label: 'Light', icon: Sun },
                  { id: 'dark', label: 'Dark', icon: Moon },
                  { id: 'auto', label: 'Auto', icon: '🔄' },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setTheme(option.id)}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                      theme === option.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-primary/10 text-foreground hover:bg-primary/20'
                    }`}
                  >
                    {typeof option.icon === 'string' ? (
                      <span className="text-lg">{option.icon}</span>
                    ) : (
                      <option.icon size={20} />
                    )}
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="glass rounded-xl p-8 border-t-4 border-t-accent">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Bell size={28} />
            Notifications
          </h2>

          <div className="space-y-4">
            {Object.entries(notifications).map(([key, value]) => (
              <label
                key={key}
                className="flex items-center gap-4 p-4 rounded-lg hover:bg-primary/5 cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) =>
                    setNotifications({
                      ...notifications,
                      [key]: e.target.checked,
                    })
                  }
                  className="w-5 h-5 rounded border-primary accent-primary cursor-pointer"
                />
                <div>
                  <p className="font-medium text-foreground capitalize">
                    {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {key === 'email' && 'Receive email notifications'}
                    {key === 'push' && 'Receive push notifications'}
                    {key === 'reminders' && 'Get task and event reminders'}
                    {key === 'social' && 'Updates from social features'}
                  </p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="glass rounded-xl p-8 border-t-4 border-t-accent">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Shield size={28} />
            Privacy & Security
          </h2>

          <div className="space-y-4">
            {Object.entries(privacy).map(([key, value]) => (
              <label
                key={key}
                className="flex items-center gap-4 p-4 rounded-lg hover:bg-primary/5 cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) =>
                    setPrivacy({
                      ...privacy,
                      [key]: e.target.checked,
                    })
                  }
                  className="w-5 h-5 rounded border-primary accent-primary cursor-pointer"
                />
                <div>
                  <p className="font-medium text-foreground capitalize">
                    {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {key === 'profilePublic' &&
                      'Make your profile visible to others'}
                    {key === 'showActivity' &&
                      'Show your activity on the dashboard'}
                    {key === 'allowMessages' &&
                      'Allow others to send you messages'}
                  </p>
                </div>
              </label>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <button className="px-6 py-3 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 font-medium transition-colors flex items-center gap-2">
              <Shield size={20} />
              Change Password
            </button>
          </div>
        </div>

        {/* Data Settings */}
        <div className="glass rounded-xl p-8 border-t-4 border-t-primary">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Database size={28} />
            Data Management
          </h2>

          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <h3 className="font-semibold text-foreground mb-2">
                Export Your Data
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Download all your data in JSON format
              </p>
              <button className="px-6 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 font-medium transition-colors">
                Export Data
              </button>
            </div>

            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <h3 className="font-semibold text-foreground mb-2">
                Import Data
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Import previously exported data
              </p>
              <button className="px-6 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 font-medium transition-colors">
                Choose File
              </button>
            </div>

            <div className="p-4 rounded-lg bg-destructive/5 border border-destructive/20">
              <h3 className="font-semibold text-destructive mb-2 flex items-center gap-2">
                <Trash2 size={20} />
                Delete Account
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Permanently delete your account and all associated data
              </p>
              <button className="px-6 py-2 rounded-lg bg-destructive/20 text-destructive hover:bg-destructive/30 font-medium transition-colors">
                Delete Account
              </button>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="glass rounded-xl p-8 border-t-4 border-t-accent">
          <h2 className="text-2xl font-bold text-foreground mb-6">About</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-primary/5">
              <span className="text-foreground">Version</span>
              <span className="font-mono text-primary">1.0.0</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-primary/5">
              <span className="text-foreground">Last Updated</span>
              <span className="font-mono text-primary">
                {new Date().toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-primary/5">
              <span className="text-foreground">Build</span>
              <span className="font-mono text-primary">nexfolio-2024</span>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="fixed bottom-8 right-8">
        <button
          onClick={handleSave}
          className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
        >
          <Save size={20} />
          Save Changes
        </button>
      </div>
    </div>
  )
}
