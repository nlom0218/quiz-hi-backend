/*
  Warnings:

  - The `complain` column on the `Question` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `complain` column on the `Quiz` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "deleteDay" TEXT,
DROP COLUMN "complain",
ADD COLUMN     "complain" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "deleteDay" TEXT,
DROP COLUMN "complain",
ADD COLUMN     "complain" BOOLEAN DEFAULT false;
