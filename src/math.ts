export const mean = (arr: number[]) =>
  arr.reduce((acc, x) => acc + x, 0) / arr.length;

export const stdDev = (arr: number[]) =>
  Math.sqrt(
    arr.reduce((acc, x) => acc + Math.pow(x - mean(arr), 2), 0) / arr.length
  );

export const sem = (arr: number[]) => stdDev(arr) / Math.sqrt(arr.length);

export const roundTo = (n: number, decimalPlaces: number) =>
  Math.round(n * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
