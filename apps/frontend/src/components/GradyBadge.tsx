import React from 'react'
import chroma from 'chroma-js'
import { GradeDetail } from '../types/gradeTypes'

interface GradeBadgeProps {
  grade: GradeDetail
}

function getTextColorForBackground(bgColor: string): string {
  const luminance = chroma(bgColor).luminance()
  return luminance > 0.5 ? '#000000' : '#FFFFFF'
}

export const GradeBadge: React.FC<GradeBadgeProps> = ({ grade }) => {
  const textColor = getTextColorForBackground(grade.color)

  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
      style={{
        backgroundColor: grade.color,
        color: textColor,
      }}
    >
      {grade.name}
    </span>
  )
}
