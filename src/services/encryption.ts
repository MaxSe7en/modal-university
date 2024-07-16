const SECRET_KEY = "YourSecretKeyHere"; // Replace with a strong, unique key

export function encrypt(text: string): string {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    result += String.fromCharCode(text.charCodeAt(i) ^ SECRET_KEY.charCodeAt(i % SECRET_KEY.length));
  }
  return btoa(result); // Base64 encode the result
}

export function decrypt(encoded: string): string {
  const text = atob(encoded); // Base64 decode the input
  let result = '';
  for (let i = 0; i < text.length; i++) {
    result += String.fromCharCode(text.charCodeAt(i) ^ SECRET_KEY.charCodeAt(i % SECRET_KEY.length));
  }
  return result;
}