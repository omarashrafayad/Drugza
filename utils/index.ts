export function formatDateToDMY (isoDate: string): string {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); 
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

export const formatOrderDate = (dateString: string | undefined | null) => {
  if (!dateString) return 'N/A';

  try {
    return new Intl.DateTimeFormat('en-EG', {
      timeZone: 'Africa/Cairo',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
    }).format(new Date(dateString));
  } catch (err) {
    console.error("Failed to format date:", err);
    return 'Invalid Date';
  }
};