/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `ParkingZone` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ParkingZone" ADD COLUMN     "description" TEXT,
ALTER COLUMN "city" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ParkingZone_name_key" ON "ParkingZone"("name");
