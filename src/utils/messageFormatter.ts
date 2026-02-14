/**
 * Formats message text by:
 * 1. Escaping HTML characters to prevent XSS
 * 2. Converting URLs to clickable links
 * 3. Converting newlines to <br> tags
 */
export const formatMessage = (text: string): string => {
  if (!text) return '';

  // 1. Escape HTML (basic sanitization)
  const escapeHtml = (unsafe: string): string => {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  let formattedText = escapeHtml(text);

  // 2. Convert URLs to links
  // Pattern to match URLs starting with http:// or https://
  // We exclude trailing punctuation that might be part of the sentence
  const urlPattern = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%?=~_|])/gim;

  formattedText = formattedText.replace(urlPattern, (url) => {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:underline hover:text-blue-300 break-all">${url}</a>`;
  });

  // 3. Convert newlines to <br>
  formattedText = formattedText.replace(/\n/g, '<br />');

  return formattedText;
};
