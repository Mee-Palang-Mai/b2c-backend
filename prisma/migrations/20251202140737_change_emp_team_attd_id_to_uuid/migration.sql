/*
  Warnings:

  - Made the column `deleted_at` on table `Leave Request` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Leave Request" ALTER COLUMN "deleted_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "Team" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;
