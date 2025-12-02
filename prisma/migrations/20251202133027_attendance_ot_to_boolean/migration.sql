/*
  Warnings:

  - Changed the type of `is_ot` on the `Attendence` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Attendence" DROP COLUMN "is_ot",
ADD COLUMN     "is_ot" BOOLEAN NOT NULL;
