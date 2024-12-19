# Sleep, Sociology, and Evolutionary Dynamics on Graphs

Final project for COS597C — Theory of Natural Algorithms (Fall 2024) at Princeton University. View the paper at [report.pdf](report.pdf).

There's 3 parts to the paper. First, I overview the work done in Ohtsuki et al. (2006) to introduce evolutionary dynamics on graphs from a game-theoretic perspective. This overview also provides an analytical solution to a game, but for my original work, I focus on numerical computer simulations. Second, I do a quick literature review of related works (mostly done by Ohtsuki and/or Nowak) and discuss the implications of these works. Finally, I present my original work on including sleep into the evolutionary dynamics. I show that sleep can be a dominant strategy in some contexts despite it having drawbacks for an individual. Additionally, I provide suggestions for future work, especially with regards to bridging the gap between experimental data-first analysis and mathematical model-first theory.

This report is in no way comprehensive, but eventually, I might try to expand on it as a full paper on theoretical sleep dynamics.

## Running the code

The individual simulation units are in the `modules` directory. To run the simulations, modify `main.ts` to include the desired parameters and then run `deno run main.ts` in the root directory. This will output the results to the console. It will most likely work with NodeJS as well, but I have not tested it.

## License

This project is licensed under the BSD 3-Clause License. See the [LICENSE](LICENSE) file for more information.
