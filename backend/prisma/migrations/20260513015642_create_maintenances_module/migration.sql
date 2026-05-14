/*
  Warnings:

  - Added the required column `updatedAt` to the `Maintenance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "MaintenanceType" ADD VALUE 'ALIGNMENT';
ALTER TYPE "MaintenanceType" ADD VALUE 'BALANCING';
ALTER TYPE "MaintenanceType" ADD VALUE 'BRAKES';
ALTER TYPE "MaintenanceType" ADD VALUE 'SUSPENSION';
ALTER TYPE "MaintenanceType" ADD VALUE 'ENGINE';
ALTER TYPE "MaintenanceType" ADD VALUE 'BATTERY';

-- AlterTable
ALTER TABLE "Maintenance" ADD COLUMN     "nextMaintenanceAt" TIMESTAMP(3),
ADD COLUMN     "nextMaintenanceKm" DOUBLE PRECISION,
ADD COLUMN     "performedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
