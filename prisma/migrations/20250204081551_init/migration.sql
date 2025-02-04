/*
  Warnings:

  - You are about to drop the column `folderId` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "folderId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "folderId";
