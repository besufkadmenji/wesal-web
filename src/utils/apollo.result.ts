export const requireData = <T>(
  result: { data?: T | null; error?: Error },
  operation: string,
) => {
  if (result.error) throw result.error;
  if (!result.data) throw new Error(`${operation} returned no data`);
  return result.data;
};
