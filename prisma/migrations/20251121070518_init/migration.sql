-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'SUPERVISOR', 'EMPLOYEE');

-- CreateTable
CREATE TABLE "User" (
    "Emp_ID" INTEGER NOT NULL,
    "Emp_No" TEXT NOT NULL,
    "Username" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Nick_Name" TEXT,
    "Phone_Number" TEXT,
    "Email" TEXT,
    "Team_Level" TEXT,
    "Work_Start_Date" TIMESTAMP(3) NOT NULL,
    "Work_Status" TEXT NOT NULL,
    "Create_Date" TIMESTAMP(3) NOT NULL,
    "Update_Date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("Emp_ID")
);

-- CreateTable
CREATE TABLE "Holiday" (
    "Holiday_ID" INTEGER NOT NULL,
    "Holiday_Date" TIMESTAMP(3) NOT NULL,
    "Create_Date" TIMESTAMP(3) NOT NULL,
    "Update_Date" TIMESTAMP(3) NOT NULL,
    "Approve_By" TEXT,

    CONSTRAINT "Holiday_pkey" PRIMARY KEY ("Holiday_ID")
);

-- CreateTable
CREATE TABLE "Loginout" (
    "Transaction_ID" INTEGER NOT NULL,
    "Emp_ID" INTEGER NOT NULL,
    "Status" TEXT NOT NULL,
    "Timestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Loginout_pkey" PRIMARY KEY ("Transaction_ID")
);

-- CreateTable
CREATE TABLE "Check-in" (
    "CheckinTransaction_ID" INTEGER NOT NULL,
    "Emp_ID" INTEGER NOT NULL,
    "Latitude" DOUBLE PRECISION NOT NULL,
    "Longitude" DOUBLE PRECISION NOT NULL,
    "Status" TEXT NOT NULL,
    "Timestamp" TIMESTAMP(3) NOT NULL,
    "Create_Date" TIMESTAMP(3) NOT NULL,
    "Update_Date" TIMESTAMP(3) NOT NULL,
    "Start_Working_Time" TEXT,

    CONSTRAINT "Check-in_pkey" PRIMARY KEY ("CheckinTransaction_ID")
);

-- CreateTable
CREATE TABLE "Check-out" (
    "CheckoutTransaction_ID" INTEGER NOT NULL,
    "Emp_ID" INTEGER NOT NULL,
    "Latitude" DOUBLE PRECISION NOT NULL,
    "Longitude" DOUBLE PRECISION NOT NULL,
    "Status" TEXT NOT NULL,
    "Timestamp" TIMESTAMP(3) NOT NULL,
    "Create_Date" TIMESTAMP(3) NOT NULL,
    "Update_Date" TIMESTAMP(3) NOT NULL,
    "End_Working_Time" TEXT,
    "Is_OT" BOOLEAN,

    CONSTRAINT "Check-out_pkey" PRIMARY KEY ("CheckoutTransaction_ID")
);

-- CreateTable
CREATE TABLE "OT" (
    "OT_ID" INTEGER NOT NULL,
    "Emp_ID" INTEGER NOT NULL,
    "OT_Time" TEXT,
    "Create_Date" TIMESTAMP(3) NOT NULL,
    "Update_Date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OT_pkey" PRIMARY KEY ("OT_ID")
);

-- CreateTable
CREATE TABLE "Store" (
    "Store_No" INTEGER NOT NULL,
    "Store_Name" TEXT NOT NULL,
    "Store_Type" TEXT NOT NULL,
    "Latitude" DOUBLE PRECISION NOT NULL,
    "Longitude" DOUBLE PRECISION NOT NULL,
    "Create_Date" TIMESTAMP(3) NOT NULL,
    "Update_Date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("Store_No")
);

-- CreateTable
CREATE TABLE "Task" (
    "Task_ID" INTEGER NOT NULL,
    "Emp_ID" INTEGER NOT NULL,
    "KPi_No" INTEGER,
    "Zone_No" INTEGER,
    "Store_No" INTEGER,
    "Date" TIMESTAMP(3) NOT NULL,
    "Start_Time" TIMESTAMP(3) NOT NULL,
    "End_Time" TIMESTAMP(3) NOT NULL,
    "Status" TEXT NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("Task_ID")
);

-- CreateTable
CREATE TABLE "Payroll" (
    "Payroll_ID" INTEGER NOT NULL,
    "Emp_ID" INTEGER NOT NULL,
    "Salary" DOUBLE PRECISION,
    "Incentive_Pay" DOUBLE PRECISION,
    "Extra_Total" DOUBLE PRECISION,
    "Deduct_Total" DOUBLE PRECISION,
    "Total_Pay" DOUBLE PRECISION,
    "Create_Date" TIMESTAMP(3) NOT NULL,
    "Update_Date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payroll_pkey" PRIMARY KEY ("Payroll_ID")
);

-- CreateTable
CREATE TABLE "Extra pay Request" (
    "Request_ID" INTEGER NOT NULL,
    "Emp_ID" INTEGER NOT NULL,
    "Extra_Type_ID" INTEGER NOT NULL,
    "Status" TEXT NOT NULL,
    "Extra_Pay" DOUBLE PRECISION,
    "Start_Date" TIMESTAMP(3) NOT NULL,
    "End_Date" TIMESTAMP(3) NOT NULL,
    "Create_Date" TIMESTAMP(3) NOT NULL,
    "Update_Date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Extra pay Request_pkey" PRIMARY KEY ("Request_ID")
);

-- CreateTable
CREATE TABLE "Extra pay Type" (
    "Extra_Type_ID" INTEGER NOT NULL,
    "Type_Name" TEXT NOT NULL,
    "Rate_Type" TEXT,

    CONSTRAINT "Extra pay Type_pkey" PRIMARY KEY ("Extra_Type_ID")
);

-- CreateTable
CREATE TABLE "Deduct Request" (
    "Request_ID" INTEGER NOT NULL,
    "Emp_ID" INTEGER NOT NULL,
    "Deduct_Type_ID" INTEGER NOT NULL,
    "Status" TEXT NOT NULL,
    "Deduct_Pay" DOUBLE PRECISION,
    "Note" TEXT,
    "Create_Date" TIMESTAMP(3) NOT NULL,
    "Update_Date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Deduct Request_pkey" PRIMARY KEY ("Request_ID")
);

-- CreateTable
CREATE TABLE "Deduct Total" (
    "Deduct_Type_ID" INTEGER NOT NULL,
    "Type_Name" TEXT NOT NULL,
    "Deduct_Rate" DOUBLE PRECISION,
    "Rate_Type" TEXT,

    CONSTRAINT "Deduct Total_pkey" PRIMARY KEY ("Deduct_Type_ID")
);

-- CreateTable
CREATE TABLE "Leave Type" (
    "Leave_Type_ID" INTEGER NOT NULL,
    "Type_Name" TEXT NOT NULL,

    CONSTRAINT "Leave Type_pkey" PRIMARY KEY ("Leave_Type_ID")
);

-- CreateTable
CREATE TABLE "Leave Balance" (
    "Emp_ID" INTEGER NOT NULL,
    "Leave_Type_ID" INTEGER NOT NULL,
    "Leave_Count" INTEGER,
    "Leave_Balance" INTEGER,

    CONSTRAINT "Leave Balance_pkey" PRIMARY KEY ("Emp_ID","Leave_Type_ID")
);

-- CreateTable
CREATE TABLE "Leave Request" (
    "Request_ID" INTEGER NOT NULL,
    "Emp_ID" INTEGER NOT NULL,
    "Leave_Type_ID" INTEGER NOT NULL,
    "Leave_Count" INTEGER,
    "Leave_Balance" INTEGER,
    "Leave_Reason" TEXT,
    "Start_Date" TIMESTAMP(3) NOT NULL,
    "End_Date" TIMESTAMP(3) NOT NULL,
    "Create_Date" TIMESTAMP(3) NOT NULL,
    "Update_Date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Leave Request_pkey" PRIMARY KEY ("Request_ID")
);
