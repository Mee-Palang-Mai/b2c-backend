-- AlterTable
CREATE SEQUENCE attendence_attendence_id_seq;
ALTER TABLE "Attendence" ALTER COLUMN "attendence_id" SET DEFAULT nextval('attendence_attendence_id_seq'),
ALTER COLUMN "check_out_latitude" DROP NOT NULL,
ALTER COLUMN "check_out_longitude" DROP NOT NULL,
ALTER COLUMN "check_out_datetime" DROP NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "deleted_at" DROP NOT NULL;
ALTER SEQUENCE attendence_attendence_id_seq OWNED BY "Attendence"."attendence_id";
