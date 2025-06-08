import { PrismaClient } from '@prisma/client'

const routeClient = new PrismaClient().route
const reviewClient = new PrismaClient().review

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
      totals.gradeRating += review.gradeRating
      return totals
    },
    { stars: 0, gradeRating: 0 }
  )

  const averageStars = reviews.length === 0 ? 0 : newTotals.stars / reviews.length
  const averageDifficulty = reviews.length === 0 ? 0 : newTotals.gradeRating / reviews.length

  await routeClient.update({
    where: { id: routeId },
    data: {
      averageStar: averageStars,
      averageDifficulty: averageDifficulty,
    },
  })
}

export default recalculate
