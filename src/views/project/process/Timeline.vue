<template>
  <dim-timeline
    :startDate="`10 6 2018`"
    :endDate="`10 20 2018`"
    :columnWidth="150"
    :taskList="taskList"
    style="height:calc(100vh - 120px)"
  ></dim-timeline>
</template>

<script>
export default {
  components: {

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
