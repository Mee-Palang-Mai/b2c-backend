/*
  Warnings:

  - The primary key for the `Check-in` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `CheckinTransaction_ID` on the `Check-in` table. All the data in the column will be lost.
  - The primary key for the `Check-out` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `CheckoutTransaction_ID` on the `Check-out` table. All the data in the column will be lost.
  - You are about to drop the column `Deduct_Pay` on the `Deduct Request` table. All the data in the column will be lost.
  - The primary key for the `Deduct Total` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Deduct_Rate` on the `Deduct Total` table. All the data in the column will be lost.
  - You are about to drop the column `Rate_Type` on the `Deduct Total` table. All the data in the column will be lost.
  - You are about to drop the column `Type_Name` on the `Deduct Total` table. All the data in the column will be lost.
  - You are about to drop the column `Extra_Pay` on the `Extra pay Request` table. All the data in the column will be lost.
  - You are about to drop the column `Leave_Reason` on the `Leave Request` table. All the data in the column will be lost.
  - The primary key for the `Store` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Store_No` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `KPi_No` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `Cognito_Sub` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Team_Level` on the `User` table. All the data in the column will be lost.
  - Added the required column `Checkin_Transaction_ID` to the `Check-in` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Store_ID` to the `Check-in` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Checkin_Transaction_ID` to the `Check-out` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Checkout_Transaction_ID` to the `Check-out` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Store_ID` to the `Check-out` table without a default value. This is not possible if the table is not empty.
  - Made the column `Note` on table `Deduct Request` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `Create_Date` to the `Deduct Total` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Emp_ID` to the `Deduct Total` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Update_Date` to the `Deduct Total` table without a default value. This is not possible if the table is not empty.
  - Added the required column `End_Time` to the `Extra pay Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Note` to the `Extra pay Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Start_Time` to the `Extra pay Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `End_Time` to the `Leave Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Note` to the `Leave Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Start_Time` to the `Leave Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Status` to the `Leave Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Store_ID` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Emp_Name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Check-in" DROP CONSTRAINT "Check-in_pkey",
DROP COLUMN "CheckinTransaction_ID",
ADD COLUMN     "Checkin_Transaction_ID" INTEGER NOT NULL,
ADD COLUMN     "Store_ID" INTEGER NOT NULL,
ADD CONSTRAINT "Check-in_pkey" PRIMARY KEY ("Checkin_Transaction_ID");

-- AlterTable
ALTER TABLE "Check-out" DROP CONSTRAINT "Check-out_pkey",
DROP COLUMN "CheckoutTransaction_ID",
ADD COLUMN     "Checkin_Transaction_ID" INTEGER NOT NULL,
ADD COLUMN     "Checkout_Transaction_ID" INTEGER NOT NULL,
ADD COLUMN     "Store_ID" INTEGER NOT NULL,
ADD CONSTRAINT "Check-out_pkey" PRIMARY KEY ("Checkout_Transaction_ID");

-- AlterTable
ALTER TABLE "Deduct Request" DROP COLUMN "Deduct_Pay",
ADD COLUMN     "Approve_By" TEXT,
ALTER COLUMN "Note" SET NOT NULL;

-- AlterTable
ALTER TABLE "Deduct Total" DROP CONSTRAINT "Deduct Total_pkey",
DROP COLUMN "Deduct_Rate",
DROP COLUMN "Rate_Type",
DROP COLUMN "Type_Name",
ADD COLUMN     "Create_Date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "Deduct_Total" DOUBLE PRECISION,
ADD COLUMN     "Emp_ID" INTEGER NOT NULL,
ADD COLUMN     "Update_Date" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "Deduct Total_pkey" PRIMARY KEY ("Emp_ID");

-- AlterTable
ALTER TABLE "Extra pay Request" DROP COLUMN "Extra_Pay",
ADD COLUMN     "Approve_By" TEXT,
ADD COLUMN     "End_Time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "Note" TEXT NOT NULL,
ADD COLUMN     "Start_Time" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Extra pay Type" ADD COLUMN     "Pay_Rate" TEXT;

-- AlterTable
ALTER TABLE "Leave Request" DROP COLUMN "Leave_Reason",
ADD COLUMN     "Approve_By" TEXT,
ADD COLUMN     "End_Time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "Note" TEXT NOT NULL,
ADD COLUMN     "Start_Time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "Status" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Store" DROP CONSTRAINT "Store_pkey",
DROP COLUMN "Store_No",
ADD COLUMN     "Store_ID" INTEGER NOT NULL,
ADD CONSTRAINT "Store_pkey" PRIMARY KEY ("Store_ID");

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "KPi_No",
ADD COLUMN     "Route_No" INTEGER;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "Cognito_Sub",
DROP COLUMN "Name",
DROP COLUMN "Team_Level",
ADD COLUMN     "Emp_Level" TEXT,
ADD COLUMN     "Emp_Name" TEXT NOT NULL,
ADD COLUMN     "Regist_No" TEXT,
ADD COLUMN     "Team_Id" TEXT;

-- CreateTable
CREATE TABLE "Extra pay" (
    "Emp_ID" INTEGER NOT NULL,
    "Extra_Type_ID" INTEGER NOT NULL,
    "Extra_Pay" DOUBLE PRECISION,
    "Create_Date" TIMESTAMP(3) NOT NULL,
    "Update_Date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Extra pay_pkey" PRIMARY KEY ("Emp_ID")
);

-- CreateTable
CREATE TABLE "Deduct Type" (
    "Deduct_Type_ID" INTEGER NOT NULL,
    "Type_Name" TEXT NOT NULL,
    "Deduct_Rate" DOUBLE PRECISION,
    "Rate_Type" TEXT,

    CONSTRAINT "Deduct Type_pkey" PRIMARY KEY ("Deduct_Type_ID")
);
