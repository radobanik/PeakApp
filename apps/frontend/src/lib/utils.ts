import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { formatDistanceToNowStrict } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getTextColorForBackground = (hexColor: string): string => {
  const color = hexColor.replace('#', '')

  const r = parseInt(color.substring(0, 2), 16)
  const g = parseInt(color.substring(2, 4), 16)
  const b = parseInt(color.substring(4, 6), 16)

  const luminance = 0.299 * r + 0.587 * g + 0.114 * b

  return luminance > 186 ? 'black' : 'white'
}

export function formatTimeAgoShort(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - date.getTime()

  if (diff < 60 * 1000) return 'just now'
  if (diff < 60 * 60 * 1000)
    return formatDistanceToNowStrict(date, { unit: 'minute' })
      .replace(' minutes', 'm')
      .replace(' minute', 'm')

  if (diff < 24 * 60 * 60 * 1000)
    return formatDistanceToNowStrict(date, { unit: 'hour' })
      .replace(' hours', 'h')
      .replace(' hour', 'h')

  if (diff < 7 * 24 * 60 * 60 * 1000)
    return formatDistanceToNowStrict(date, { unit: 'day' })
      .replace(' days', 'd')
      .replace(' day', 'd')

  // fallback
  return '-'
}

export function capitalize(value: string | undefined): string {
  if (!value) return ''

  const lowercase = value.toLowerCase()
  return lowercase.charAt(0).toUpperCase() + lowercase.slice(1)
}
