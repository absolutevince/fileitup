/*
  Warnings:

  - Added the required column `name` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Folder_profileId_key";

-- AlterTable
ALTER TABLE "File" ADD COLUMN     "name" TEXT NOT NULL;
