/*
  Warnings:

  - A unique constraint covering the columns `[imageId]` on the table `ClimbingObject` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ClimbingObject" ADD COLUMN     "imageId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "ClimbingObject_imageId_key" ON "ClimbingObject"("imageId");

-- AddForeignKey
ALTER TABLE "ClimbingObject" ADD CONSTRAINT "ClimbingObject_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "PeakFile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
