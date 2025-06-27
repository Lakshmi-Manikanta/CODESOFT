// Format a date as "DD MMM YYYY" (e.g., "20 Jun 2025")
export const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

// Check if a date is past
export const isOverdue = (dateStr) => {
  return new Date(dateStr) < new Date();
};
