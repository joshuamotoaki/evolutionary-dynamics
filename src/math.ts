export const mean = (arr: number[]) =>
  arr.reduce((acc, x) => acc + x, 0) / arr.length;

export const stdDev = (arr: number[]) =>
  Math.sqrt(
    arr.reduce((acc, x) => acc + Math.pow(x - mean(arr), 2), 0) / arr.length
  );
