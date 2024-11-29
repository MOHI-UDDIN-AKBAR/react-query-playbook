export const hasAllPropertiesValue = <T>(
  obj: T | Record<string, unknown>
): boolean => {
  if (typeof obj !== "object" || obj === null || obj === undefined) {
    return false;
  }

  return Object.entries(obj).every(([key, value]) => {
    if (value === null || value === undefined) return false;

    if (typeof value === "boolean") return true;

    if (Array.isArray(value)) {
      return value.every((item) => hasAllPropertiesValue(item));
    }

    if (typeof value === "object") {
      return hasAllPropertiesValue(value);
    }

    if (typeof value === "string") return true;

    if (value instanceof Date) return true;

    return value !== "";
  });
};
