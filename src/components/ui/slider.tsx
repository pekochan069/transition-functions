import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import {
  Slider as SliderPrimitive,
  useSliderContext,
} from "@kobalte/core/slider";
import type {
  SliderFillProps,
  SliderRootProps,
  SliderThumbProps,
  SliderTrackProps,
} from "@kobalte/core/slider";
import { cn } from "cn";
import {
  createEffect,
  createMemo,
  createSignal,
  flush,
  merge,
  omit,
  Repeat,
} from "solid-js";

type SliderTrackComponentProps = PolymorphicProps<
  "div",
  SliderTrackProps<"div">
>;

const SliderTrack = (props: SliderTrackComponentProps) => {
  const rest = omit(props, "class", "children");

  const context = useSliderContext();

  return (
    <SliderPrimitive.Track
      data-slot="slider-track"
      data-orientation={context.state.orientation()}
      class={cn(
        "bg-muted relative grow overflow-hidden rounded-full select-none data-[orientation=horizontal]:h-1 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1",
        props.class
      )}
      {...rest}
    >
      {props.children}
    </SliderPrimitive.Track>
  );
};

type SliderFillComponentProps = PolymorphicProps<"div", SliderFillProps<"div">>;

const SliderFill = (props: SliderFillComponentProps) => {
  const rest = omit(props, "class");

  const context = useSliderContext();

  return (
    <SliderPrimitive.Fill
      data-slot="slider-range"
      data-orientation={context.state.orientation()}
      class={cn(
        "bg-primary absolute select-none data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
        props.class
      )}
      {...rest}
    />
  );
};

type SliderThumbComponentProps = PolymorphicProps<
  "span",
  SliderThumbProps<"span">
>;

const SliderThumb = (props: SliderThumbComponentProps) => {
  const rest = omit(props, "class", "ref");
  const context = useSliderContext();
  const [thumbRef, setThumbRef] = createSignal<HTMLSpanElement>();

  // Kobalte's initial setup can run before the thumb has a collection index.
  createEffect(
    () => ({
      index: context.thumbs().findIndex((thumb) => thumb.ref() === thumbRef()),
      disabled: context.state.isDisabled(),
    }),
    ({ index, disabled }) => {
      if (index >= 0) {
        context.state.setThumbEditable(index, !disabled);
      }
    }
  );

  return (
    <SliderPrimitive.Thumb
      ref={[setThumbRef, props.ref]}
      data-slot="slider-thumb"
      class={cn(
        "border-ring ring-ring/50 z-10 block size-3 shrink-0 rounded-full border bg-white transition-[color,box-shadow] select-none after:absolute after:-inset-2 hover:ring-3 focus-visible:ring-3 focus-visible:outline-hidden active:ring-3 data-disabled:pointer-events-none data-disabled:opacity-50",
        props.class
      )}
      {...rest}
    >
      <SliderPrimitive.Input />
    </SliderPrimitive.Thumb>
  );
};

type SliderProps = PolymorphicProps<"div", SliderRootProps<"div">>;

const Slider = (props: SliderProps) => {
  const merged = merge(
    { minValue: 0, maxValue: 100 } satisfies Partial<SliderProps>,
    props
  );

  const rest = omit(merged, "class", "defaultValue", "onChange", "value");

  const defaultValue = createMemo(
    () => merged.defaultValue ?? [merged.minValue, merged.maxValue]
  );

  const values = createMemo(() => merged.value ?? defaultValue());

  return (
    <SliderPrimitive
      data-slot="slider"
      defaultValue={defaultValue()}
      value={merged.value}
      onChange={(nextValues) => {
        merged.onChange?.(nextValues);
        flush();
      }}
      class={cn(
        "relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-40 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        merged.class
      )}
      {...rest}
    >
      <SliderTrack>
        <SliderFill />
      </SliderTrack>
      <Repeat count={values().length}>{() => <SliderThumb />}</Repeat>
    </SliderPrimitive>
  );
};

export { Slider };
