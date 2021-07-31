/*
  Warnings:

  - Made the column `likes` on table `Quiz` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Quiz" ALTER COLUMN "likes" SET NOT NULL,
ALTER COLUMN "likes" SET DEFAULT 0;
