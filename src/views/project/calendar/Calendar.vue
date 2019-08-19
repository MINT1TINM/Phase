<template>
  <v-layout fill-height>
    <v-flex>
      <v-toolbar flat color="white">
        <v-btn outlined class="mr-4" @click="setToday">今日</v-btn>
        <v-btn fab text small @click="prev">
          <v-icon small>mdi-arrow-left</v-icon>
        </v-btn>
        <v-btn fab text small @click="next">
          <v-icon small>mdi-arrow-right</v-icon>
        </v-btn>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn-toggle v-model="type" mandatory>
          <v-btn color="white" @click="type = 'day'" value="day">日</v-btn>
          <v-btn color="white" @click="type = 'week'" value="week">周</v-btn>
          <v-btn color="white" @click="type = 'month'" value="month">月</v-btn>
        </v-btn-toggle>
      </v-toolbar>

      <v-sheet style="height:100%">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :event-margin-bottom="3"
          :now="today"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
        ></v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          full-width
          offset-x
        >
          <v-card color="grey lighten-4" min-width="350px" flat>
            <v-toolbar :color="selectedEvent.color" dark>
              <v-btn icon>
                <v-icon>edit</v-icon>
              </v-btn>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>favorite</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>more_vert</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <span v-html="selectedEvent.details"></span>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="secondary" @click="selectedOpen = false">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { VCalendar } from "vuetify/lib";

@Component
export default class Calendar extends Vue {
  public $refs!: {
    calendar: any;
  };

  private today: string = "2019-01-08";
  private focus: string = "2019-01-08";
  private type: string = "month";
  private typeToLabel = {
    month: "月视图",
    week: "周视图",
    day: "日视图"
  };
  private start = null;
  private end = null;
  private selectedEvent = {};
  private selectedElement = null;
  private selectedOpen: boolean = false;
  private events = [];

  private viewDay({ date }: any) {
    this.focus = date;
    this.type = "day";
  }
  private getEventColor(event: any) {
    return event.color;
  }
  private setToday() {
    this.focus = this.today;
  }
  private prev() {
    this.$refs.calendar.prev();
  }
  private next() {
    this.$refs.calendar.next();
  }
  private showEvent({ nativeEvent, event }: any) {
    const open = () => {
      this.selectedEvent = event;
      this.selectedElement = nativeEvent.target;
      setTimeout(() => (this.selectedOpen = true), 10);
    };

    if (this.selectedOpen) {
      this.selectedOpen = false;
      setTimeout(open, 10);
    } else {
      open();
    }

    nativeEvent.stopPropagation();
  }
  private updateRange({ start, end }: any) {
    this.start = start;
    this.end = end;
  }
  private nth(d: number) {
    return d > 3 && d < 21
      ? "th"
      : ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"][d % 10];
  }

  private get title() {
    const { start, end } = this;
    if (!start || !end) {
      return "";
    }

    const startMonth = this.monthFormatter(start);
    const endMonth = this.monthFormatter(end);
    const suffixMonth = startMonth === endMonth ? "" : endMonth;

    const startYear = (start || { year: null }).year;
    const endYear = (end || { year: null }).year;
    const suffixYear = startYear === endYear ? "" : endYear;

    const startDay =
      (start || { day: null }).day + this.nth((start || { day: 0 }).day);
    const endDay =
      (end || { day: null }).day + this.nth((end || { day: 0 }).day);

    switch (this.type) {
      case "month":
        return `${startMonth} ${startYear}`;
      case "week":
      case "day":
        return `${startMonth} ${startDay} ${startYear}`;
    }

    return "";
  }

  private get monthFormatter() {
    return this.$refs.calendar.getFormatter({
      timeZone: "UTC",
      month: "long"
    });
  }

  private mounted() {
    console.log(this.$refs.calendar);
  }
}
</script>


