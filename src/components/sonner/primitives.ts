import { createSignal, onSettled } from "solid-js";

export function useIsDocumentHidden() {
  const [isDocumentHidden, setIsDocumentHidden] = createSignal(
    globalThis.document?.hidden ?? false
  );

  const callback = () => setIsDocumentHidden(document.hidden);

  onSettled(() => {
    // oxlint-disable-next-line typescript/strict-void-return
    document.addEventListener("visibilitychange", callback);

    return () => {
      // oxlint-disable-next-line typescript/strict-void-return
      document.removeEventListener("visibilitychange", callback);
    };
  });

  return isDocumentHidden;
}
