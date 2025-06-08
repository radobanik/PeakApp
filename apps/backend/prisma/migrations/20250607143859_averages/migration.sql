/*
  Warnings:

  - You are about to drop the column `starRating` on the `Route` table. All the data in the column will be lost.
  - Added the required column `gradeRatingId` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userGradeRatingId` to the `Route` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "gradeRatingId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Route" DROP COLUMN "starRating",
ADD COLUMN     "averageStar" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "userGradeRatingId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Route" ADD CONSTRAINT "Route_userGradeRatingId_fkey" FOREIGN KEY ("userGradeRatingId") REFERENCES "Grade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_gradeRatingId_fkey" FOREIGN KEY ("gradeRatingId") REFERENCES "Grade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
