export type Mods = Record<string, boolean | string>;

export function classNames(
  cls: string = "",
  mods: Mods = {},
  additional: Array<string | undefined> = [],
): string {
  return [
    cls,
    ...Object.entries(mods)
      .filter(([_, value]) => Boolean(value))
      .map(([className, value]) => className),
    ...additional.filter(Boolean),
  ].join(" ");
}
