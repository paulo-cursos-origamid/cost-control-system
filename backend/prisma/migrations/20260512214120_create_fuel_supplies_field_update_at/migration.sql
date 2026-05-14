/*
  Warnings:

  - Added the required column `updatedAt` to the `FuelSupply` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "FuelType" ADD VALUE 'GNV';

-- AlterTable
ALTER TABLE "FuelSupply" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
