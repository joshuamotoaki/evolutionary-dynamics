import { simulate } from "./src/simulation.ts";

if (import.meta.main) {
  simulate(100, 100, 0.5, 0.1, 0.1, 1, 10, 10);
}
