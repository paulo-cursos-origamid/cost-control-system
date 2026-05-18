/*
  Warnings:

  - Added the required column `updatedAt` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('CASH', 'CHECKING', 'SAVINGS', 'CREDIT_CARD', 'INVESTMENT');

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "color" TEXT,
ADD COLUMN     "initialBalance" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "type" "AccountType" NOT NULL DEFAULT 'CHECKING',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
