-- CreateEnum
CREATE TYPE "WatingStatus" AS ENUM ('PENDING', 'ENTERED');

-- CreateEnum
CREATE TYPE "ReservationStatus" AS ENUM ('CONFIRMED', 'ENTERED');

-- CreateEnum
CREATE TYPE "Breaktime" AS ENUM ('10', '15', '20', 'NONE');

-- AlterEnum
BEGIN;
CREATE TYPE "Mode_new" AS ENUM ('RESERVATION', 'WAITING');
ALTER TABLE "Event" ALTER COLUMN "mode" DROP DEFAULT;
ALTER TABLE "Event" ALTER COLUMN "mode" TYPE "Mode_new" USING ("mode"::text::"Mode_new");
ALTER TYPE "Mode" RENAME TO "Mode_old";
ALTER TYPE "Mode_new" RENAME TO "Mode";
DROP TYPE "Mode_old";
ALTER TABLE "Event" ALTER COLUMN "mode" SET DEFAULT 'WAITING';
COMMIT;

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "content",
ALTER COLUMN "mode" SET DEFAULT 'WAITING';

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "status",
ADD COLUMN     "status" "ReservationStatus" NOT NULL;

-- AlterTable
ALTER TABLE "ReservationSetting" DROP COLUMN "time_unit",
ADD COLUMN     "breaktime" "Breaktime" NOT NULL DEFAULT 'NONE';

-- AlterTable
ALTER TABLE "Star" ALTER COLUMN "real_name" DROP NOT NULL,
ALTER COLUMN "stage_name" SET NOT NULL;

-- AlterTable
ALTER TABLE "Waiting" DROP COLUMN "status",
ADD COLUMN     "status" "WatingStatus" NOT NULL;

-- DropEnum
DROP TYPE "Status";
