/*
  Warnings:

  - You are about to drop the column `descripton` on the `Transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "descripton",
ADD COLUMN     "description" TEXT;
