/*
  Warnings:

  - You are about to drop the `_QuestionToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_QuizToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_QuestionToUser" DROP CONSTRAINT "_QuestionToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_QuestionToUser" DROP CONSTRAINT "_QuestionToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_QuizToUser" DROP CONSTRAINT "_QuizToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_QuizToUser" DROP CONSTRAINT "_QuizToUser_B_fkey";

-- DropTable
DROP TABLE "_QuestionToUser";

-- DropTable
DROP TABLE "_QuizToUser";

-- AddForeignKey
ALTER TABLE "Question" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quiz" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
