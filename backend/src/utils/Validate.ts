/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
export function someValueIsNullish(...values: any[]) {
  const nullish = [null, undefined];

  // @ts-ignore
  if(nullish.includes(values)) {
    return true;
  }

  return values.some(value => nullish.includes(value));
}

export function someValueIsNull(...values: any[]) {
  if(values === null) {
    return true;
  }

  return values.some(value => value === null);
}
