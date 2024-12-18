import { simulate } from "./src/simulation.ts";

if (import.meta.main) {
  simulate(100, 100, 0.1, 0.1, 0.2, 0.01, 10, 10);
}
