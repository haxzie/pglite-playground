export const canModifyDatabase = (query: string): boolean => {
  // Convert the query to uppercase for case-insensitive matching
  const upperQuery = query.toUpperCase();

  // Define regex patterns for modification keywords
  const modificationPatterns = [
    /\b(INSERT|UPDATE|DELETE|MERGE)\b/,
    /\bALTER\s+TABLE\b/,
    /\b(ADD|DROP|MODIFY)\s+COLUMN\b/,
    /\bCREATE\s+(TABLE|INDEX)\b/,
    /\bDROP\s+(TABLE|INDEX)\b/,
    /\bTRUNCATE\b/,
    /\bRENAME\b/,
  ];

  // Check if any of the patterns match the query
  return modificationPatterns.some((pattern) => pattern.test(upperQuery));
};
