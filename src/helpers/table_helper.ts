// For Pagination
export const determinePages = (total = 0, current = 0) => {
  if (total < 4) {
    return Array.from({ length: total }, (_, i) => i);
  }
  const offset = (() => {
    if (current == 0) return 4;
    if (total - current > 3) return 3;
    return total - current;
  })();
  return Array.from({ length: 4 }, (_, i) => current - (4 - offset) + i);
};
