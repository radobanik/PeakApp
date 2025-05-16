/*
  Warnings:

  - You are about to drop the column `deleted` on the `Like` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,sessionId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Like" DROP COLUMN "deleted";

-- CreateIndex
CREATE UNIQUE INDEX "Like_userId_sessionId_key" ON "Like"("userId", "sessionId");
