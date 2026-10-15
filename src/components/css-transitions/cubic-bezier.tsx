import { defineChart, lineY } from "@tanstack/charts";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { createMemo } from "solid-js";

import { Button } from "#components/ui/button.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "#components/ui/dropdown-menu.tsx";
import { Label } from "#components/ui/label.tsx";
import { Slider } from "#components/ui/slider.tsx";

import { Chart } from "../chart";
import { cubicBezier, setCubicBezier } from "./stores";

function applyPreset(x1: number, y1: number, x2: number, y2: number) {
  setCubicBezier((state) => {
    state.x1 = x1;
    state.y1 = y1;
    state.x2 = x2;
    state.y2 = y2;
  });
}

function CubicBezierPreset() {
  return (
    <div>
      <Label for="cubic-bezier-preset">Preset</Label>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button>Load Preset</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="max-h-48">
          <DropdownMenuItem
            onSelect={() => {
              applyPreset(0, 0, 1, 1);
            }}
          >
            Linear
          </DropdownMenuItem>

          <DropdownMenuGroup>
            <DropdownMenuLabel>Basic</DropdownMenuLabel>
            <DropdownMenuItem
              onSelect={() => {
                applyPreset(0.25, 0.1, 0.25, 1);
              }}
            >
              Ease
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => {
                applyPreset(0.42, 0, 1, 1);
              }}
            >
              Ease In
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => {
                applyPreset(0, 0, 0.58, 1);
              }}
            >
              Ease Out
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => {
                applyPreset(0.42, 0, 0.58, 1);
              }}
            >
              Ease In Out
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuGroup>
            <DropdownMenuLabel>Sine</DropdownMenuLabel>
            <DropdownMenuItem
              onSelect={() => {
                applyPreset(0.12, 0, 0.39, 0);
              }}
            >
              Ease Sine In
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => {
                applyPreset(0.61, 1, 0.88, 1);
              }}
            >
              Ease Sine Out
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => {
                applyPreset(0.37, 0, 0.63, 1);
              }}
            >
              Ease Sine In Out
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuGroup>
            <DropdownMenuLabel>Quad</DropdownMenuLabel>
            <DropdownMenuItem
              onSelect={() => {
                applyPreset(0.11, 0, 0.5, 0);
              }}
            >
              Ease Quad In
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => {
                applyPreset(0.5, 1, 0.89, 1);
              }}
            >
              Ease Quad Out
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => {
                applyPreset(0.45, 0, 0.55, 1);
              }}
            >
              Ease Quad In Out
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuGroup>
            <DropdownMenuLabel>Cubic</DropdownMenuLabel>
            <DropdownMenuItem
              onSelect={() => {
                applyPreset(0.32, 0, 0.67, 0);
              }}
            >
              Ease Cubic In
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => {
                applyPreset(0.33, 1, 0.68, 1);
              }}
            >
              Ease Cubic Out
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => {
                applyPreset(0.65, 0, 0.35, 1);
              }}
            >
              Ease Cubic In Out
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuGroup>
            <DropdownMenuLabel>Quart</DropdownMenuLabel>
            <DropdownMenuItem
              onSelect={() => {
                applyPreset(0.5, 0, 0.75, 0);
              }}
            >
              Ease Quart In
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => {
                applyPreset(0.25, 1, 0.5, 1);
              }}
            >
              Ease Quart Out
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => {
                applyPreset(0.76, 0, 0.24, 1);
              }}
            >
              Ease Quart In Out
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuGroup>
            <DropdownMenuLabel>Quint</DropdownMenuLabel>
            <DropdownMenuItem
              onSelect={() => {
                applyPreset(0.64, 0, 0.78, 0);
              }}
            >
              Ease QUint In
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => {
                applyPreset(0.22, 1, 0.36, 1);
              }}
            >
              Ease Quint Out
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => {
                applyPreset(0.83, 0, 0.17, 1);
              }}
            >
              Ease Quint In Out
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuGroup>
            <DropdownMenuLabel>Expo</DropdownMenuLabel>
            <DropdownMenuItem
              onSelect={() => {
                applyPreset(0.7, 0, 0.84, 0);
              }}
            >
              Ease Expo In
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => {
                applyPreset(0.16, 1, 0.3, 1);
              }}
            >
              Ease Expo Out
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => {
                applyPreset(0.87, 0, 0.13, 1);
              }}
            >
              Ease Expo In Out
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuGroup>
            <DropdownMenuLabel>Circ</DropdownMenuLabel>
            <DropdownMenuItem
              onSelect={() => {
                applyPreset(0.55, 0, 1, 0.45);
              }}
            >
              Ease Circ In
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => {
                applyPreset(0, 0.55, 0.45, 1);
              }}
            >
              Ease Circ Out
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => {
                applyPreset(0.85, 0, 0.15, 1);
              }}
            >
              Ease Circ In Out
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuGroup>
            <DropdownMenuLabel>Back</DropdownMenuLabel>
            <DropdownMenuItem
              onSelect={() => {
                applyPreset(0.36, 0, 0.66, -0.56);
              }}
            >
              Ease Back In
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => {
                applyPreset(0.34, 1.56, 0.64, 1);
              }}
            >
              Ease Back Out
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => {
                applyPreset(0.68, -0.6, 0.32, 1.6);
              }}
            >
              Ease Back In Out
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function CubicBezierSliders() {
  return (
    <div class="flex gap-4">
      <div class="flex items-center gap-4">
        <Slider
          value={[cubicBezier.x1]}
          onChange={([x1]) => {
            setCubicBezier((state) => {
              state.x1 = x1;
            });
          }}
          minValue={-2}
          maxValue={2}
          step={0.01}
          orientation="vertical"
        />
        <div class="flex flex-col items-start gap-1">
          <span class="font-mono font-semibold">x1</span>
          <input
            class="no-spinner w-11"
            type="number"
            min={-2}
            max={2}
            step={0.01}
            value={cubicBezier.x1}
            onChange={(e) => {
              setCubicBezier((state) => {
                state.x1 = Number(e.currentTarget.value);
              });
            }}
          />
        </div>
      </div>
      <div class="flex items-center gap-4">
        <Slider
          value={[cubicBezier.y1]}
          onChange={([y1]) => {
            setCubicBezier((state) => {
              state.y1 = y1;
            });
          }}
          minValue={-2}
          maxValue={2}
          step={0.01}
          orientation="vertical"
        />
        <div class="flex flex-col items-start gap-1">
          <span class="font-mono font-semibold">y1</span>
          <input
            class="no-spinner w-11"
            type="number"
            min={-2}
            max={2}
            step={0.01}
            value={cubicBezier.y1}
            onChange={(e) => {
              setCubicBezier((state) => {
                state.y1 = Number(e.currentTarget.value);
              });
            }}
          />
        </div>
      </div>
      <div class="flex items-center gap-4">
        <Slider
          value={[cubicBezier.x2]}
          onChange={([x2]) => {
            setCubicBezier((state) => {
              state.x2 = x2;
            });
          }}
          minValue={-2}
          maxValue={2}
          step={0.01}
          orientation="vertical"
        />
        <div class="flex flex-col items-start gap-1">
          <span class="font-mono font-semibold">x2</span>
          <input
            class="no-spinner w-11"
            type="number"
            min={-2}
            max={2}
            step={0.01}
            value={cubicBezier.x2}
            onChange={(e) => {
              setCubicBezier((state) => {
                state.x2 = Number(e.currentTarget.value);
              });
            }}
          />
        </div>
      </div>
      <div class="flex items-center gap-4">
        <Slider
          value={[cubicBezier.y2]}
          onChange={([y2]) => {
            setCubicBezier((state) => {
              state.y2 = y2;
            });
          }}
          minValue={-2}
          maxValue={2}
          step={0.01}
          orientation="vertical"
        />
        <div class="flex flex-col items-start gap-1">
          <span class="font-mono font-semibold">y2</span>
          <input
            class="no-spinner w-11"
            type="number"
            min={-2}
            max={2}
            step={0.01}
            value={cubicBezier.y2}
            onChange={(e) => {
              setCubicBezier((state) => {
                state.y2 = Number(e.currentTarget.value);
              });
            }}
          />
        </div>
      </div>
    </div>
  );
}

function CubicBezierChart() {
  const rows = createMemo(() =>
    Array.from({ length: 1001 }, (_, index) => {
      const t = index / 1000;
      const u = 1 - t;

      return {
        x:
          3 * u * u * t * cubicBezier.x1 +
          3 * u * t * t * cubicBezier.x2 +
          t ** 3,
        y:
          3 * u * u * t * cubicBezier.y1 +
          3 * u * t * t * cubicBezier.y2 +
          t ** 3,
      };
    })
  );

  const cubicBezierChartDefinition = createMemo(() => {
    const chart = defineChart({
      margin: 32,
      marks: [
        lineY(rows(), {
          points: false,
          x: "x",
          y: "y",
        }),
      ],
      scales: {
        x: {
          scale: scaleLinear,
        },
        y: {
          scale: scaleLinear,
        },
      },
    });

    return chart;
  });

  return (
    <Chart
      definition={cubicBezierChartDefinition()}
      ariaLabel="cubic-bezier chart"
      height={320}
      width={400}
    />
  );
}

export function CubicBezier() {
  return (
    <div class="flex flex-col gap-4">
      <CubicBezierPreset />
      <div class="flex gap-16">
        <CubicBezierSliders />
        <CubicBezierChart />
      </div>
    </div>
  );
}
