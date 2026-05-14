import { PartialType } from '@nestjs/swagger';

import { CreateFuelSupplyDto } from './create-fuel-supply.dto';

export class UpdateFuelSupplyDto extends PartialType(CreateFuelSupplyDto) {}
