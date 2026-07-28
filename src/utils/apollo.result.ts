export const requireData = <T>(
  result: { data?: T | null; error?: Error },
  operation: string,
) => {
  if (result.error) throw result.error;
  if (!result.data) throw new Error(`${operation} returned no data`);
  return result.data;
};

export const requireOperationField = <
  T,
  K extends keyof T,
>(
  result: { data?: T | null; error?: Error },
  field: K,
  operation: string,
): NonNullable<T[K]> => {
  const data = requireData(result, operation);
  const value = data[field];
  if (value == null) {
    throw new Error(`${operation} returned null for ${String(field)}`);
  }
  return value;
};
