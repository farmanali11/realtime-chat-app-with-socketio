// ✅ Format message timestamp to HH:MM (24-hour format)
export function formatMessageTime(date) {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",    // Ensure 2-digit hour (e.g., 08, 17)
    minute: "2-digit",  // Ensure 2-digit minute (e.g., 01, 45)
    hour12: false       // Use 24-hour format (e.g., 13:05 instead of 1:05 PM)
  });
}
