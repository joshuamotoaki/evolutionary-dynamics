// anxiety.ts
// A simulation of social anxiety in the face of murderers
// Unused in the paper but I thought about it a bit

import { mean, sem, stdDev, roundTo } from "./math.ts";

/**
 * Simulate anxiety experiment
 * @param trials The number of trials to run
 * @param n The number of nodes in the graph
 * @param pAnxiety The probability of a node being an anxiety node
 * @param vpNormal The probability of a normal node connecting
 * @param vpAnxiety The probability of an anxiety node connecting
 * @param neighborMoney The amount of money a node gives to its neighbors
 * @param livingCost The cost of living per round
 */
export const simulateAnxiety = (
  trials: number,
  n: number,
  pAnxiety: number,
  vpNormal: number,
  vpAnxiety: number,
  pAssassination: number,
  neighborMoney: number,
  livingCost: number
) => {
  const avgAnxietyLifespans = [];
  const avgNormalLifespans = [];

  const numWithAnxiety = Math.floor(n * pAnxiety);
  console.log("Number of nodes with anxiety:", numWithAnxiety);

  while (trials--) {
    // console.log("Trial", trials);
    // Undirected adjacency matrix
    const adjMatrix = new Array(n).fill(0).map(() => new Array(n).fill(0));
    const hasAnxiety = new Array(n)
      .fill(false)
      .map((_, i) => i < numWithAnxiety);
    const isAlive = new Array(n).fill(true);
    const money = new Array(n).fill(neighborMoney * n);

    // console.log(
    //   "Number of nodes with anxiety:",
    //   hasAnxiety.filter((x) => x).length
    // );

    let round = 0;
    let anxietyDeaths = 0;
    let normalDeaths = 0;

    const anxietyDeathRounds = [];
    const normalDeathRounds = [];

    // console.log("round,alive,anxietyDeaths,normalDeaths");
    const printStats = () => {
      console.log(
        round, // Round number
        isAlive.filter((x) => x).length, // Number of nodes alive
        anxietyDeaths, // Number of anxiety nodes that died
        normalDeaths // Number of normal nodes that died
      );
    };

    while (isAlive.filter((x) => x).length > 1) {
      round++;
      // Fill the adjacency matrix
      for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
          if (hasAnxiety[i] || hasAnxiety[j]) {
            adjMatrix[i][j] = Math.random() < vpAnxiety ? 1 : 0;
          } else {
            adjMatrix[i][j] = Math.random() < vpNormal ? 1 : 0;
          }
        }
      }

      // Give money to neighbors
      for (let i = 0; i < n; i++) {
        if (!isAlive[i]) continue;
        const numNeighbors = adjMatrix[i].reduce((acc, x) => acc + x, 0);
        const payout = numNeighbors * neighborMoney;
        money[i] += payout;
      }

      // Pick a assassin at random and kill their neighbors
      let assassin: number;
      do {
        assassin = Math.floor(Math.random() * n);
      } while (!isAlive[assassin]);

      for (let i = 0; i < n; i++) {
        if (adjMatrix[assassin][i] && isAlive[i]) {
          isAlive[i] = false;
          if (hasAnxiety[i]) {
            anxietyDeaths++;
            anxietyDeathRounds.push(round);
          } else {
            normalDeaths++;
            normalDeathRounds.push(round);
          }
        }
      }

      // Pay living costs
      for (let i = 0; i < n; i++) {
        if (isAlive[i]) {
          money[i] = Math.floor(money[i] / 2);
          money[i] -= livingCost;
        }
      }

      // Kill off nodes with no money
      for (let i = 0; i < n; i++) {
        if (money[i] <= 0 && isAlive[i]) {
          if (Math.random() < pAssassination) {
            isAlive[i] = false;
            if (hasAnxiety[i]) {
              anxietyDeaths++;
              anxietyDeathRounds.push(round);
            } else {
              normalDeaths++;
              normalDeathRounds.push(round);
            }
          }

          //   printStats();
        }
      }
    }

    avgAnxietyLifespans.push(
      anxietyDeathRounds.reduce((acc, x) => acc + x, 0) /
        anxietyDeathRounds.length
    );

    avgNormalLifespans.push(
      normalDeathRounds.reduce((acc, x) => acc + x, 0) /
        normalDeathRounds.length
    );
  }

  const ROUND_TO = 2;
  console.log("Mean anxiety:", roundTo(mean(avgAnxietyLifespans), ROUND_TO));
  console.log(
    "StdDev anxiety:",
    roundTo(stdDev(avgAnxietyLifespans), ROUND_TO)
  );
  console.log("Sem anxiety:", roundTo(sem(avgAnxietyLifespans), ROUND_TO));

  console.log("Mean normal:", roundTo(mean(avgNormalLifespans), ROUND_TO));
  console.log("StdDev normal:", roundTo(stdDev(avgNormalLifespans), ROUND_TO));
  console.log("Sem normal:", roundTo(sem(avgNormalLifespans), ROUND_TO));
};
