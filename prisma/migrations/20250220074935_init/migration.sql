/*
  Warnings:

  - You are about to drop the column `deleted_at` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_user_id_fkey";

-- DropForeignKey
ALTER TABLE "CourseEvent" DROP CONSTRAINT "CourseEvent_course_id_fkey";

-- DropForeignKey
ALTER TABLE "LikedEvent" DROP CONSTRAINT "LikedEvent_user_id_fkey";

-- DropForeignKey
ALTER TABLE "LikedStar" DROP CONSTRAINT "LikedStar_user_id_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "deleted_at";

-- AddForeignKey
ALTER TABLE "LikedStar" ADD CONSTRAINT "LikedStar_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikedEvent" ADD CONSTRAINT "LikedEvent_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseEvent" ADD CONSTRAINT "CourseEvent_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
