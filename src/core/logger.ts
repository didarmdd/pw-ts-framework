export type LogLevel = "info" | "warn" | "error" | "debug";

export function log(level: LogLevel, message: string, meta?: unknown) {
  const prefix = `[${level.toUpperCase()}]`;
  if (meta) {
    // eslint-disable-next-line no-console
    console.log(prefix, message, meta);
    return;
  }
  // eslint-disable-next-line no-console
  console.log(prefix, message);
}
