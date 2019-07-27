<template>
  <div style="padding:5px 0;overflow-x:auto">
    <div style="display:inline-flex">
      <div
        class="date-column"
        v-for="(item,i) in dateRange"
        :key="i"
        style="display:inline-block;vertical-align: top;"
      >
        <v-card outlined :width="columnWidth" style="height:100px">
          <v-container fluid>
            <v-layout row wrap align-center>
              <v-flex xs12 class="text-center subtitle-1" style="padding:0">{{item | format("MM")}}</v-flex>
              <v-flex xs12 class="text-center headline font-weight-black">{{item | format("dd")}}</v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </div>
    </div>
    <div class="line-area">
      <v-card class="my-1" color="primary" flat height="20" width="100" style="margin-left:0"></v-card>
      <v-card class="my-1" color="grey" flat height="20" width="150" style="margin-left:0"></v-card>

      <v-card class="my-1" color="green" flat height="20" width="400" style="margin-left:100px"></v-card>
      <v-card class="my-1" color="grey" flat height="20" width="700" style="margin-left:100px"></v-card>
    </div>
  </div>
</template>

<script>
import dateHelper from "@/utils/DateHelper";
import "./timeline.css";
export default {
  props: {
    startDate: String,
    endDate: String,
    columnWidth: Number,
    taskList: Array
  },
  data() {
    return {
      dateRange: []
    };
  },
  methods: {},
  mounted() {
    this.dateRange = dateHelper.getAllDaysBetween(this.startDate, this.endDate);
  }
};
</script>

<style>
</style>
