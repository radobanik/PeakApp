import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { formatDistanceToNowStrict } from 'date-fns'
import chroma from 'chroma-js'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getTextColorForBackground = (bgColor: string): string => {
  const luminance = chroma(bgColor).luminance()
  return luminance > 0.5 ? '#000000' : '#FFFFFF'
}

export function formatTimeAgoShort(date: Date | string): string {
  const now = new Date()
  if (typeof date === 'string') {
    date = new Date(date)
  }

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

export function formatDistanceToNowShort(date: Date) {
  const distance = formatDistanceToNowStrict(date, { addSuffix: false })

  return distance
    .replace('seconds', 's')
    .replace('second', 's')
    .replace('minutes', 'm')
    .replace('minute', 'm')
    .replace('hours', 'h')
    .replace('hour', 'h')
    .replace('days', 'd')
    .replace('day', 'd')
    .replace('months', 'mo')
    .replace('month', 'mo')
    .replace('years', 'y')
    .replace('year', 'y')
}

export function capitalize(value: string | undefined): string {
  if (!value) return ''

  const lowercase = value.toLowerCase()
  return lowercase.charAt(0).toUpperCase() + lowercase.slice(1)
}
