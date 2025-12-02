-- AlterTable
ALTER TABLE "Deduct Request" ALTER COLUMN "deleted_At" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Leave Request" ALTER COLUMN "deleted_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "OT Request" ALTER COLUMN "deleted_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Place" ALTER COLUMN "deleted_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Team" ALTER COLUMN "deleted_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "deleted_at" DROP NOT NULL;
