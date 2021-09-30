/*
  Warnings:

  - You are about to drop the column `compalin` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `compalin` on the `Quiz` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Question" DROP COLUMN "compalin",
ADD COLUMN     "complain" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "compalin",
ADD COLUMN     "complain" BOOLEAN DEFAULT false;
