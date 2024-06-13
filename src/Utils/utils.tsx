export function getYear() {
  return new Date().getUTCFullYear() + 1;
}

// Utils/validation.ts
export const validateInput = (value: string, validationRules: { [key: string]: RegExp }) => {
  for (const rule in validationRules) {
    if (!validationRules[rule].test(value)) {
      return false;
    }
  }
  return true;
};