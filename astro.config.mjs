// @ts-check
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
// @ts-expect-error lib type error
import solidNext from "astro-solid-next";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  // oxlint-disable-next-line typescript/no-unsafe-call
  integrations: [react(), solidNext()],

  vite: {
    plugins: [tailwindcss()],
  },
});
