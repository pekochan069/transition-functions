import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import { Fill, Label, Root, Track, ValueLabel } from "@kobalte/core/progress";
import type {
  ProgressFillProps,
  ProgressLabelProps,
  ProgressRootProps,
  ProgressTrackProps,
  ProgressValueLabelProps,
} from "@kobalte/core/progress";
import { cn } from "cn";
import { omit } from "solid-js";

type ProgressTrackComponentProps = PolymorphicProps<
  "div",
  ProgressTrackProps<"div">
>;

const ProgressTrack = (props: ProgressTrackComponentProps) => {
  const rest = omit(props, "class");

  return (
    <Track
      data-slot="progress-track"
      class={cn(
        "bg-muted relative flex h-1 w-full items-center overflow-x-hidden rounded-full",
        props.class
      )}
      {...rest}
    />
  );
};

type ProgressIndicatorProps = PolymorphicProps<"div", ProgressFillProps<"div">>;

const ProgressIndicator = (props: ProgressIndicatorProps) => {
  const rest = omit(props, "class");

  return (
    <Fill
      data-slot="progress-indicator"
      class={cn(
        "bg-primary h-full w-(--kb-progress-fill-width) transition-all",
        props.class
      )}
      {...rest}
    />
  );
};

type ProgressLabelComponentProps = PolymorphicProps<
  "span",
  ProgressLabelProps<"span">
>;

const ProgressLabel = (props: ProgressLabelComponentProps) => {
  const rest = omit(props, "class");

  return (
    <Label
      data-slot="progress-label"
      class={cn("text-sm font-medium", props.class)}
      {...rest}
    />
  );
};

type ProgressValueProps = PolymorphicProps<
  "div",
  ProgressValueLabelProps<"div">
>;

const ProgressValue = (props: ProgressValueProps) => {
  const rest = omit(props, "class");

  return (
    <ValueLabel
      data-slot="progress-value"
      class={cn(
        "text-muted-foreground ml-auto text-sm tabular-nums",
        props.class
      )}
      {...rest}
    />
  );
};

type ProgressProps = PolymorphicProps<"div", ProgressRootProps<"div">>;

const ProgressRoot = (props: ProgressProps) => {
  const rest = omit(props, "class", "children");

  return (
    <Root
      data-slot="progress"
      class={cn("flex flex-wrap gap-3", props.class)}
      {...rest}
    >
      {props.children}
    </Root>
  );
};

const Progress = (props: ProgressProps) => {
  const rest = omit(props, "class", "children");

  return (
    <Root
      data-slot="progress"
      class={cn("flex flex-wrap gap-3", props.class)}
      {...rest}
    >
      {props.children}
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
    </Root>
  );
};

export {
  Progress,
  ProgressRoot,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
};
