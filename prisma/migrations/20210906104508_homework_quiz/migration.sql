/*
  Warnings:

  - Made the column `quizId` on table `Homework` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Homework" DROP CONSTRAINT "Homework_quizId_fkey";

-- AlterTable
ALTER TABLE "Homework" ALTER COLUMN "quizId" SET NOT NULL;
