import { createContext, useContext, useEffect, useState } from 'react'

type ThemeProviderProps = {
  children: React.ReactNode
}

type ThemeProviderState = {
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
}

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined)

const THEME_KEY = 'peak-app-theme'

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem(THEME_KEY) as 'light' | 'dark' | null
    if (savedTheme) return savedTheme

    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches
    return systemPreference ? 'dark' : 'light'
  })

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (context === undefined) throw new Error('useTheme must be used within a ThemeProvider')
  return context
}
