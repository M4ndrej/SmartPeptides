// Generate a custom unique ID
export const generateCustomId = (): string => {
  return (
    "id-" +
    Date.now().toString(36) +
    "-" +
    Math.random().toString(36).substr(2, 5)
  );
};

// Fully decode HTML entities by repeatedly decoding until the string stops changing.
export const fullyDecodeText = (text: string): string => {
  let prev = text;
  let current = text;
  while (true) {
    current = current
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'");
    if (current === prev) break;
    prev = current;
  }
  return current;
};

export const canonicalizeText = (text: string): string => {
  // Fully decode any existing HTML entities.
  const decoded = fullyDecodeText(text);
  // Remove any <script>...</script> blocks.
  let cleaned = decoded.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  // Collapse multiple whitespace into a single space.
  cleaned = cleaned.replace(/\s+/g, " ").trim();
  // encode special characters exactly once.
  return cleaned
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
};
