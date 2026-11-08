/** "Saurabh", "Wani" → "Happy-Diwali-Saurabh-Wani.png" (keeps Devanagari letters). */
export const buildCardFilename = (name: string, familyName: string): string => {
  const slug = `${name} ${familyName}`
    .normalize('NFC')
    .replace(/[^\p{L}\p{M}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
  return slug ? `Happy-Diwali-${slug}.png` : 'Happy-Diwali-Greeting-Card.png';
};
