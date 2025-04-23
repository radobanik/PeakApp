/*
  Warnings:

  - You are about to drop the column `externalId` on the `PeakFile` table. All the data in the column will be lost.
  - Added the required column `identifier` to the `PeakFile` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PeakFileSource" AS ENUM ('S3_BUCKET', 'GENERIC_URL');

-- AlterTable
ALTER TABLE "PeakFile" DROP COLUMN "externalId",
ADD COLUMN     "identifier" TEXT NOT NULL;
