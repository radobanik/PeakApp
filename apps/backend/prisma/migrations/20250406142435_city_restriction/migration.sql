/*
  Warnings:

  - You are about to drop the column `lat` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `long` on the `City` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,countryId]` on the table `City` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "City" DROP COLUMN "lat",
DROP COLUMN "long";

-- CreateIndex
CREATE UNIQUE INDEX "City_name_countryId_key" ON "City"("name", "countryId");
