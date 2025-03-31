-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MAINTANER', 'USER');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "roles" "Role"[];
