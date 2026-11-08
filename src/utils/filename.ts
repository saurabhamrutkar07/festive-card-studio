/** "John Doe & Family" → "Happy-Diwali-John-Doe-Family.png" (keeps Devanagari letters). */
export const buildCardFilename = (signature: string): string => {
  const slug = signature
    .normalize('NFC')
    .replace(/[^\p{L}\p{M}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
  return slug ? `Happy-Diwali-${slug}.png` : 'Happy-Diwali-Greeting-Card.png';
};
