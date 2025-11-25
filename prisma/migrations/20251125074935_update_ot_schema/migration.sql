-- AlterTable
CREATE SEQUENCE ot_ot_id_seq;
ALTER TABLE "OT" ALTER COLUMN "OT_ID" SET DEFAULT nextval('ot_ot_id_seq');
ALTER SEQUENCE ot_ot_id_seq OWNED BY "OT"."OT_ID";
