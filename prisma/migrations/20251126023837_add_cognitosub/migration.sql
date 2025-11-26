/*
  Warnings:

  - Added the required column `Cognito_Sub` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "Cognito_Sub" TEXT NOT NULL;
