import { createEffect, createSignal, onSettled } from "solid-js";

import { Toggle } from "#components/ui/toggle.tsx";
import { MoonIcon } from "#icons/runeicons/normal/moon.tsx";
import { SunIcon } from "#icons/runeicons/normal/sun.tsx";

export function ThemeToggle() {
  let ref: HTMLDivElement;
  const [theme, setTheme] = createSignal<"light" | "dark">("light");

  const onClick = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  onSettled(() => {
    setTheme(
      document.documentElement.classList.contains("dark") ? "dark" : "light"
    );
  });

  createEffect(
    () => ({
      currentTheme: theme(),
    }),
    ({ currentTheme }) => {
      const isDark = currentTheme === "dark";
      document.documentElement.classList.toggle("dark", isDark);
    }
  );

  return (
    <Toggle
      aria-label="다크 모드"
      onClick={onClick}
      pressed={theme() === "dark"}
      size="icon"
    >
      <div
        aria-hidden="true"
        class="relative size-8 shrink-0 overflow-hidden"
        ref={ref!}
      >
        <div class="ease-spring1 absolute top-1 left-1 size-6 origin-[50%_44px] rotate-0 transition-transform duration-280 group-hover/toggle:-rotate-8 group-focus-visible/toggle:-rotate-8 motion-reduce:transition-none dark:-rotate-65 dark:group-hover/toggle:-rotate-46 dark:group-focus-visible/toggle:-rotate-46">
          <SunIcon class="size-6" />
          <span class="sr-only">라이트</span>
        </div>
        <div class="ease-spring1 absolute top-1 left-1 size-6 origin-[50%_44px] rotate-65 transition-transform duration-280 group-hover/toggle:rotate-46 group-focus-visible/toggle:rotate-46 motion-reduce:transition-none dark:rotate-0 dark:group-hover/toggle:rotate-8 dark:group-focus-visible/toggle:rotate-8">
          <MoonIcon class="size-6" />
          <span class="sr-only">다크</span>
        </div>
      </div>
    </Toggle>
  );
}
