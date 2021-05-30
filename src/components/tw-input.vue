<template>
  <div class="tw-input-root" v-bind="parentProps">
    <label class="label" :style="labelStyle">{{ label }}</label>
    <input
      :class="['tw-input', !!error ? 'error' : ''].join(' ')"
      v-bind="props"
      @focus="focus"
      @blur="blur"
      ref="inputRef"
      v-model="inputVal"
    />
    <label v-if="error" class="error-message"> {{ error.message }}</label>
  </div>
</template>

<script>
export default {
  props: ["label", "props", "value", "error", "parentProps"],
  data() {
    return {
      labelStyle: "",
    };
  },
  mounted: function () {
    if (this.$refs["inputRef"].value.length > 0) this.focus();
    else this.blur();
  },
  watch: {
    value: function (val) {
      if (val.length > 0) this.focus();
      else this.blur();
    },
  },
  computed: {
    inputVal: {
      get() {
        return this.value;
      },
      set(val) {
        return this.$emit("input", val);
      },
    },
  },
  methods: {
    blur() {
      if (this.$refs["inputRef"].value.length <= 0)
        this.labelStyle = "transform: translate(15px,50px); opacity: 0.7;";
    },
    focus() {
      this.labelStyle = "transform: translateY(0) scale(0.8)";
    },
  },
};
</script>
