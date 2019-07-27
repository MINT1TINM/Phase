<template>
  <timeline
    :startDate="`10 6 2018`"
    :endDate="`10 20 2018`"
    :columnWidth="150"
    style="height:calc(100ch - 108px)"
  ></timeline>
</template>

<script>
import timeline from "@/plugins/timeline/Index";
export default {
  components: {
    timeline: timeline
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>

<style>
</style>
