/* eslint-disable @typescript-eslint/no-explicit-any */

export function someValueIsNullish(...values: any[]) {
  const nullish: any[] = [undefined, null, ''];

  if(nullish.includes(values)) {
    return true;
  }

  console.log(values);

  return values.some(value => nullish.includes(value));
}
