/*
  Warnings:

  - The primary key for the `Deduct Request` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Approve_By` on the `Deduct Request` table. All the data in the column will be lost.
  - You are about to drop the column `Create_Date` on the `Deduct Request` table. All the data in the column will be lost.
  - You are about to drop the column `Deduct_Type_ID` on the `Deduct Request` table. All the data in the column will be lost.
  - You are about to drop the column `Emp_ID` on the `Deduct Request` table. All the data in the column will be lost.
  - You are about to drop the column `Note` on the `Deduct Request` table. All the data in the column will be lost.
  - You are about to drop the column `Request_ID` on the `Deduct Request` table. All the data in the column will be lost.
  - You are about to drop the column `Status` on the `Deduct Request` table. All the data in the column will be lost.
  - You are about to drop the column `Update_Date` on the `Deduct Request` table. All the data in the column will be lost.
  - The primary key for the `Deduct Total` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Create_Date` on the `Deduct Total` table. All the data in the column will be lost.
  - You are about to drop the column `Deduct_Total` on the `Deduct Total` table. All the data in the column will be lost.
  - You are about to drop the column `Deduct_Type_ID` on the `Deduct Total` table. All the data in the column will be lost.
  - You are about to drop the column `Emp_ID` on the `Deduct Total` table. All the data in the column will be lost.
  - You are about to drop the column `Update_Date` on the `Deduct Total` table. All the data in the column will be lost.
  - The primary key for the `Deduct Type` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Deduct_Rate` on the `Deduct Type` table. All the data in the column will be lost.
  - You are about to drop the column `Deduct_Type_ID` on the `Deduct Type` table. All the data in the column will be lost.
  - You are about to drop the column `Rate_Type` on the `Deduct Type` table. All the data in the column will be lost.
  - You are about to drop the column `Type_Name` on the `Deduct Type` table. All the data in the column will be lost.
  - The primary key for the `Extra pay Request` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Approve_By` on the `Extra pay Request` table. All the data in the column will be lost.
  - You are about to drop the column `Create_Date` on the `Extra pay Request` table. All the data in the column will be lost.
  - You are about to drop the column `Emp_ID` on the `Extra pay Request` table. All the data in the column will be lost.
  - You are about to drop the column `End_Date` on the `Extra pay Request` table. All the data in the column will be lost.
  - You are about to drop the column `End_Time` on the `Extra pay Request` table. All the data in the column will be lost.
  - You are about to drop the column `Extra_Type_ID` on the `Extra pay Request` table. All the data in the column will be lost.
  - You are about to drop the column `Note` on the `Extra pay Request` table. All the data in the column will be lost.
  - You are about to drop the column `Request_ID` on the `Extra pay Request` table. All the data in the column will be lost.
  - You are about to drop the column `Start_Date` on the `Extra pay Request` table. All the data in the column will be lost.
  - You are about to drop the column `Start_Time` on the `Extra pay Request` table. All the data in the column will be lost.
  - You are about to drop the column `Status` on the `Extra pay Request` table. All the data in the column will be lost.
  - You are about to drop the column `Update_Date` on the `Extra pay Request` table. All the data in the column will be lost.
  - The primary key for the `Extra pay Type` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Extra_Type_ID` on the `Extra pay Type` table. All the data in the column will be lost.
  - You are about to drop the column `Pay_Rate` on the `Extra pay Type` table. All the data in the column will be lost.
  - You are about to drop the column `Rate_Type` on the `Extra pay Type` table. All the data in the column will be lost.
  - You are about to drop the column `Type_Name` on the `Extra pay Type` table. All the data in the column will be lost.
  - The primary key for the `Leave Balance` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Emp_ID` on the `Leave Balance` table. All the data in the column will be lost.
  - You are about to drop the column `Leave_Balance` on the `Leave Balance` table. All the data in the column will be lost.
  - You are about to drop the column `Leave_Count` on the `Leave Balance` table. All the data in the column will be lost.
  - You are about to drop the column `Leave_Type_ID` on the `Leave Balance` table. All the data in the column will be lost.
  - The primary key for the `Leave Request` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Approve_By` on the `Leave Request` table. All the data in the column will be lost.
  - You are about to drop the column `Create_Date` on the `Leave Request` table. All the data in the column will be lost.
  - You are about to drop the column `Emp_ID` on the `Leave Request` table. All the data in the column will be lost.
  - You are about to drop the column `End_Date` on the `Leave Request` table. All the data in the column will be lost.
  - You are about to drop the column `End_Time` on the `Leave Request` table. All the data in the column will be lost.
  - You are about to drop the column `Leave_Balance` on the `Leave Request` table. All the data in the column will be lost.
  - You are about to drop the column `Leave_Count` on the `Leave Request` table. All the data in the column will be lost.
  - You are about to drop the column `Leave_Type_ID` on the `Leave Request` table. All the data in the column will be lost.
  - You are about to drop the column `Note` on the `Leave Request` table. All the data in the column will be lost.
  - You are about to drop the column `Request_ID` on the `Leave Request` table. All the data in the column will be lost.
  - You are about to drop the column `Start_Date` on the `Leave Request` table. All the data in the column will be lost.
  - You are about to drop the column `Start_Time` on the `Leave Request` table. All the data in the column will be lost.
  - You are about to drop the column `Status` on the `Leave Request` table. All the data in the column will be lost.
  - You are about to drop the column `Update_Date` on the `Leave Request` table. All the data in the column will be lost.
  - The primary key for the `Leave Type` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Leave_Type_ID` on the `Leave Type` table. All the data in the column will be lost.
  - You are about to drop the column `Type_Name` on the `Leave Type` table. All the data in the column will be lost.
  - The primary key for the `Loginout` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Emp_ID` on the `Loginout` table. All the data in the column will be lost.
  - You are about to drop the column `Status` on the `Loginout` table. All the data in the column will be lost.
  - You are about to drop the column `Timestamp` on the `Loginout` table. All the data in the column will be lost.
  - You are about to drop the column `Transaction_ID` on the `Loginout` table. All the data in the column will be lost.
  - The primary key for the `OT` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Create_Date` on the `OT` table. All the data in the column will be lost.
  - You are about to drop the column `Emp_ID` on the `OT` table. All the data in the column will be lost.
  - You are about to drop the column `OT_ID` on the `OT` table. All the data in the column will be lost.
  - You are about to drop the column `OT_Time` on the `OT` table. All the data in the column will be lost.
  - You are about to drop the column `Update_Date` on the `OT` table. All the data in the column will be lost.
  - The primary key for the `Payroll` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Create_Date` on the `Payroll` table. All the data in the column will be lost.
  - You are about to drop the column `Deduct_Total` on the `Payroll` table. All the data in the column will be lost.
  - You are about to drop the column `Emp_ID` on the `Payroll` table. All the data in the column will be lost.
  - You are about to drop the column `Extra_Total` on the `Payroll` table. All the data in the column will be lost.
  - You are about to drop the column `Incentive_Pay` on the `Payroll` table. All the data in the column will be lost.
  - You are about to drop the column `Payroll_ID` on the `Payroll` table. All the data in the column will be lost.
  - You are about to drop the column `Salary` on the `Payroll` table. All the data in the column will be lost.
  - You are about to drop the column `Total_Pay` on the `Payroll` table. All the data in the column will be lost.
  - You are about to drop the column `Update_Date` on the `Payroll` table. All the data in the column will be lost.
  - The primary key for the `Store` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Create_Date` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `Store_ID` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `Store_Name` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `Store_Type` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `Update_Date` on the `Store` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Cognito_Sub` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Create_Date` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Emp_ID` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Emp_Level` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Emp_Name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Emp_No` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Nick_Name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Phone_Number` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Regist_No` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Team_Id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Update_Date` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Username` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Work_Start_Date` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Work_Status` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Check-in` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Check-out` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Extra pay` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Holiday` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `created_at` to the `Deduct Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deduct_type_id` to the `Deduct Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deleted_at` to the `Deduct Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emp_id` to the `Deduct Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `note` to the `Deduct Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `request_id` to the `Deduct Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Deduct Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Deduct Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `Deduct Total` table without a default value. This is not possible if the table is not empty.
  - Added the required column `request_id` to the `Deduct Total` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Deduct Total` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deduct_type_id` to the `Deduct Type` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type_name` to the `Deduct Type` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `Extra pay Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deleted_at` to the `Extra pay Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emp_id` to the `Extra pay Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_datetime` to the `Extra pay Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `extra_type_id` to the `Extra pay Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `note` to the `Extra pay Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `request_id` to the `Extra pay Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_datetime` to the `Extra pay Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Extra pay Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Extra pay Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `extra_type_id` to the `Extra pay Type` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type_name` to the `Extra pay Type` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emp_id` to the `Leave Balance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `leave_type_id` to the `Leave Balance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `Leave Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deleted_at` to the `Leave Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emp_id` to the `Leave Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_datetime` to the `Leave Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `leave_type_id` to the `Leave Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `note` to the `Leave Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `request_id` to the `Leave Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_datetime` to the `Leave Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Leave Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Leave Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `leave_type_id` to the `Leave Type` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type_name` to the `Leave Type` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emp_id` to the `Loginout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Loginout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timestamp` to the `Loginout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transaction_id` to the `Loginout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `attendence_id` to the `OT` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_datetime` to the `OT` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_datetime` to the `OT` table without a default value. This is not possible if the table is not empty.
  - Added the required column `create_Date` to the `Payroll` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emp_id` to the `Payroll` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payroll_date` to the `Payroll` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payroll_id` to the `Payroll` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_Date` to the `Payroll` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deleted_at` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `store_id` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `store_name` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `store_type` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cognito_sub` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deleted_at` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emp_id` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emp_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emp_np` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `work_start_date` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `work_status` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Deduct Request" DROP CONSTRAINT "Deduct Request_pkey",
DROP COLUMN "Approve_By",
DROP COLUMN "Create_Date",
DROP COLUMN "Deduct_Type_ID",
DROP COLUMN "Emp_ID",
DROP COLUMN "Note",
DROP COLUMN "Request_ID",
DROP COLUMN "Status",
DROP COLUMN "Update_Date",
ADD COLUMN     "approval_by" TEXT,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "deduct_type_id" INTEGER NOT NULL,
ADD COLUMN     "deleted_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "emp_id" INTEGER NOT NULL,
ADD COLUMN     "note" TEXT NOT NULL,
ADD COLUMN     "request_id" INTEGER NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "Deduct Request_pkey" PRIMARY KEY ("request_id");

-- AlterTable
ALTER TABLE "Deduct Total" DROP CONSTRAINT "Deduct Total_pkey",
DROP COLUMN "Create_Date",
DROP COLUMN "Deduct_Total",
DROP COLUMN "Deduct_Type_ID",
DROP COLUMN "Emp_ID",
DROP COLUMN "Update_Date",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "deduct_total" DOUBLE PRECISION,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "request_id" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "Deduct Total_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Deduct Type" DROP CONSTRAINT "Deduct Type_pkey",
DROP COLUMN "Deduct_Rate",
DROP COLUMN "Deduct_Type_ID",
DROP COLUMN "Rate_Type",
DROP COLUMN "Type_Name",
ADD COLUMN     "deduct_rate" DOUBLE PRECISION,
ADD COLUMN     "deduct_type_id" INTEGER NOT NULL,
ADD COLUMN     "rate_type" TEXT,
ADD COLUMN     "type_name" TEXT NOT NULL,
ADD CONSTRAINT "Deduct Type_pkey" PRIMARY KEY ("deduct_type_id");

-- AlterTable
ALTER TABLE "Extra pay Request" DROP CONSTRAINT "Extra pay Request_pkey",
DROP COLUMN "Approve_By",
DROP COLUMN "Create_Date",
DROP COLUMN "Emp_ID",
DROP COLUMN "End_Date",
DROP COLUMN "End_Time",
DROP COLUMN "Extra_Type_ID",
DROP COLUMN "Note",
DROP COLUMN "Request_ID",
DROP COLUMN "Start_Date",
DROP COLUMN "Start_Time",
DROP COLUMN "Status",
DROP COLUMN "Update_Date",
ADD COLUMN     "approval_by" TEXT,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "deleted_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "emp_id" INTEGER NOT NULL,
ADD COLUMN     "end_datetime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "extra_type_id" INTEGER NOT NULL,
ADD COLUMN     "note" TEXT NOT NULL,
ADD COLUMN     "request_id" INTEGER NOT NULL,
ADD COLUMN     "start_datetime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "Extra pay Request_pkey" PRIMARY KEY ("request_id");

-- AlterTable
ALTER TABLE "Extra pay Type" DROP CONSTRAINT "Extra pay Type_pkey",
DROP COLUMN "Extra_Type_ID",
DROP COLUMN "Pay_Rate",
DROP COLUMN "Rate_Type",
DROP COLUMN "Type_Name",
ADD COLUMN     "extra_type_id" INTEGER NOT NULL,
ADD COLUMN     "pay_rate" TEXT,
ADD COLUMN     "rate_type" TEXT,
ADD COLUMN     "type_name" TEXT NOT NULL,
ADD CONSTRAINT "Extra pay Type_pkey" PRIMARY KEY ("extra_type_id");

-- AlterTable
ALTER TABLE "Leave Balance" DROP CONSTRAINT "Leave Balance_pkey",
DROP COLUMN "Emp_ID",
DROP COLUMN "Leave_Balance",
DROP COLUMN "Leave_Count",
DROP COLUMN "Leave_Type_ID",
ADD COLUMN     "emp_id" INTEGER NOT NULL,
ADD COLUMN     "leave_balance" INTEGER,
ADD COLUMN     "leave_count" INTEGER,
ADD COLUMN     "leave_type_id" INTEGER NOT NULL,
ADD CONSTRAINT "Leave Balance_pkey" PRIMARY KEY ("emp_id", "leave_type_id");

-- AlterTable
ALTER TABLE "Leave Request" DROP CONSTRAINT "Leave Request_pkey",
DROP COLUMN "Approve_By",
DROP COLUMN "Create_Date",
DROP COLUMN "Emp_ID",
DROP COLUMN "End_Date",
DROP COLUMN "End_Time",
DROP COLUMN "Leave_Balance",
DROP COLUMN "Leave_Count",
DROP COLUMN "Leave_Type_ID",
DROP COLUMN "Note",
DROP COLUMN "Request_ID",
DROP COLUMN "Start_Date",
DROP COLUMN "Start_Time",
DROP COLUMN "Status",
DROP COLUMN "Update_Date",
ADD COLUMN     "approval_by" TEXT,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "deleted_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "emp_id" INTEGER NOT NULL,
ADD COLUMN     "end_datetime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "leave_count" INTEGER,
ADD COLUMN     "leave_type_id" INTEGER NOT NULL,
ADD COLUMN     "note" TEXT NOT NULL,
ADD COLUMN     "request_id" INTEGER NOT NULL,
ADD COLUMN     "start_datetime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "Leave Request_pkey" PRIMARY KEY ("request_id");

-- AlterTable
ALTER TABLE "Leave Type" DROP CONSTRAINT "Leave Type_pkey",
DROP COLUMN "Leave_Type_ID",
DROP COLUMN "Type_Name",
ADD COLUMN     "leave_type_id" INTEGER NOT NULL,
ADD COLUMN     "type_name" TEXT NOT NULL,
ADD CONSTRAINT "Leave Type_pkey" PRIMARY KEY ("leave_type_id");

-- AlterTable
ALTER TABLE "Loginout" DROP CONSTRAINT "Loginout_pkey",
DROP COLUMN "Emp_ID",
DROP COLUMN "Status",
DROP COLUMN "Timestamp",
DROP COLUMN "Transaction_ID",
ADD COLUMN     "emp_id" INTEGER NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "transaction_id" INTEGER NOT NULL,
ADD CONSTRAINT "Loginout_pkey" PRIMARY KEY ("transaction_id");

-- AlterTable
ALTER TABLE "OT" DROP CONSTRAINT "OT_pkey",
DROP COLUMN "Create_Date",
DROP COLUMN "Emp_ID",
DROP COLUMN "OT_ID",
DROP COLUMN "OT_Time",
DROP COLUMN "Update_Date",
ADD COLUMN     "attendence_id" INTEGER NOT NULL,
ADD COLUMN     "end_datetime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "ot_id" SERIAL NOT NULL,
ADD COLUMN     "start_datetime" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "OT_pkey" PRIMARY KEY ("ot_id");

-- AlterTable
ALTER TABLE "Payroll" DROP CONSTRAINT "Payroll_pkey",
DROP COLUMN "Create_Date",
DROP COLUMN "Deduct_Total",
DROP COLUMN "Emp_ID",
DROP COLUMN "Extra_Total",
DROP COLUMN "Incentive_Pay",
DROP COLUMN "Payroll_ID",
DROP COLUMN "Salary",
DROP COLUMN "Total_Pay",
DROP COLUMN "Update_Date",
ADD COLUMN     "create_Date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "deduct_total" DOUBLE PRECISION,
ADD COLUMN     "emp_id" INTEGER NOT NULL,
ADD COLUMN     "extra_total" DOUBLE PRECISION,
ADD COLUMN     "incentive_pay" DOUBLE PRECISION,
ADD COLUMN     "payroll_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "payroll_id" INTEGER NOT NULL,
ADD COLUMN     "salary" DOUBLE PRECISION,
ADD COLUMN     "total_pay" DOUBLE PRECISION,
ADD COLUMN     "update_Date" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "Payroll_pkey" PRIMARY KEY ("payroll_id");

-- AlterTable
ALTER TABLE "Store" DROP CONSTRAINT "Store_pkey",
DROP COLUMN "Create_Date",
DROP COLUMN "Store_ID",
DROP COLUMN "Store_Name",
DROP COLUMN "Store_Type",
DROP COLUMN "Update_Date",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "deleted_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "store_id" INTEGER NOT NULL,
ADD COLUMN     "store_name" TEXT NOT NULL,
ADD COLUMN     "store_type" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "Store_pkey" PRIMARY KEY ("store_id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "Cognito_Sub",
DROP COLUMN "Create_Date",
DROP COLUMN "Email",
DROP COLUMN "Emp_ID",
DROP COLUMN "Emp_Level",
DROP COLUMN "Emp_Name",
DROP COLUMN "Emp_No",
DROP COLUMN "Nick_Name",
DROP COLUMN "Password",
DROP COLUMN "Phone_Number",
DROP COLUMN "Regist_No",
DROP COLUMN "Team_Id",
DROP COLUMN "Update_Date",
DROP COLUMN "Username",
DROP COLUMN "Work_Start_Date",
DROP COLUMN "Work_Status",
ADD COLUMN     "cognito_sub" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "deleted_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "emp_id" INTEGER NOT NULL,
ADD COLUMN     "emp_level" TEXT,
ADD COLUMN     "emp_name" TEXT NOT NULL,
ADD COLUMN     "emp_np" TEXT NOT NULL,
ADD COLUMN     "nick_name" TEXT,
ADD COLUMN     "password" TEXT,
ADD COLUMN     "phone_number" TEXT,
ADD COLUMN     "regist_no" TEXT,
ADD COLUMN     "team_id" INTEGER,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL,
ADD COLUMN     "work_start_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "work_status" TEXT NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("emp_id");

-- DropTable
DROP TABLE "Check-in";

-- DropTable
DROP TABLE "Check-out";

-- DropTable
DROP TABLE "Extra pay";

-- DropTable
DROP TABLE "Holiday";

-- DropTable
DROP TABLE "Task";

-- CreateTable
CREATE TABLE "Team" (
    "team_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("team_id")
);

-- CreateTable
CREATE TABLE "Attendence" (
    "attendence_id" INTEGER NOT NULL,
    "emp_id" INTEGER NOT NULL,
    "store_id" INTEGER NOT NULL,
    "check_in_latitude" DOUBLE PRECISION NOT NULL,
    "check_in_longitude" DOUBLE PRECISION NOT NULL,
    "check_in_datetime" TIMESTAMP(3) NOT NULL,
    "check_out_latitude" DOUBLE PRECISION NOT NULL,
    "check_out_longitude" DOUBLE PRECISION NOT NULL,
    "check_out_datetime" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "is_ot" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Attendence_pkey" PRIMARY KEY ("attendence_id")
);

-- CreateTable
CREATE TABLE "OT Request" (
    "request_id" SERIAL NOT NULL,
    "attendence_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "approval_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OT Request_pkey" PRIMARY KEY ("request_id")
);

-- CreateTable
CREATE TABLE "Extra pay Total" (
    "id" SERIAL NOT NULL,
    "request_id" INTEGER NOT NULL,
    "extra_pay" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Extra pay Total_pkey" PRIMARY KEY ("id")
);
