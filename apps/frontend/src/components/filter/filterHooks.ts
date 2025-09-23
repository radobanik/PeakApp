import { GradeDetail } from '@/types/gradeTypes'
import { useEffect, useState } from 'react'
import * as gradeService from '@/services/gradeService'

type AnyHTMLElement = HTMLElement | SVGElement
export function useOnClickOutside(
  ref: React.RefObject<AnyHTMLElement | null>,
  handler: () => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return
      handler()
    }
    document.addEventListener('mousedown', listener)
    return () => document.removeEventListener('mousedown', listener)
  }, [ref, handler])
}

export function useGrades(): GradeDetail[] {
  const [grades, setGrades] = useState<GradeDetail[]>([])
  useEffect(() => {
    gradeService.getAllGrades().then(setGrades)
  }, [])
  return grades
}
