-- DropForeignKey
ALTER TABLE "RoutePeakFile" DROP CONSTRAINT "RoutePeakFile_peakFileId_fkey";

-- DropForeignKey
ALTER TABLE "RoutePeakFile" DROP CONSTRAINT "RoutePeakFile_routeId_fkey";

-- AddForeignKey
ALTER TABLE "RoutePeakFile" ADD CONSTRAINT "RoutePeakFile_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoutePeakFile" ADD CONSTRAINT "RoutePeakFile_peakFileId_fkey" FOREIGN KEY ("peakFileId") REFERENCES "PeakFile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
