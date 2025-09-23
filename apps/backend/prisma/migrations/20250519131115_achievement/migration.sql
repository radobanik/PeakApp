/*
  Warnings:

  - You are about to drop the column `enableComments` on the `UserNotificationSettings` table. All the data in the column will be lost.
  - You are about to drop the column `enableLikes` on the `UserNotificationSettings` table. All the data in the column will be lost.
  - Added the required column `type` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('LIKE', 'COMMENT', 'FOLLOW', 'ACHIEVEMENT');

-- CreateEnum
CREATE TYPE "AchievementType" AS ENUM ('DAYS_REGISTERED', 'COMMENTS_COUNT', 'SESSIONS_COUNT', 'MAX_ACTIVITY_PER_SESSION', 'MAX_LIKE_ON_SESSION', 'ROUTE_TOPPED_COUNT', 'ROUTE_REVIEW_COUNT');

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "type" "NotificationType" NOT NULL;

-- AlterTable
ALTER TABLE "UserNotificationSettings" DROP COLUMN "enableComments",
DROP COLUMN "enableLikes",
ADD COLUMN     "allowedTypes" "NotificationType"[];

-- CreateTable
CREATE TABLE "Achievement" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "minimumValue" INTEGER NOT NULL,
    "type" "AchievementType" NOT NULL,
    "iconId" TEXT,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Achievement_iconId_key" ON "Achievement"("iconId");

-- AddForeignKey
ALTER TABLE "Achievement" ADD CONSTRAINT "Achievement_iconId_fkey" FOREIGN KEY ("iconId") REFERENCES "PeakFile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
