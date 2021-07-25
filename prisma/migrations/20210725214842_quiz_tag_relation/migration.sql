-- CreateTable
CREATE TABLE "_QuizToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_QuizToTag_AB_unique" ON "_QuizToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_QuizToTag_B_index" ON "_QuizToTag"("B");

-- AddForeignKey
ALTER TABLE "_QuizToTag" ADD FOREIGN KEY ("A") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuizToTag" ADD FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
