export function generateToken(length: number): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let token: string = '';

  if (length < 1) {
    console.error('Missing token length for generating new token!');
    return token;
  }

  for (var i = 0; i < length; i++) {
    token = token + chars[Math.floor(Math.random() * chars.length)];
  }
  return token;
}

export function generateUppercaseString(length: number): string {
  let rString: string = '';
  const characters = 'ABCDEFGHIJKLMNPQRSTUVWXYZ123456789';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    rString += characters.charAt(randomIndex);
  }

  return rString;
}

export function generateLowercaseString(length: number): string {
  let rString: string = '';
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    rString += characters.charAt(randomIndex);
  }

  return rString;
}
