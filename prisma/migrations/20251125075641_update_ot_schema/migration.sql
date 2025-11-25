/*
  Warnings:

  - Added the required column `OT_Time` to the `OT` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OT" ALTER COLUMN "Emp_ID" DROP NOT NULL,
ALTER COLUMN "Emp_ID" SET DATA TYPE TEXT,
DROP COLUMN "OT_Time",
ADD COLUMN     "OT_Time" INTEGER NOT NULL;
