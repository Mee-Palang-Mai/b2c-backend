/*
  Warnings:

  - The primary key for the `Leave Balance` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Attendence" DROP CONSTRAINT "Attendence_emp_id_fkey";

-- DropForeignKey
ALTER TABLE "Deduct Request" DROP CONSTRAINT "Deduct Request_emp_id_fkey";

-- DropForeignKey
ALTER TABLE "Extra pay Request" DROP CONSTRAINT "Extra pay Request_emp_id_fkey";

-- DropForeignKey
ALTER TABLE "Leave Balance" DROP CONSTRAINT "Leave Balance_emp_id_fkey";

-- DropForeignKey
ALTER TABLE "Leave Request" DROP CONSTRAINT "Leave Request_emp_id_fkey";

-- DropForeignKey
ALTER TABLE "Loginout" DROP CONSTRAINT "Loginout_emp_id_fkey";

-- DropForeignKey
ALTER TABLE "Payroll" DROP CONSTRAINT "Payroll_emp_id_fkey";

-- AlterTable
ALTER TABLE "Attendence" ALTER COLUMN "emp_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Deduct Request" ALTER COLUMN "emp_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Extra pay Request" ALTER COLUMN "emp_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Leave Balance" DROP CONSTRAINT "Leave Balance_pkey",
ALTER COLUMN "emp_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Leave Balance_pkey" PRIMARY KEY ("emp_id", "leave_type_id");

-- AlterTable
ALTER TABLE "Leave Request" ALTER COLUMN "emp_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Loginout" ALTER COLUMN "emp_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Payroll" ALTER COLUMN "emp_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "emp_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("emp_id");

-- AddForeignKey
ALTER TABLE "Loginout" ADD CONSTRAINT "Loginout_emp_id_fkey" FOREIGN KEY ("emp_id") REFERENCES "User"("emp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendence" ADD CONSTRAINT "Attendence_emp_id_fkey" FOREIGN KEY ("emp_id") REFERENCES "User"("emp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payroll" ADD CONSTRAINT "Payroll_emp_id_fkey" FOREIGN KEY ("emp_id") REFERENCES "User"("emp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Extra pay Request" ADD CONSTRAINT "Extra pay Request_emp_id_fkey" FOREIGN KEY ("emp_id") REFERENCES "User"("emp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deduct Request" ADD CONSTRAINT "Deduct Request_emp_id_fkey" FOREIGN KEY ("emp_id") REFERENCES "User"("emp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Leave Balance" ADD CONSTRAINT "Leave Balance_emp_id_fkey" FOREIGN KEY ("emp_id") REFERENCES "User"("emp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Leave Request" ADD CONSTRAINT "Leave Request_emp_id_fkey" FOREIGN KEY ("emp_id") REFERENCES "User"("emp_id") ON DELETE RESTRICT ON UPDATE CASCADE;
