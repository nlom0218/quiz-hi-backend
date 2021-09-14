/*
  Warnings:

  - Added the required column `order` to the `Homework` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Homework" ADD COLUMN     "order" INTEGER NOT NULL;
