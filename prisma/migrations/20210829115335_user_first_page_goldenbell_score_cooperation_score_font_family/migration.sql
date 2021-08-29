-- AlterTable
ALTER TABLE "User" ADD COLUMN     "cooperationScore" INTEGER NOT NULL DEFAULT 100,
ADD COLUMN     "firstPage" TEXT NOT NULL DEFAULT E'home',
ADD COLUMN     "fontFamily" TEXT NOT NULL DEFAULT E'\'Noto Sans KR\', sans-serif',
ADD COLUMN     "goldenbellScore" INTEGER NOT NULL DEFAULT 100;
