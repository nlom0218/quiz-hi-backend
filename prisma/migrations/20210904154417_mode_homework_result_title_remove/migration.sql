/*
  Warnings:

  - You are about to drop the column `title` on the `HomeworkResult` table. All the data in the column will be lost.
  - Added the required column `score` to the `HomeworkResult` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HomeworkResult" DROP COLUMN "title",
ADD COLUMN     "score" INTEGER NOT NULL;
