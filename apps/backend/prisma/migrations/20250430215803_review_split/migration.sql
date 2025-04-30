-- CreateTable
CREATE TABLE "Review" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "stars" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "routeId" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("routeId","createdById")
);

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
