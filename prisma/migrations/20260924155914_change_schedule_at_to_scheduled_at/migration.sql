/*
  Warnings:

  - You are about to drop the column `scheduleAt` on the `appointments` table. All the data in the column will be lost.
  - Added the required column `scheduledAt` to the `appointments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "appointments" DROP COLUMN "scheduleAt",
ADD COLUMN     "scheduledAt" TIMESTAMP(3) NOT NULL;
