<template>
  <timeline
    :startDate="`10 6 2018`"
    :endDate="`10 20 2018`"
    :columnWidth="150"
    :taskList="taskList"
    style="height:calc(100vh - 120px)"
  ></timeline>
</template>

<script>
import timeline from "@/plugins/timeline/Index";
export default {
  components: {
    timeline: timeline
  },
  data() {
    return {
      taskList: [
        {
          startDate: "10 6 2018",
          endDate: "10 20 2018",
          color: "primary",
          name: "TEST"
        },
        {
          startDate: "10 8 2018",
          endDate: "10 9 2018",
          color: "primary",
          name: "TEST 2"
        }
      ]
    };
  },
  methods: {},
  mounted() {}
};
</script>

<style>
</style>
