import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import * as SwitchPrimitive from "@kobalte/core/switch";
import { cn } from "cn";
import { merge, omit } from "solid-js";

type SwitchProps = PolymorphicProps<
  "div",
  SwitchPrimitive.SwitchRootProps<"div">
> & {
  size?: "sm" | "default";
};

const Switch = (props: SwitchProps) => {
  const merged = merge(
    {
      size: "default",
    } satisfies Partial<SwitchProps>,
    props
  );

  const rest = omit(merged, "class", "size", "id", "style");

  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={merged.size}
      class={cn(
        "peer group/switch focus-within:border-ring focus-within:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:bg-primary not-data-checked:bg-input dark:not-data-checked:bg-input/80 relative inline-flex shrink-0 items-center rounded-full border border-transparent transition-all outline-none group-has-focus-visible/field-label:border-transparent group-has-focus-visible/field-label:ring-0 focus-within:ring-3 aria-invalid:ring-3 data-disabled:cursor-not-allowed data-disabled:opacity-50 data-[size=default]:h-[18.4px] data-[size=default]:w-8 data-[size=sm]:h-3.5 data-[size=sm]:w-6",
        merged.class
      )}
      style={merged.style}
      {...rest}
    >
      <SwitchPrimitive.Input
        data-slot="switch-input"
        class="peer sr-only"
        id={merged.id}
      />
      <SwitchPrimitive.Control
        data-slot="switch-control"
        class="absolute inset-0 flex cursor-pointer items-center rounded-full transition-colors after:absolute after:-inset-x-3 after:-inset-y-2 data-disabled:cursor-not-allowed"
      >
        <SwitchPrimitive.Thumb
          data-slot="switch-thumb"
          class="bg-background dark:data-checked:bg-primary-foreground dark:not-data-checked:bg-foreground pointer-events-none block rounded-full ring-0 transition-transform not-data-checked:translate-x-0 group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)]"
          style={merged.style}
        />
      </SwitchPrimitive.Control>
    </SwitchPrimitive.Root>
  );
};

export { Switch };
