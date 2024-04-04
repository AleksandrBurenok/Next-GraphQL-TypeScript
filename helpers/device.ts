export const isMobile = (userAgent: string) =>
  /iPhone|iPad|iPod|Android|Mobile/i.test(userAgent);
