/*
  Warnings:

  - Made the column `finish` on table `Homework` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Homework" ALTER COLUMN "finish" SET NOT NULL;
