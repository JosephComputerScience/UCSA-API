// biome-ignore lint/complexity/noBannedTypes: <explanation>
type ObjectWithFunction = Record<string, unknown> & { [key: string]: Function };

export const autoBind = <T extends object>(instance: T) => {
  const proto = Object.getPrototypeOf(instance);
  const keys = [...Object.getOwnPropertyNames(proto), ...Object.keys(instance)];

  for (const key of keys) {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const val = (instance as any)[key];
    if (typeof val === "function" && key !== "constructor") {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      (instance as any)[key] = val.bind(instance);
    }
  }
};
