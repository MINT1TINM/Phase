<template>
  <v-range-slider
    :max="max"
    :min="min"
    thumb-label="always"
    v-model="dateRange"
    :thumb-size="64"
    hide-details
    class="align-center text-center"
  >
    <template v-slot:thumb-label="props">
      <small class="font-weight-black">{{ props.value | format("yyyy") }}</small>
      <br />
      <small class="font-weight-black">{{ props.value | format("MM/dd") }}</small>
    </template>
  </v-range-slider>
</template>

<script>
export default {
  props: {
    range: Array
  },
  computed: {
    max() {
      return this.dateRange[1] + 15552000000;
    },
    min() {
      return this.dateRange[0] - 15552000000;
    },
    dateRange: {
      get() {
        return this.range;
      },
      set(v) {}
    }
  }
};
</script>

<style>
</style>
