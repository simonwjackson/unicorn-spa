/*
  Warnings:

  - You are about to drop the `games` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "games";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Platform" (
    "name" TEXT NOT NULL,
    "id" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "Game" (
    "name" TEXT NOT NULL,
    "released" TEXT NOT NULL,
    "platformId" TEXT NOT NULL,
    "id" TEXT NOT NULL PRIMARY KEY,
    FOREIGN KEY ("platformId") REFERENCES "Platform" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Game.platformId_unique" ON "Game"("platformId");
