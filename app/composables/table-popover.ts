import { onClickOutside } from "@vueuse/core";

const tablePopover = ref<{
  reference: HTMLElement | undefined;
  open: boolean;
  value?: string;
  mode?: "click" | "hover";
}>({
  reference: undefined,
  open: false,
  value: undefined,
  mode: undefined
});

export const useTablePopover = () => {
  const onPopover = (event?: PointerEvent, text?: string, mode: "click" | "hover" = "hover") => {
    if (mode === "hover" && event?.pointerType === "touch") return;
    if (event) tablePopover.value.reference = event.currentTarget as HTMLElement;
    if (text) tablePopover.value.value = text;
    if (mode === "click" && text) {
      tablePopover.value.open = true;
      tablePopover.value.mode = "click";
    }
    else if (tablePopover.value.mode !== "click") {
      tablePopover.value.open = !!text;
      if (text) tablePopover.value.mode = "hover";
    }
  };

  onClickOutside(() => tablePopover.value.reference, () => {
    if (tablePopover.value.mode === "click" && tablePopover.value.open) {
      tablePopover.value.open = false;
      tablePopover.value.mode = undefined;
    }
  });

  return computed(() => ({
    options: tablePopover.value,
    handlers: (text?: string) => ({
      pointerenter: (e: PointerEvent) => onPopover(e, text),
      pointerleave: () => onPopover(),
      click: (e: PointerEvent) => onPopover(e, text, "click")
    })
  }));
};
