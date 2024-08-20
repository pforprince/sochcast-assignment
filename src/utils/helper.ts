export function getTimeFromSeconds(seconds: number) {
  seconds = Math.ceil(seconds);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return (
    (hours ? `${hours}:` : "") +
    `${minutes}:${secs.toString().padStart(2, "0")}`
  );
}
