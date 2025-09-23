type GradeDetail = {
  id: string
  rating: number
  name: string
  color: string
}

const selector = {
  id: true,
  rating: true,
  name: true,
  color: true,
}

export type { GradeDetail }
export { selector }
