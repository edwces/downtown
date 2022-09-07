export const cls = (...args: any[]): string => {
  return args.reduce((previous, current) => previous + " " + (current || ""));
};
