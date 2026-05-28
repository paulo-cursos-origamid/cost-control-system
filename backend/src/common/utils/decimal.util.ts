import { Prisma } from '@prisma/client';

export function decimalToNumber(
  value: Prisma.Decimal | number | null | undefined,
): number {
  if (value === null || value === undefined) {
    return 0;
  }

  if (typeof value === 'number') {
    return value;
  }

  return value.toNumber();
}

export function sumDecimals(
  values: (Prisma.Decimal | number | null | undefined)[],
): number {
  return values.reduce<number>((acc, value) => {
    return acc + decimalToNumber(value);
  }, 0);
}
