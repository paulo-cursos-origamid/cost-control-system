import { Prisma } from '@prisma/client';

export const decimalToNumber = (
  value: Prisma.Decimal | number | null | undefined,
): number => {
  if (value === null || value === undefined) {
    return 0;
  }

  if (typeof value === 'number') {
    return value;
  }

  return value.toNumber();
};

export const toDecimal = (value: number | string): Prisma.Decimal => {
  return new Prisma.Decimal(value);
};

export const sumMoney = (
  values: Array<Prisma.Decimal | number | null | undefined>,
): number => {
  return values.reduce<number>((acc, value) => acc + decimalToNumber(value), 0);
};

export const subtractMoney = (
  income: Prisma.Decimal | number | null | undefined,
  expense: Prisma.Decimal | number | null | undefined,
): number => {
  return decimalToNumber(income) - decimalToNumber(expense);
};

export const roundMoney = (value: number): number => {
  return Number(value.toFixed(2));
};

export const formatCurrency = (
  value: Prisma.Decimal | number | null | undefined,
  locale = 'pt-BR',
  currency = 'BRL',
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(decimalToNumber(value));
};
