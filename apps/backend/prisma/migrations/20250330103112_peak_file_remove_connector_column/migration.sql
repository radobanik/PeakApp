/*
  Warnings:

  - You are about to drop the column `routeAdditionalImagesId` on the `PeakFile` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PeakFile" DROP CONSTRAINT "PeakFile_routeAdditionalImagesId_fkey";

-- AlterTable
ALTER TABLE "PeakFile" DROP COLUMN "routeAdditionalImagesId";

-- CreateTable
CREATE TABLE "RoutePeakFile" (
    "routeId" TEXT NOT NULL,
    "peakFileId" TEXT NOT NULL,

    CONSTRAINT "RoutePeakFile_pkey" PRIMARY KEY ("routeId","peakFileId")
);

-- AddForeignKey
ALTER TABLE "RoutePeakFile" ADD CONSTRAINT "RoutePeakFile_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoutePeakFile" ADD CONSTRAINT "RoutePeakFile_peakFileId_fkey" FOREIGN KEY ("peakFileId") REFERENCES "PeakFile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
