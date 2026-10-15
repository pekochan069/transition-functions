import { createSignal, Show } from "solid-js";

import { Button } from "#components/ui/button.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "#components/ui/dropdown-menu.tsx";
import { Input } from "#components/ui/input.tsx";
import { Label } from "#components/ui/label.tsx";
import {
  ProgressIndicator,
  ProgressRoot,
  ProgressTrack,
} from "#components/ui/progress.tsx";
import { Switch } from "#components/ui/switch.tsx";

import { CubicBezier } from "./cubic-bezier";
import { cubicBezier } from "./stores";

type TransitionTimingFunctionType = "cubic-bezier" | "linear";

export function CssTransition() {
  const [transitionTimingFunctionType, _] =
    createSignal<TransitionTimingFunctionType>("cubic-bezier");

  const [duration, setDuration] = createSignal(200);

  const transitionTimingFunction = () => {
    if (transitionTimingFunctionType() === "cubic-bezier") {
      return `cubic-bezier(${cubicBezier.x1}, ${cubicBezier.y1}, ${cubicBezier.x2}, ${cubicBezier.y2})`;
    }

    return "linear";
  };

  const [rotate1, setRotate1] = createSignal(0);
  const [rotate2, setRotate2] = createSignal(0);
  const [rotate3, setRotate3] = createSignal(0);
  const [rotate4, setRotate4] = createSignal(0);

  const [progress, setProgress] = createSignal(0);

  return (
    <div class="grid place-content-center gap-16">
      <Show when={transitionTimingFunctionType() === "cubic-bezier"}>
        <CubicBezier />
      </Show>
      <div class="space-y-1">
        <Label for="duration-input">Duration(ms)</Label>
        <Input
          id="duration-input"
          value={duration()}
          onChange={(e) => {
            setDuration(Number(e.currentTarget.value));
          }}
          type="number"
          inputmode="decimal"
          min={0}
        />
      </div>
      <div class="flex flex-col items-center justify-center gap-8">
        <div class="flex gap-4">
          <button
            id="rotate-45"
            class="bg-primary border-border size-16 rounded-lg border transition-all hover:scale-110"
            style={{
              rotate: `${rotate1()}deg`,
              "transition-duration": `${duration()}ms`,
              "transition-timing-function": transitionTimingFunction(),
            }}
            onClick={() => {
              setRotate1((prev) => prev + 45);
            }}
          >
            <span class="text-primary-foreground font-semibold">45&deg;</span>
          </button>
          <button
            id="rotate-90"
            class="bg-primary border-border size-16 rounded-lg border transition-all hover:scale-110"
            style={{
              rotate: `${rotate2()}deg`,
              "transition-duration": `${duration()}ms`,
              "transition-timing-function": transitionTimingFunction(),
            }}
            onClick={() => {
              setRotate2((prev) => prev + 90);
            }}
          >
            <span class="text-primary-foreground font-semibold">90&deg;</span>
          </button>
          <button
            id="rotate-180"
            class="bg-primary border-border size-16 rounded-lg border transition-all hover:scale-110"
            style={{
              rotate: `${rotate3()}deg`,
              "transition-duration": `${duration()}ms`,
              "transition-timing-function": transitionTimingFunction(),
            }}
            onClick={() => {
              setRotate3((prev) => prev + 180);
            }}
          >
            <span class="text-primary-foreground font-semibold">180&deg;</span>
          </button>
          <button
            id="rotate-360"
            class="bg-primary border-border size-16 rounded-lg border transition-all hover:scale-110"
            style={{
              rotate: `${rotate4()}deg`,
              "transition-duration": `${duration()}ms`,
              "transition-timing-function": transitionTimingFunction(),
            }}
            onClick={() => {
              setRotate4((prev) => prev + 360);
            }}
          >
            <span class="text-primary-foreground font-semibold">360&deg;</span>
          </button>
        </div>

        <button
          class="bg-primary border-border h-16 w-32 rounded-lg border transition-all hover:scale-105 active:scale-95"
          style={{
            "transition-duration": `${duration()}ms`,
            "transition-timing-function": transitionTimingFunction(),
          }}
        >
          <span class="text-primary-foreground font-semibold">Click</span>
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button>Dropdown Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            style={{
              "animation-duration": `${duration()}ms`,
              "animation-timing-function": transitionTimingFunction(),
            }}
          >
            <DropdownMenuItem>Item 1</DropdownMenuItem>
            <DropdownMenuItem>Item 2</DropdownMenuItem>
            <DropdownMenuItem>Item 3</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div class="flex gap-2">
          <Switch
            id="switch-example"
            style={{
              "animation-duration": `${duration()}ms`,
              "animation-timing-function": transitionTimingFunction(),
              "transition-duration": `${duration()}ms`,
              "transition-timing-function": transitionTimingFunction(),
            }}
          />
          <Label for="switch-example">Switch</Label>
        </div>
        <div class="flex w-full items-center gap-4">
          <ProgressRoot class="w-full" value={progress()}>
            <ProgressTrack>
              <ProgressIndicator
                style={{
                  "animation-duration": `${duration()}ms`,
                  "animation-timing-function": transitionTimingFunction(),
                  "transition-duration": `${duration()}ms`,
                  "transition-timing-function": transitionTimingFunction(),
                }}
              />
            </ProgressTrack>
          </ProgressRoot>
          <Button
            onClick={() => {
              setProgress((prev) => (prev === 0 ? 100 : 0));
            }}
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  );
}
