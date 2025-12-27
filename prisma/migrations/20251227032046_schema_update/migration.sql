/*
  Warnings:

  - You are about to drop the column `isResearcher` on the `Astronauts` table. All the data in the column will be lost.
  - You are about to drop the column `ownerName` on the `OwnedAstronauts` table. All the data in the column will be lost.
  - You are about to drop the column `ownerName` on the `UnlockedAstronauts` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `User` table. All the data in the column will be lost.
  - Added the required column `username` to the `OwnedAstronauts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `UnlockedAstronauts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passwordHash` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OwnedAstronauts" DROP CONSTRAINT "OwnedAstronauts_ownerName_fkey";

-- DropForeignKey
ALTER TABLE "UnlockedAstronauts" DROP CONSTRAINT "UnlockedAstronauts_ownerName_fkey";

-- AlterTable
ALTER TABLE "Astronauts" DROP COLUMN "isResearcher",
ADD COLUMN     "dollarsPerSecond" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "isScientist" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "OwnedAstronauts" DROP COLUMN "ownerName",
ADD COLUMN     "isGeneratingDollars" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastCurrencyUpdate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "occupiedRoom" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "occupiedSlot" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "username" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UnlockedAstronauts" DROP COLUMN "ownerName",
ADD COLUMN     "username" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "password",
DROP COLUMN "userName",
ADD COLUMN     "isGuest" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "passwordHash" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("username");

-- AddForeignKey
ALTER TABLE "OwnedAstronauts" ADD CONSTRAINT "OwnedAstronauts_username_fkey" FOREIGN KEY ("username") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnlockedAstronauts" ADD CONSTRAINT "UnlockedAstronauts_username_fkey" FOREIGN KEY ("username") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
