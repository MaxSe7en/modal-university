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

export function formatDate(timestamp: string): string {
  // Create a Date object from the given timestamp
  const date = new Date(timestamp);

  // Define options for formatting the date
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };

  // Format the date to "Month Day, Year"
  return date.toLocaleDateString('en-US', options);
}