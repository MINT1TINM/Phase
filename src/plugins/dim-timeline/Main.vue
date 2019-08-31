<template>
  <v-layout fill-height style="overflow-x:hidden">
    <v-flex xs2 class="inner-sidebar-withoutpadding">
      <v-card height="75" class="transparent" flat></v-card>
      <v-list dense style="padding:0" class="transparent">
        <div v-for="(item,i) in taskList" :key="`tasklinelabel-${i}`">
          <v-list-item
            style="height:38px"
            @click="highlight(item)"
            :class="highlightedTaskID===item.id?`card-active-filled`:``"
          >
            <v-list-item-title>{{item.name}}</v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
        </div>
      </v-list>
    </v-flex>
    <v-flex xs10>
      <div style="padding:5px;overflow-x:auto;height:100%">
        <div style="display:flex">
          <div
            class="date-column"
            v-for="(item,i) in dateRange"
            :key="i"
            style="display:inline-block;vertical-align: top;"
          >
            <v-card outlined :width="columnWidth" style="height:60px">
              <v-container fluid style="padding:5px">
                <v-layout wrap align-center>
                  <v-flex
                    xs12
                    class="text-center subtitle-1 font-weight-black"
                  >{{item | format("MM")}}/{{item | format("dd")}}</v-flex>
                  <v-flex xs12 class="text-center caption font-weight-black">{{item | weekday()}}</v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </div>
        </div>
        <div class="line-area">
          <v-layout wrap style="display:inline-block">
            <div v-for="(item,i) in taskList" :key="`taskline-${i}`">
              <v-flex
                style="height:40px"
                align-center
                xs12
                wrap
                :class="highlightedTaskID===item.id?`card-active-filled`:``"
              >
                <v-card
                  class="my-1"
                  color="primary"
                  outlined
                  flat
                  height="33"
                  :width="item.length"
                  :style="`margin-left:${item.marginLeft}px;display:inline-block`"
                  @click="highlight(item)"
                  ripple
                >
                  <v-progress-linear absolute :value="item.percentage" color="white"></v-progress-linear>
                  <v-card-text
                    class="text-left white--text caption font-weight-black align-center"
                    style="padding:5px; margin-top:2px"
                  >{{item.name}}</v-card-text>
                </v-card>
              </v-flex>
            </div>
          </v-layout>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import "./style.css";

import {
  getDayCount,
  getAllDaysBetween,
  getTimeRange,
  getBarLength,
  parseTimeToDate
} from "./timeline.js";
export default {
  props: {
    columnWidth: Number,
    taskList: Array
  },
  data() {
    return {
      startDate: "",
      endDate: "",
      dateRange: [],
      highlightedTaskID: ""
    };
  },
  methods: {
    setBarLength() {
      for (const e of this.taskList) {
        const para = getBarLength(
          this.startDate,
          e.startDate.slice(0, 10),
          e.endDate.slice(0, 10),
          this.columnWidth
        );
        e.length = para.length;
        e.marginLeft = para.marginLeft;
        console.log(e.startDate);
      }
    },
    getTimeRange() {
      this.startDate = new Date();
      this.endDate = new Date();
      for (const e of this.taskList) {
        const taskStartDate = new Date(e.startDate);
        const taskEndDate = new Date(e.endDate);

        if (taskStartDate < new Date(this.startDate)) {
          this.startDate = e.startDate.slice(0, 10);
        }
        if (taskEndDate > new Date(this.endDate)) {
          this.endDate = e.endDate.slice(0, 10);
        }
      }
    },
    highlight(item) {
      console.log(item.id);
      this.highlightedTaskID = item.id;
    }
  },
  watch: {
    taskList() {
      this.getTimeRange();
      this.setBarLength();

      this.dateRange = getAllDaysBetween(this.startDate, this.endDate);
    }
  },
  mounted() {
    this.getTimeRange();
    this.setBarLength();
    this.dateRange = getAllDaysBetween(this.startDate, this.endDate);
  }
};
</script>

<style>
</style>
