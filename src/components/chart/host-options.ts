import type {
  ChartRenderer,
  ChartRendererHostOptions,
  ChartRendererRenderContext,
  ChartTooltipBodyTarget,
  ChartValue,
} from "@tanstack/charts";

import type { ChartProps } from "./types";

export function toHostOptions<
  TDatum,
  TXValue extends ChartValue,
  TYValue extends ChartValue,
>(
  props: ChartProps<TDatum, TXValue, TYValue>,
  host: {
    readonly idPrefix: string;
    readonly renderer: ChartRenderer<TDatum, TXValue, TYValue>;
    readonly onTooltipBodyChange: (
      target: ChartTooltipBodyTarget<TDatum, TXValue, TYValue> | null
    ) => void;
  }
): ChartRendererHostOptions<TDatum, TXValue, TYValue> {
  const {
    class: _class,
    style: _style,
    renderSvg: _renderSvg,
    renderTooltipBody,
    onRender,
    ...options
  } = props;

  const handleRender = onRender
    ? (context: ChartRendererRenderContext<TDatum, TXValue, TYValue>): void => {
        const element =
          context.surface.defaultElement ?? context.surface.element;

        const SvgElement =
          context.container.ownerDocument.defaultView?.SVGSVGElement;

        if (!SvgElement || !(element instanceof SvgElement)) {
          throw new TypeError("Expected the SVG chart surface.");
        }

        onRender({
          container: context.container,
          interaction: context.interaction,
          scene: context.scene,
          surface: context.surface,
          svg: element,
        });
      }
    : undefined;

  return {
    ...options,
    idPrefix: host.idPrefix,
    onRender: handleRender,
    onTooltipBodyChange: renderTooltipBody
      ? host.onTooltipBodyChange
      : undefined,
    renderer: host.renderer,
  };
}
