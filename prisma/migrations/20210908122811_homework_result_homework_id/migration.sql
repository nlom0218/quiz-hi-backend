/*
  Warnings:

  - Made the column `homeworkId` on table `HomeworkResult` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "HomeworkResult" ALTER COLUMN "homeworkId" SET NOT NULL;
