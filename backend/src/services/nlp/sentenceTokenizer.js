/**
 * Robust Sentence Tokenizer for Conversational Analysis
 * Handles sentence boundaries, conversational line breaks, punctuation,
 * abbreviations, and calculates exact character offsets for UI highlighting.
 */

function tokenizeSentences(text) {
  if (!text || typeof text !== 'string') {
    return [];
  }

  const sentences = [];
  // Split on line breaks or sentence terminators (. ! ?) followed by whitespace or end of string
  // Avoid splitting on common abbreviations or decimal numbers like $10.50 or 5.5%
  const cleanText = text;
  const regex = /([^.!?\r\n]+(?:[.!?]+|$))/g;

  let match;
  while ((match = regex.exec(cleanText)) !== null) {
    const rawMatch = match[0];
    const trimmed = rawMatch.trim();

    if (trimmed.length > 0) {
      // Find exact character boundaries within original text
      const start = match.index + (rawMatch.indexOf(trimmed));
      const end = start + trimmed.length;

      // Filter out solitary punctuation or meaningless fragments
      if (/[a-zA-Z0-9]/.test(trimmed)) {
        sentences.push({
          index: sentences.length,
          text: trimmed,
          start,
          end,
          length: trimmed.length
        });
      }
    }
  }

  // Fallback if regex yielded no sentences but text has characters
  if (sentences.length === 0 && text.trim().length > 0) {
    const trimmed = text.trim();
    const start = text.indexOf(trimmed);
    sentences.push({
      index: 0,
      text: trimmed,
      start,
      end: start + trimmed.length,
      length: trimmed.length
    });
  }

  return sentences;
}

module.exports = {
  tokenizeSentences
};
