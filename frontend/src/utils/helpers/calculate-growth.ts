export function calculateGrowth(
  current: number,
  previous: number,
) {
  if (!previous) return 0;

  return Number(
    (
      ((current - previous) / previous) *
      100
    ).toFixed(1),
  );
}