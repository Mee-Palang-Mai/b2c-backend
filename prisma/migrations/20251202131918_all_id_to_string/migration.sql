/*
  Warnings:

  - The primary key for the `Attendence` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Deduct Request` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Deduct Total` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Deduct Type` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Extra pay Request` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Extra pay Total` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Extra pay Type` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Leave Balance` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Leave Request` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Leave Type` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Loginout` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `OT` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `OT Request` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Payroll` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Place` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Team` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Attendence" DROP CONSTRAINT "Attendence_place_id_fkey";

-- DropForeignKey
ALTER TABLE "Deduct Request" DROP CONSTRAINT "Deduct Request_deduct_type_id_fkey";

-- DropForeignKey
ALTER TABLE "Deduct Total" DROP CONSTRAINT "Deduct Total_request_id_fkey";

-- DropForeignKey
ALTER TABLE "Extra pay Request" DROP CONSTRAINT "Extra pay Request_extra_type_id_fkey";

-- DropForeignKey
ALTER TABLE "Extra pay Total" DROP CONSTRAINT "Extra pay Total_request_id_fkey";

-- DropForeignKey
ALTER TABLE "Leave Balance" DROP CONSTRAINT "Leave Balance_leave_type_id_fkey";

-- DropForeignKey
ALTER TABLE "Leave Request" DROP CONSTRAINT "Leave Request_leave_type_id_fkey";

-- DropForeignKey
ALTER TABLE "OT" DROP CONSTRAINT "OT_attendence_id_fkey";

-- DropForeignKey
ALTER TABLE "OT Request" DROP CONSTRAINT "OT Request_attendence_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_team_id_fkey";

-- AlterTable
ALTER TABLE "Attendence" DROP CONSTRAINT "Attendence_pkey",
ALTER COLUMN "attendence_id" DROP DEFAULT,
ALTER COLUMN "attendence_id" SET DATA TYPE TEXT,
ALTER COLUMN "place_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Attendence_pkey" PRIMARY KEY ("attendence_id");
DROP SEQUENCE "attendence_attendence_id_seq";

-- AlterTable
ALTER TABLE "Deduct Request" DROP CONSTRAINT "Deduct Request_pkey",
ALTER COLUMN "deduct_type_id" SET DATA TYPE TEXT,
ALTER COLUMN "request_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Deduct Request_pkey" PRIMARY KEY ("request_id");

-- AlterTable
ALTER TABLE "Deduct Total" DROP CONSTRAINT "Deduct Total_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "request_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Deduct Total_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Deduct Total_id_seq";

-- AlterTable
ALTER TABLE "Deduct Type" DROP CONSTRAINT "Deduct Type_pkey",
ALTER COLUMN "deduct_type_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Deduct Type_pkey" PRIMARY KEY ("deduct_type_id");

-- AlterTable
ALTER TABLE "Extra pay Request" DROP CONSTRAINT "Extra pay Request_pkey",
ALTER COLUMN "extra_type_id" SET DATA TYPE TEXT,
ALTER COLUMN "request_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Extra pay Request_pkey" PRIMARY KEY ("request_id");

-- AlterTable
ALTER TABLE "Extra pay Total" DROP CONSTRAINT "Extra pay Total_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "request_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Extra pay Total_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Extra pay Total_id_seq";

-- AlterTable
ALTER TABLE "Extra pay Type" DROP CONSTRAINT "Extra pay Type_pkey",
ALTER COLUMN "extra_type_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Extra pay Type_pkey" PRIMARY KEY ("extra_type_id");

-- AlterTable
ALTER TABLE "Leave Balance" DROP CONSTRAINT "Leave Balance_pkey",
ALTER COLUMN "leave_type_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Leave Balance_pkey" PRIMARY KEY ("emp_id", "leave_type_id");

-- AlterTable
ALTER TABLE "Leave Request" DROP CONSTRAINT "Leave Request_pkey",
ALTER COLUMN "leave_type_id" SET DATA TYPE TEXT,
ALTER COLUMN "request_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Leave Request_pkey" PRIMARY KEY ("request_id");

-- AlterTable
ALTER TABLE "Leave Type" DROP CONSTRAINT "Leave Type_pkey",
ALTER COLUMN "leave_type_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Leave Type_pkey" PRIMARY KEY ("leave_type_id");

-- AlterTable
ALTER TABLE "Loginout" DROP CONSTRAINT "Loginout_pkey",
ALTER COLUMN "transaction_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Loginout_pkey" PRIMARY KEY ("transaction_id");

-- AlterTable
ALTER TABLE "OT" DROP CONSTRAINT "OT_pkey",
ALTER COLUMN "attendence_id" SET DATA TYPE TEXT,
ALTER COLUMN "ot_id" DROP DEFAULT,
ALTER COLUMN "ot_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "OT_pkey" PRIMARY KEY ("ot_id");
DROP SEQUENCE "OT_ot_id_seq";

-- AlterTable
ALTER TABLE "OT Request" DROP CONSTRAINT "OT Request_pkey",
ALTER COLUMN "request_id" DROP DEFAULT,
ALTER COLUMN "request_id" SET DATA TYPE TEXT,
ALTER COLUMN "attendence_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "OT Request_pkey" PRIMARY KEY ("request_id");
DROP SEQUENCE "OT Request_request_id_seq";

-- AlterTable
ALTER TABLE "Payroll" DROP CONSTRAINT "Payroll_pkey",
ALTER COLUMN "payroll_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Payroll_pkey" PRIMARY KEY ("payroll_id");

-- AlterTable
ALTER TABLE "Place" DROP CONSTRAINT "Place_pkey",
ALTER COLUMN "place_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Place_pkey" PRIMARY KEY ("place_id");

-- AlterTable
ALTER TABLE "Team" DROP CONSTRAINT "Team_pkey",
ALTER COLUMN "team_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Team_pkey" PRIMARY KEY ("team_id");

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "team_id" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("team_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendence" ADD CONSTRAINT "Attendence_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "Place"("place_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OT" ADD CONSTRAINT "OT_attendence_id_fkey" FOREIGN KEY ("attendence_id") REFERENCES "Attendence"("attendence_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OT Request" ADD CONSTRAINT "OT Request_attendence_id_fkey" FOREIGN KEY ("attendence_id") REFERENCES "Attendence"("attendence_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Extra pay Request" ADD CONSTRAINT "Extra pay Request_extra_type_id_fkey" FOREIGN KEY ("extra_type_id") REFERENCES "Extra pay Type"("extra_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Extra pay Total" ADD CONSTRAINT "Extra pay Total_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "Extra pay Request"("request_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deduct Request" ADD CONSTRAINT "Deduct Request_deduct_type_id_fkey" FOREIGN KEY ("deduct_type_id") REFERENCES "Deduct Type"("deduct_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deduct Total" ADD CONSTRAINT "Deduct Total_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "Deduct Request"("request_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Leave Balance" ADD CONSTRAINT "Leave Balance_leave_type_id_fkey" FOREIGN KEY ("leave_type_id") REFERENCES "Leave Type"("leave_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Leave Request" ADD CONSTRAINT "Leave Request_leave_type_id_fkey" FOREIGN KEY ("leave_type_id") REFERENCES "Leave Type"("leave_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;
