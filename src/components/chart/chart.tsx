import type { JSX } from "@solidjs/web";
import type { ChartTooltipBodyTarget, ChartValue } from "@tanstack/charts";
import { createChartRendererAdapter } from "@tanstack/charts/adapter/renderer";
import { renderChartSvg } from "@tanstack/charts/svg";
import { createSvgChartRenderer } from "@tanstack/charts/svg/renderer";
import {
  Show,
  createEffect,
  createMemo,
  createSignal,
  createUniqueId,
  onCleanup,
  onSettled,
  untrack,
} from "solid-js";

import { toHostOptions } from "./host-options";
import { TooltipBodyPortal } from "./tooltip";
import type { ChartProps } from "./types";

export function Chart<
  TDatum,
  TXValue extends ChartValue = ChartValue,
  TYValue extends ChartValue = ChartValue,
>(props: ChartProps<TDatum, TXValue, TYValue>): JSX.Element {
  const generatedId = createUniqueId();
  const generatedPrefix = `ts-chart-${generatedId.replaceAll(/[^a-zA-Z0-9_-]/gu, "")}`;

  const renderer = createMemo(() =>
    createSvgChartRenderer<TDatum, TXValue, TYValue>(
      props.renderSvg ?? renderChartSvg
    )
  );

  const [tooltipBodyTarget, setTooltipBodyTarget] =
    createSignal<ChartTooltipBodyTarget<TDatum, TXValue, TYValue> | null>(null);

  const options = () =>
    toHostOptions(props, {
      idPrefix: props.idPrefix ?? generatedPrefix,
      onTooltipBodyChange: (target) => {
        setTooltipBodyTarget(target);
      },
      renderer: renderer(),
    });

  const adapter = untrack(() => createChartRendererAdapter(options()));
  const initialMarkup = untrack(() => adapter.prerender());
  let container: HTMLDivElement | undefined;

  createEffect(options, (nextOptions) => {
    adapter.update(nextOptions);
  });
  onSettled(() => {
    if (container) {
      adapter.mount(container);
    }
  });
  onCleanup(() => {
    adapter.destroy();
  });

  const aspectRatio = () =>
    props.aspectRatio !== undefined &&
    Number.isFinite(props.aspectRatio) &&
    props.aspectRatio > 0
      ? props.aspectRatio
      : undefined;

  const height = () => {
    if (props.height !== undefined) {
      return `${props.height}px`;
    }

    return aspectRatio() === undefined ? "320px" : undefined;
  };

  return (
    <>
      <div
        class={["ts-chart-host", props.class]}
        style={{
          "aspect-ratio":
            props.height === undefined ? aspectRatio()?.toString() : undefined,
          height: height(),
          position: "relative",
          width: props.width === undefined ? "100%" : `${props.width}px`,
          ...props.style,
        }}
      >
        <div
          ref={(element) => {
            container = element;
          }}
          class="ts-chart-surface"
          style={{ height: "100%", width: "100%" }}
          innerHTML={initialMarkup}
        />
      </div>
      <Show when={props.renderTooltipBody} keyed>
        {(renderTooltipBody) => (
          <Show when={tooltipBodyTarget()}>
            {(target) => (
              <TooltipBodyPortal render={renderTooltipBody} target={target()} />
            )}
          </Show>
        )}
      </Show>
    </>
  );
}
