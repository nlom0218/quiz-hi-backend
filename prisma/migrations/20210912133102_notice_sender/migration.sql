/*
  Warnings:

  - Added the required column `sender` to the `Notice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Notice" ADD COLUMN     "sender" TEXT NOT NULL;
