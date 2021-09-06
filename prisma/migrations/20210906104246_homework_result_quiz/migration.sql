/*
  Warnings:

  - Made the column `quizId` on table `HomeworkResult` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "HomeworkResult" DROP CONSTRAINT "HomeworkResult_quizId_fkey";

-- AlterTable
ALTER TABLE "HomeworkResult" ALTER COLUMN "quizId" SET NOT NULL;
