/*
  Warnings:

  - A unique constraint covering the columns `[userName]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "birthdayAt" TIMESTAMP(3),
ADD COLUMN     "city" TEXT,
ADD COLUMN     "countryCode" TEXT,
ADD COLUMN     "height" INTEGER,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "state" TEXT,
ADD COLUMN     "userName" TEXT NOT NULL,
ADD COLUMN     "weight" DOUBLE PRECISION;

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");
