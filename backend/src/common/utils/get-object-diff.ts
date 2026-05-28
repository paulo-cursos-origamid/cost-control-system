export interface ObjectDiff {
  before: Record<string, unknown>;
  after: Record<string, unknown>;
  changedFields: string[];
}

export function getObjectDiff(
  before: Record<string, unknown>,
  after: Record<string, unknown>,
): ObjectDiff {
  const changedFields: string[] = [];

  const beforeData: Record<string, unknown> = {};

  const afterData: Record<string, unknown> = {};

  for (const key of Object.keys(after)) {
    if (before[key] !== after[key]) {
      changedFields.push(key);

      beforeData[key] = before[key];

      afterData[key] = after[key];
    }
  }

  return {
    before: beforeData,
    after: afterData,
    changedFields,
  };
}
