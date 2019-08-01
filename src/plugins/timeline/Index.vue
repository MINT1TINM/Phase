<template>
  <div style="padding:5px 0;overflow-x:auto">
    <div style="display:inline-flex">
      <div
        class="date-column"
        v-for="(item,i) in dateRange"
        :key="i"
        style="display:inline-block;vertical-align: top;"
      >
        <v-card outlined :width="columnWidth" style="height:80px">
          <v-container fluid>
            <v-layout row wrap align-center>
              <v-flex xs12 class="text-center subtitle-1" style="padding:0">{{item | format("MM")}}</v-flex>
              <v-flex xs12 class="text-center headline font-weight-black">{{item | format("dd")}}</v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </div>
    </div>
    <div class="line-area" style="display:inline-flex">
      <v-layout wrap>
        <v-flex xs12 wrap v-for="(item,i) in taskList" :key="`taskline-${i}`">
          <v-card
            class="my-1"
            color="primary"
            flat
            :width="item.length"
            :style="`margin-left:${item.marginLeft}px;display:inline-block`"
            ripple
          >
            <v-card-text class="text-left white--text caption font-weight-black" style="padding:5px">{{item.name}}</v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
import "./style.css";
import {
  getDayCount,
  getAllDaysBetween,
  getTimeRange,
  getBarLength
} from "./timeline";
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
  methods: {
    setBarLength() {
      for (let i = 0; i < this.taskList.length; i++) {
        let e = this.taskList[i];
        const para = getBarLength(
          this.startDate,
          e.startDate,
          e.endDate,
          this.columnWidth
        );
        e.length = para.length;
        e.marginLeft = para.marginLeft;
        console.log(e.marginLeft);
      }
      console.log(this.taskList);
    }
  },
  mounted() {
    this.dateRange = getAllDaysBetween(this.startDate, this.endDate);
    this.setBarLength();
  }
};
</script>

<style>
</style>
