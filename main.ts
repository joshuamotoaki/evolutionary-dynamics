import { simulate } from "./src/simulation.ts";

if (import.meta.main) {
  simulate(1000, 100, 0.5, 0.2, 0.2, 0.01, 10, 10);
}
