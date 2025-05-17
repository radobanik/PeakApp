/*
  Warnings:

  - You are about to drop the column `disableComments` on the `UserNotificationSettings` table. All the data in the column will be lost.
  - You are about to drop the column `disableLikes` on the `UserNotificationSettings` table. All the data in the column will be lost.
  - You are about to drop the column `disabled` on the `UserNotificationSettings` table. All the data in the column will be lost.
  - You are about to drop the column `emailNotifications` on the `UserNotificationSettings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserNotificationSettings" DROP COLUMN "disableComments",
DROP COLUMN "disableLikes",
DROP COLUMN "disabled",
DROP COLUMN "emailNotifications",
ADD COLUMN     "enableApp" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "enableComments" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "enableEmail" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "enableLikes" BOOLEAN NOT NULL DEFAULT false;
