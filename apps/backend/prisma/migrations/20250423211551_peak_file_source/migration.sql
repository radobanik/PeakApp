/*
  Warnings:

  - Added the required column `source` to the `PeakFile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PeakFile" ADD COLUMN     "source" TEXT NOT NULL;
