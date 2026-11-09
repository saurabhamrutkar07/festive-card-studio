/** "John Doe & Family", "Happy-Bhaubij" → "Happy-Bhaubij-John-Doe-Family.png" (keeps Devanagari letters). */
export const buildCardFilename = (signature: string, prefix = 'Happy-Diwali'): string => {
  const slug = signature
    .normalize('NFC')
    .replace(/[^\p{L}\p{M}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
  return slug ? `${prefix}-${slug}.png` : `${prefix}-Greeting-Card.png`;
};
