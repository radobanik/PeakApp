/*
  Warnings:

  - You are about to drop the column `starRating` on the `Route` table. All the data in the column will be lost.
  - Added the required column `gradeRating` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "gradeRating" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Route" DROP COLUMN "starRating",
ADD COLUMN     "averageDifficulty" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "averageStar" DOUBLE PRECISION NOT NULL DEFAULT 0;
