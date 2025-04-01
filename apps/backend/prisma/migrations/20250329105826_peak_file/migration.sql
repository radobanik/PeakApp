-- CreateTable
CREATE TABLE "PeakFile" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "contentType" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,

    CONSTRAINT "PeakFile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PeakFile_createdById_key" ON "PeakFile"("createdById");

-- AddForeignKey
ALTER TABLE "PeakFile" ADD CONSTRAINT "PeakFile_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
