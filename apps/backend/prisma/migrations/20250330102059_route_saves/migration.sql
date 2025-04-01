-- CreateTable
CREATE TABLE "_RouteSaves" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_RouteSaves_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_RouteSaves_B_index" ON "_RouteSaves"("B");

-- AddForeignKey
ALTER TABLE "_RouteSaves" ADD CONSTRAINT "_RouteSaves_A_fkey" FOREIGN KEY ("A") REFERENCES "Route"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RouteSaves" ADD CONSTRAINT "_RouteSaves_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
