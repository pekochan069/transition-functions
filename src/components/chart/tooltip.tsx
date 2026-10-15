import { Portal } from "@solidjs/web";
import type { JSX } from "@solidjs/web";
import type {
  ChartTooltipBodyTarget,
  ChartTooltipContent,
  ChartValue,
} from "@tanstack/charts";
import { For, Show, untrack } from "solid-js";

import type { ChartProps, ChartTooltipBodyRenderContext } from "./types";

function TooltipSwatch(props: { readonly color: string }): JSX.Element {
  return (
    <span
      class="ts-chart-tooltip__swatch"
      aria-hidden="true"
      style={{
        background: props.color,
        "border-radius": "0.15rem",
        "box-shadow": "inset 0 0 0 1px rgb(0 0 0/.12)",
        display: "block",
        height: "0.55rem",
        width: "0.55rem",
      }}
    />
  );
}

function StructuredTooltipBody(props: {
  readonly content: ChartTooltipContent;
}): JSX.Element {
  return (
    <>
      <Show when={props.content.title}>
        <div
          class="ts-chart-tooltip__title"
          style={{
            "align-items": "center",
            display: "flex",
            "font-weight": 650,
            gap: "0.4rem",
            "margin-bottom": props.content.rows.length ? "0.3rem" : 0,
          }}
        >
          <Show when={props.content.color}>
            {(color) => <TooltipSwatch color={color()} />}
          </Show>
          {props.content.title}
        </div>
      </Show>
      <Show when={props.content.rows.length}>
        <div class="ts-chart-tooltip__rows" aria-hidden="true">
          <For each={props.content.rows}>
            {(row) => (
              <div
                class="ts-chart-tooltip__row"
                data-active={String(row.active === true)}
                style={{
                  "align-items": "center",
                  background:
                    row.active === true
                      ? "var(--ts-chart-tooltip-active-row-background, color-mix(in srgb, currentColor 12%, transparent))"
                      : undefined,
                  "border-radius":
                    row.active === true
                      ? "var(--ts-chart-tooltip-active-row-border-radius, .2rem)"
                      : undefined,
                  "box-shadow":
                    row.active === true
                      ? "var(--ts-chart-tooltip-active-row-shadow, 0 0 0 2px color-mix(in srgb, currentColor 12%, transparent))"
                      : undefined,
                  "column-gap": "0.4rem",
                  display: "grid",
                  "font-weight":
                    row.active === true
                      ? "var(--ts-chart-tooltip-active-row-font-weight, 700)"
                      : undefined,
                  "grid-template-columns": "0.55rem minmax(0,1fr) auto",
                }}
              >
                <Show when={row.color} fallback={<span />}>
                  {(color) => <TooltipSwatch color={color()} />}
                </Show>
                <span>{row.label}</span>
                <span
                  style={{
                    "font-variant-numeric": "tabular-nums",
                    "text-align": "right",
                    "white-space": "nowrap",
                  }}
                >
                  {row.value}
                </span>
              </div>
            )}
          </For>
        </div>
      </Show>
    </>
  );
}

function DefaultTooltipBody(props: {
  readonly content: ChartTooltipContent | string;
}): JSX.Element {
  const structuredContent = () =>
    typeof props.content === "string" ? undefined : props.content;

  return (
    <Show when={structuredContent()} fallback={props.content}>
      {(content) => <StructuredTooltipBody content={content()} />}
    </Show>
  );
}

export function TooltipBodyPortal<
  TDatum,
  TXValue extends ChartValue,
  TYValue extends ChartValue,
>(props: {
  readonly render: NonNullable<
    ChartProps<TDatum, TXValue, TYValue>["renderTooltipBody"]
  >;
  readonly target: ChartTooltipBodyTarget<TDatum, TXValue, TYValue>;
}): JSX.Element {
  const defaultBody = <DefaultTooltipBody content={props.target.content} />;

  const context: ChartTooltipBodyRenderContext<TDatum, TXValue, TYValue> = {
    get content() {
      return props.target.content;
    },
    defaultBody,
    get dismiss() {
      return props.target.dismiss;
    },
    get pinned() {
      return props.target.pinned;
    },
    get points() {
      return props.target.points;
    },
    get primaryPoint() {
      return props.target.primaryPoint;
    },
  };

  const body = untrack(() => props.render(context));

  return <Portal mount={props.target.element}>{body}</Portal>;
}
