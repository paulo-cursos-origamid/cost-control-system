-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "LedgerReferenceType" ADD VALUE 'CREDIT_CARD_INVOICE';
ALTER TYPE "LedgerReferenceType" ADD VALUE 'INSTALLMENT';
ALTER TYPE "LedgerReferenceType" ADD VALUE 'RECURRING_TRANSACTION';
ALTER TYPE "LedgerReferenceType" ADD VALUE 'ADJUSTMENT';
ALTER TYPE "LedgerReferenceType" ADD VALUE 'REVERSAL';

-- AlterTable
ALTER TABLE "LedgerEntry" ADD COLUMN     "reversalOfId" TEXT,
ADD COLUMN     "reversedAt" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "LedgerEntry" ADD CONSTRAINT "LedgerEntry_reversalOfId_fkey" FOREIGN KEY ("reversalOfId") REFERENCES "LedgerEntry"("id") ON DELETE SET NULL ON UPDATE CASCADE;
