import { simulateSleep } from "./modules/sleep.ts";

const outfile = "output.csv";

if (import.meta.main) {
  const TRIALS = 100;
  const N = 100;
  const B = 1;

  const kValues = [2, 4, 6, 8, 10];
  const lambdaValues = [1.1, 1.5, 2, 5, 10, 20, 50, 100, 200, 500];
  const alphaValues = [1.1, 1.5, 2, 5, 10, 20, 50, 100, 200, 500];

  Deno.writeTextFileSync(outfile, "k,lambda,alpha,fixation,stdDev,sem\n");

  for (const k of kValues) {
    for (const lambda of lambdaValues) {
      for (const alpha of alphaValues) {
        const res = simulateSleep(TRIALS, N, k, B, lambda, alpha);
        Deno.writeTextFileSync(
          outfile,
          `${k},${lambda},${alpha},${res.fixationProbability},${res.standardDeviation},${res.standardError}\n`,
          { append: true }
        );
      }
    }
  }
}
