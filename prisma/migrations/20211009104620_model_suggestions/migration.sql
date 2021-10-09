-- CreateTable
CREATE TABLE "Suggestions" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "suggestion" TEXT NOT NULL,
    "sender" TEXT NOT NULL,
    "senderId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);
