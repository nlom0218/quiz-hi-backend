/*
  Warnings:

  - Added the required column `state` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "state" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "state" TEXT NOT NULL;
