import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";
import { scenarios } from "./scenarios";

const scenarioName = new URLSearchParams(window.location.search).get(
  "scenario"
) as unknown as keyof typeof scenarios;

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
const runtimeScenarios = scenarios[scenarioName] || [];

export const worker = setupWorker(...runtimeScenarios, ...handlers);
