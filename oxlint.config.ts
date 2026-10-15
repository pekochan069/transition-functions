import { defineConfig } from "oxlint";
import antiSlop from "ultracite/oxlint/anti-slop";
import astro from "ultracite/oxlint/astro";
import core from "ultracite/oxlint/core";
import shadcn from "ultracite/oxlint/shadcn";

export default defineConfig({
  env: core.env,
  extends: [core, astro, shadcn, antiSlop],
  ignorePatterns: core.ignorePatterns,
  jsPlugins: shadcn.jsPlugins,
  options: { typeAware: true },
  overrides: [
    {
      files: ["./src/components/chart/tooltip.tsx"],
      rules: {
        "anti-slop/no-runtime-typeof": "off",
      },
    },
    {
      files: ["./src/components/chart/*.tsx"],
      rules: {
        "shadcn/no-unknown-classes": "off",
      },
    },
    {
      files: ["./src/components/ui/*.tsx"],
      rules: {
        "anti-slop/require-safety-comment-for-type-assertion": "off",
        "sort-keys": "off",
      },
    },
    {
      files: ["**.tsx"],
      rules: {
        "no-unassigned-vars": "off",
        "typescript/no-non-null-assertion": "off",
      },
    },
    {
      files: ["**.astro"],
      rules: {
        "unicorn/prefer-module": "off",
      },
    },
  ],
  rules: {
    "func-style": "off",
    "shadcn/no-inline-styles": "off",
    "unicorn/custom-error-definition": "off",
  },
});
