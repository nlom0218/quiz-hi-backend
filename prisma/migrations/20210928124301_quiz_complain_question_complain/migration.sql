/*
  Warnings:

  - Added the required column `message` to the `QuestionComplain` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questionId` to the `QuestionComplain` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiver` to the `QuestionComplain` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sender` to the `QuestionComplain` table without a default value. This is not possible if the table is not empty.
  - Added the required column `message` to the `QuizComplain` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiver` to the `QuizComplain` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sender` to the `QuizComplain` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "QuestionComplain" ADD COLUMN     "message" TEXT NOT NULL,
ADD COLUMN     "questionId" INTEGER NOT NULL,
ADD COLUMN     "receiver" TEXT NOT NULL,
ADD COLUMN     "sender" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "QuizComplain" ADD COLUMN     "message" TEXT NOT NULL,
ADD COLUMN     "receiver" TEXT NOT NULL,
ADD COLUMN     "sender" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "QuestionComplain" ADD FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;
