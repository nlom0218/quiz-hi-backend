/*
  Warnings:

  - Made the column `order` on table `Homework` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Homework" ALTER COLUMN "order" SET NOT NULL,
ALTER COLUMN "order" SET DEFAULT 1;
