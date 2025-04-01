/*
  Warnings:

  - Changed the type of `climbingStructureType` on the `Route` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ClimbingStructureType" AS ENUM ('TRAVERSE', 'OVERHANG', 'SLAB', 'WALL');

-- AlterTable
ALTER TABLE "Route" DROP COLUMN "climbingStructureType",
ADD COLUMN     "climbingStructureType" "ClimbingStructureType" NOT NULL;
