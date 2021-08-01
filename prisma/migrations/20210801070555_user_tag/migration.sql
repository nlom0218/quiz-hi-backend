-- CreateTable
CREATE TABLE "_TagToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TagToUser_AB_unique" ON "_TagToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_TagToUser_B_index" ON "_TagToUser"("B");

-- AddForeignKey
ALTER TABLE "_TagToUser" ADD FOREIGN KEY ("A") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
