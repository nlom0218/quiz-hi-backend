-- CreateTable
CREATE TABLE "_QuizFollowRelation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_QuestionFollowRelation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_QuizFollowRelation_AB_unique" ON "_QuizFollowRelation"("A", "B");

-- CreateIndex
CREATE INDEX "_QuizFollowRelation_B_index" ON "_QuizFollowRelation"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_QuestionFollowRelation_AB_unique" ON "_QuestionFollowRelation"("A", "B");

-- CreateIndex
CREATE INDEX "_QuestionFollowRelation_B_index" ON "_QuestionFollowRelation"("B");

-- AddForeignKey
ALTER TABLE "_QuizFollowRelation" ADD FOREIGN KEY ("A") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuizFollowRelation" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionFollowRelation" ADD FOREIGN KEY ("A") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionFollowRelation" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
