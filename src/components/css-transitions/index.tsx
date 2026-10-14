import { createSignal, createStore } from "solid-js";

type TransitionTimingFunctionType = "cubic-bezier" | "linear";

type Preset = "ease-in" | "ease-out" | "ease-in-out" | "custom";

interface CubicBezier {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export function CssTransition() {
  const [transitionTimingFunctionType, setTransitionTimingFunctionType] =
    createSignal<TransitionTimingFunctionType>("cubic-bezier");

  const [cubicBezierPreset, setCubicBezierPreset] =
    createSignal<Preset>("ease-in");

  const [cubicBezier, setCubicBezier] = createStore<CubicBezier>({
    x1: 0.1,
    x2: 0.2,
    y1: 0.7,
    y2: 0.9,
  });

  const transitionTimingFunction = () => {
    if (transitionTimingFunctionType() === "cubic-bezier") {
      return `cubic-bezier(${cubicBezier.x1}, ${cubicBezier.y1}, ${cubicBezier.x2}, ${cubicBezier.y2})`;
    }

    return "linear";
  };

  const [rotate, setRotate] = createSignal(0);

  return (
    <div>
      <div>
        <button
          class="bg-primary border-border size-16 rounded-lg border transition-all"
          style={{
            rotate: `${rotate()}deg`,
            "transition-timing-function": transitionTimingFunction(),
          }}
          onClick={() => {
            if (rotate() === 0) {
              setRotate(45);
            } else {
              setRotate(0);
            }
          }}
        />
      </div>
    </div>
  );
}
