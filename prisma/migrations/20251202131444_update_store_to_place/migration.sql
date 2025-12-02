/*
  Warnings:

  - You are about to drop the column `store_id` on the `Attendence` table. All the data in the column will be lost.
  - You are about to drop the `Store` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `place_id` to the `Attendence` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Attendence" DROP CONSTRAINT "Attendence_store_id_fkey";

-- AlterTable
ALTER TABLE "Attendence" DROP COLUMN "store_id",
ADD COLUMN     "place_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Store";

-- CreateTable
CREATE TABLE "Place" (
    "place_id" INTEGER NOT NULL,
    "place_name" TEXT NOT NULL,
    "place_type" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Place_pkey" PRIMARY KEY ("place_id")
);

-- AddForeignKey
ALTER TABLE "Attendence" ADD CONSTRAINT "Attendence_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "Place"("place_id") ON DELETE RESTRICT ON UPDATE CASCADE;
