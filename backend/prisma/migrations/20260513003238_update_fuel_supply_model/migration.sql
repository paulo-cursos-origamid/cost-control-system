-- AlterTable
ALTER TABLE "FuelSupply" ADD COLUMN     "averageCostPerKm" DOUBLE PRECISION,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "previousFullTankId" TEXT;

-- CreateIndex
CREATE INDEX "FuelSupply_vehicleId_idx" ON "FuelSupply"("vehicleId");

-- CreateIndex
CREATE INDEX "FuelSupply_fullTank_idx" ON "FuelSupply"("fullTank");

-- CreateIndex
CREATE INDEX "FuelSupply_createdAt_idx" ON "FuelSupply"("createdAt");

-- AddForeignKey
ALTER TABLE "FuelSupply" ADD CONSTRAINT "FuelSupply_previousFullTankId_fkey" FOREIGN KEY ("previousFullTankId") REFERENCES "FuelSupply"("id") ON DELETE SET NULL ON UPDATE CASCADE;
