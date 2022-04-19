export const deepEqual = (a: any, b: any): boolean => {
  // if both are the same identity return true
  if (a === b || (a == null && b == null)) return true;

  if (typeof a !== 'object' || typeof a !== 'object') return false;
  // if both dont have the same length of keys return false
  if (Object.keys(a).length !== Object.keys(b).length) return false;

  for (const key in a) {
    if (!deepEqual(a[key], b[key])) {
      return false;
    }
  }

  return true;
};
