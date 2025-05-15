<script setup lang="ts">
import {onMounted,ref,defineProps} from 'vue';
import JsBarcode from "jsbarcode";

const props = defineProps({
  value: [String, Number],
  format: String,
  width: [String, Number],
  height: [String, Number],
  displayValue: {
    type: [String, Boolean],
    default: true,
  },
  text: [String, Number],
  fontOptions: String,
  font: String,
  textAlign: String,
  textPosition: String,
  textMargin: [String, Number],
  fontSize: [String, Number],
  background: String,
  lineColor: String,
  margin: [String, Number],
  marginTop: [String, Number],
  marginBottom: [String, Number],
  marginLeft: [String, Number],
  marginRight: [String, Number],
  flat: Boolean,
  ean128: [String, Boolean],
  elemenTag: {
    type: String,
    default: "svg",
    validator: (value: string) => ["canvas", "svg", "img"].includes(value),
  },
});
const barcodeEl = ref<HTMLElement | null>(null);
onMounted(() => {
  const settings: Record<string, any> = {
    format: props.format,
    width: props.width,
    height: props.height,
    displayValue: props.displayValue,
    text: props.text,
    fontOptions: props.fontOptions,
    font: props.font,
    textAlign: props.textAlign,
    textPosition: props.textPosition,
    textMargin: props.textMargin,
    fontSize: props.fontSize,
    background: props.background,
    lineColor: props.lineColor,
    margin: props.margin,
    marginTop: props.marginTop,
    marginBottom: props.marginBottom,
    marginLeft: props.marginLeft,
    marginRight: props.marginRight,
    flat: props.flat,
    ean128: props.ean128,
  };

  removeUndefinedProps(settings);
  function removeUndefinedProps(obj: Record<string, any>) {
    Object.keys(obj).forEach((key) => obj[key] === undefined && delete obj[key]);
  }

  if (barcodeEl.value) {
    JsBarcode(barcodeEl.value, String(props.value), settings);
  }
});



</script>

<template>
  <component :is="elemenTag" ref="barcodeEl"></component>
</template>

<style scoped>

</style>