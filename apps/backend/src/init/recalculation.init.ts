import prisma from '../core/prisma/client'
import { GradeList, gradeListSelector } from '../model/grade'

const routeClient = prisma.route
const reviewClient = prisma.review
const gradeClient = prisma.grade

async function recalculate() {
  console.log('Recalculating averages for Routes')
  const routes = await routeClient.findMany({
    where: { deleted: false },
    select: { id: true },
  })

  const grades = await gradeClient.findMany({
    select: gradeListSelector,
  })

  for (const route of routes) {
    await recalculateSingle(route.id, grades)
  }
}

async function recalculateSingle(routeId: string, grades: GradeList[]) {
  const reviews = await reviewClient.findMany({
    where: { routeId: routeId },
    select: { stars: true, gradeRating: true },
  })
  if (!reviews) {
    return
  }

  const newTotals = reviews.reduce(
    (totals, review) => {
      totals.stars += review.stars
      totals.gradeRating += review.gradeRating?.rating ?? 0
      return totals
    },
    { stars: 0, gradeRating: 0 }
  )

  const averageStars = reviews.length === 0 ? 0 : newTotals.stars / reviews.length
  const averageDifficulty = reviews.length === 0 ? 0 : newTotals.gradeRating / reviews.length

  const grade = grades
    .filter((grade) => grade.rating <= averageDifficulty)
    .sort((a, b) => b.rating - a.rating)[0]

  if (!grade) return
  await routeClient.update({
    where: { id: routeId },
    data: {
      averageStar: averageStars,
      userGradeRatingId: grade.id,
    },
  })
}

export default recalculate
