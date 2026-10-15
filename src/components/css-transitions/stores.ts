import { createStore } from "solid-js";

import type { CubicBezier } from "./types";

export const [cubicBezier, setCubicBezier] = createStore<CubicBezier>({
  x1: 0.87,
  x2: 0,
  y1: 0.13,
  y2: 1,
});
