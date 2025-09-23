-- CreateEnum
CREATE TYPE "ApprovalState" AS ENUM ('APPROVED', 'REJECTED', 'PENDING');

-- AlterTable
ALTER TABLE "ClimbingObject" ADD COLUMN     "approvalState" "ApprovalState" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "Route" ADD COLUMN     "approvalState" "ApprovalState" NOT NULL DEFAULT 'PENDING';
