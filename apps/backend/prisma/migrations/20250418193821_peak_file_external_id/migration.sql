/*
  Warnings:

  - You are about to drop the column `path` on the `PeakFile` table. All the data in the column will be lost.
  - Added the required column `externalId` to the `PeakFile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PeakFile" DROP COLUMN "path",
ADD COLUMN     "externalId" TEXT NOT NULL;
