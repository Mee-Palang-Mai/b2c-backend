/*
  Warnings:

  - You are about to drop the column `deleted_at` on the `Deduct Request` table. All the data in the column will be lost.
  - You are about to drop the column `Latitude` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `Longitude` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `emp_np` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[emp_id]` on the table `Loginout` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `deleted_At` to the `Deduct Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emp_no` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Deduct Request" DROP COLUMN "deleted_at",
ADD COLUMN     "deleted_At" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Store" DROP COLUMN "Latitude",
DROP COLUMN "Longitude",
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "emp_np",
ADD COLUMN     "emp_no" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Loginout_emp_id_key" ON "Loginout"("emp_id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("team_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loginout" ADD CONSTRAINT "Loginout_emp_id_fkey" FOREIGN KEY ("emp_id") REFERENCES "User"("emp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendence" ADD CONSTRAINT "Attendence_emp_id_fkey" FOREIGN KEY ("emp_id") REFERENCES "User"("emp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendence" ADD CONSTRAINT "Attendence_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store"("store_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OT" ADD CONSTRAINT "OT_attendence_id_fkey" FOREIGN KEY ("attendence_id") REFERENCES "Attendence"("attendence_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OT Request" ADD CONSTRAINT "OT Request_attendence_id_fkey" FOREIGN KEY ("attendence_id") REFERENCES "Attendence"("attendence_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payroll" ADD CONSTRAINT "Payroll_emp_id_fkey" FOREIGN KEY ("emp_id") REFERENCES "User"("emp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Extra pay Request" ADD CONSTRAINT "Extra pay Request_emp_id_fkey" FOREIGN KEY ("emp_id") REFERENCES "User"("emp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Extra pay Request" ADD CONSTRAINT "Extra pay Request_extra_type_id_fkey" FOREIGN KEY ("extra_type_id") REFERENCES "Extra pay Type"("extra_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Extra pay Total" ADD CONSTRAINT "Extra pay Total_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "Extra pay Request"("request_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deduct Request" ADD CONSTRAINT "Deduct Request_emp_id_fkey" FOREIGN KEY ("emp_id") REFERENCES "User"("emp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deduct Request" ADD CONSTRAINT "Deduct Request_deduct_type_id_fkey" FOREIGN KEY ("deduct_type_id") REFERENCES "Deduct Type"("deduct_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deduct Total" ADD CONSTRAINT "Deduct Total_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "Deduct Request"("request_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Leave Balance" ADD CONSTRAINT "Leave Balance_leave_type_id_fkey" FOREIGN KEY ("leave_type_id") REFERENCES "Leave Type"("leave_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Leave Balance" ADD CONSTRAINT "Leave Balance_emp_id_fkey" FOREIGN KEY ("emp_id") REFERENCES "User"("emp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Leave Request" ADD CONSTRAINT "Leave Request_leave_type_id_fkey" FOREIGN KEY ("leave_type_id") REFERENCES "Leave Type"("leave_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Leave Request" ADD CONSTRAINT "Leave Request_emp_id_fkey" FOREIGN KEY ("emp_id") REFERENCES "User"("emp_id") ON DELETE RESTRICT ON UPDATE CASCADE;
