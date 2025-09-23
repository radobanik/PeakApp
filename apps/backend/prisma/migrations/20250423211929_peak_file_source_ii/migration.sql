/*
  Warnings:

  - Changed the type of `source` on the `PeakFile` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "PeakFile" DROP COLUMN "source",
ADD COLUMN     "source" "PeakFileSource" NOT NULL;
