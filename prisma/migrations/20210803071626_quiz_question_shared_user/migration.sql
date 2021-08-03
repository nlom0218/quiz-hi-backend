-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_userId_fkey";

-- DropForeignKey
ALTER TABLE "Quiz" DROP CONSTRAINT "Quiz_userId_fkey";

-- CreateTable
CREATE TABLE "_QuestionToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_QuizToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_QuestionToUser_AB_unique" ON "_QuestionToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_QuestionToUser_B_index" ON "_QuestionToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_QuizToUser_AB_unique" ON "_QuizToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_QuizToUser_B_index" ON "_QuizToUser"("B");

-- AddForeignKey
ALTER TABLE "_QuestionToUser" ADD FOREIGN KEY ("A") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuizToUser" ADD FOREIGN KEY ("A") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuizToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
