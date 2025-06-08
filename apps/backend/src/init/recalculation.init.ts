import { PrismaClient } from '@prisma/client'

const routeClient = new PrismaClient().route
const reviewClient = new PrismaClient().review
const gradeClient = new PrismaClient().grade

async function recalculate() {
  console.log('Recalculating averages for Routes')
  const routes = await routeClient.findMany({
    where: { deleted: false },
    select: { id: true },
  })

  for (const route of routes) {
    await recalculateSingle(route.id)
  }
}

async function recalculateSingle(routeId: string) {
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
  
  const grade = (await gradeClient.findMany())
  .filter((grade) => grade.rating <= averageDifficulty)
  .sort((a, b) => b.rating - a.rating)[0]
  
  await routeClient.update({
    where: { id: routeId },
    data: {
      averageStar: averageStars,
      userGradeRatingId: grade.id,
    },
  })
}

export default recalculate
