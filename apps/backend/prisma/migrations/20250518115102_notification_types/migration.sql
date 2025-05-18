/*
  Warnings:

  - You are about to drop the column `enableComments` on the `UserNotificationSettings` table. All the data in the column will be lost.
  - You are about to drop the column `enableLikes` on the `UserNotificationSettings` table. All the data in the column will be lost.
  - Added the required column `type` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('LIKE', 'COMMENT', 'FOLLOW', 'ACHIEVEMENT');

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "type" "NotificationType" NOT NULL;

-- AlterTable
ALTER TABLE "UserNotificationSettings" DROP COLUMN "enableComments",
DROP COLUMN "enableLikes",
ADD COLUMN     "allowedTypes" "NotificationType"[];
