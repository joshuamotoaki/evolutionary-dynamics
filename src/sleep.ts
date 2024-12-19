// sleep.ts
// A simulation of when sleep is beneficial
// (assuming that sleep provides benefits to yourself and your neighbors
// but increases the chance of death because you're vulnerable)
// see paper for more details

import { mean, stdDev, sem } from "./math.ts";

type Result = 0 | 1;
type Strategy = "A" | "S";

const calcPopulationStrategy = (nodes: Strategy[]): Strategy | null => {
  const firstStrategy = nodes[0];
  for (const node of nodes) {
    if (node !== firstStrategy) {
      return null;
    }
  }
  return firstStrategy;
};

const getNeighborIndices = (n: number, k: number, index: number) => {
  const neighbors: number[] = [];
  for (let i = 1; i <= k / 2; i++) {
    neighbors.push((index + i) % n);
    neighbors.push((index - i + n) % n);
  }
  return neighbors;
};

/**
 * Calculate the fixation probability of the sleep strategy
 * @param trials
 * @param n number of nodes
 * @param k number of neighbors per node
 * @param b benefit
 * @param lambda benefit multiplier for sleep nodes
 * @param alpha death multiplier for sleep nodes
 */
export const simulateSleep = (
  trials: number,
  n: number,
  k: number,
  b: number,
  lambda: number,
  alpha: number
) => {
  if (trials < 1) throw new Error("trials must be at least 1");
  if (k >= n) throw new Error("k must be less than n");
  if (k % 2 !== 0) throw new Error("k must be even");
  if (lambda < 0 || lambda > 1)
    throw new Error("lambda must be between 0 and 1");
  if (alpha < 0 || alpha > 1) throw new Error("alpha must be between 0 and 1");
  if (b < 0) throw new Error("b must be non-negative");

  const results: Result[] = [];

  while (trials--) {
    const nodes = new Array(n).fill("A" as Strategy);
    nodes[0] = "S";

    // Loop until all nodes are the same
    while (!calcPopulationStrategy(nodes)) {
      const numSleepers = nodes.filter((node) => node === "S").length;
      const sleeperDies =
        Math.random() <
        (alpha * numSleepers) / (alpha * numSleepers + n - numSleepers);

      const vacancyIndex = sleeperDies
        ? nodes.findIndex((node) => node === "S")
        : nodes.findIndex((node) => node === "A");

      const neighbors = getNeighborIndices(n, k, vacancyIndex);
      const fitnessTuples = neighbors.map((neighborIndex) => {
        const rawBenefit = getNeighborIndices(n, k, neighborIndex)
          .map((x) => (nodes[x] === "S" ? b * lambda : b))
          .reduce((a, b) => a + b, 0);

        const fitness =
          nodes[neighborIndex] === "S" ? rawBenefit * lambda : rawBenefit;

        return [nodes[neighborIndex], fitness] as [Strategy, number];
      });

      const sleepFitness = fitnessTuples
        .filter((tuple) => tuple[0] === "S")
        .reduce((acc, tuple) => acc + tuple[1], 0);

      const activeFitness = fitnessTuples
        .filter((tuple) => tuple[0] === "A")
        .reduce((acc, tuple) => acc + tuple[1], 0);

      const sleeperWins =
        Math.random() < sleepFitness / (sleepFitness + activeFitness);

      nodes[vacancyIndex] = sleeperWins ? "S" : "A";
    }
    results.push(nodes[0] === "S" ? 1 : 0);
  }

  return {
    trials: results.length,
    fixationProbability: mean(results),
    standardDeviation: stdDev(results),
    standardError: sem(results),
  };
};
