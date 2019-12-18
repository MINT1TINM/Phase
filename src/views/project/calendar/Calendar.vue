<template>
  <v-layout fill-height>
    <v-flex>
      <v-toolbar flat dense>
        <v-btn outlined class="mr-4" @click="setToday">今日</v-btn>
        <v-btn fab text small @click="prev">
          <v-icon small>mdi-arrow-left</v-icon>
        </v-btn>
        <v-btn fab text small @click="next">
          <v-icon small>mdi-arrow-right</v-icon>
        </v-btn>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn-toggle dense v-model="type">
          <v-btn text @click="type = 'day'" value="day">日</v-btn>
          <v-btn text @click="type = 'week'" value="week">周</v-btn>
          <v-btn text @click="type = 'month'" value="month">月</v-btn>
        </v-btn-toggle>
      </v-toolbar>

      <v-sheet style="height:calc(100vh - 96px);overflow-y:auto">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :event-color="getEventColor"
          :events="fullTaskList"
          event-start="startDate"
          event-end="endDate"
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
          offset-x
        >
          <v-card elevation="10" min-width="350px">
            <v-toolbar dense flat color="transparent">
              <v-toolbar-title class="font-weight-black subtitle-1"
                >速览 {{ selectedEvent.name }}</v-toolbar-title
              >
              <v-spacer></v-spacer>
              <v-btn icon color="secondary" @click="selectedOpen = false">
                <v-icon size="20">mdi-close</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text
              >{{ selectedEvent.startDate }} 至
              {{ selectedEvent.endDate }}</v-card-text
            >
            <v-card-actions>
              <user-chip
                class="my-2"
                :userID="selectedEvent.userID"
              ></user-chip>
              <v-spacer></v-spacer>
              <v-btn
                rounded
                text
                :to="
                  `/process/${selectedEvent.processID}/task/${selectedEvent.id}`
                "
              >
                查看任务
                <v-icon size="20">mdi-arrow-right</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { VCalendar } from 'vuetify/lib';
import { namespace } from 'vuex-class';
import { ProcessTask } from '@/types/process';
import TaskService from '@/service/taskService';
import { App } from '@/types/system';

const processModule = namespace('process');
const projectModule = namespace('project');
const systemModule = namespace('system');

@Component
export default class Calendar extends Vue {
  public $refs!: {
    calendar: any;
  };

  @projectModule.Getter('projectMemberCache') private projectMemberCache: any;

  @processModule.Getter('fullTaskList') private fullTaskList!: ProcessTask[];

  @processModule.Getter('currentProcessIDList')
  private currentProcessIDList!: string[];

  @systemModule.Getter('appList') private appList!: App[];

  private today: string = new Date().toISOString().slice(0, 10);
  private focus: string = new Date().toISOString().slice(0, 10);
  private type: string = 'month';
  private typeToLabel = {
    month: '月视图',
    week: '周视图',
    day: '日视图'
  };
  private start = null;
  private end = null;
  private selectedEvent = {};
  private selectedElement = null;
  private selectedOpen: boolean = false;

  private viewDay({ date }: any) {
    this.focus = date;
    this.type = 'day';
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

  private getEventColor(event: any) {
    if (event.color) {
      return event.color;
    }
    return 'primary darken-1';
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

  private get title() {
    const { start, end } = this;
    if (!start || !end) {
      return '';
    }

    const startMonth = this.monthFormatter(start);
    const endMonth = this.monthFormatter(end);
    const suffixMonth = startMonth === endMonth ? '' : endMonth;

    const startYear = (start || { year: null }).year;
    const endYear = (end || { year: null }).year;
    const suffixYear = startYear === endYear ? '' : endYear;

    const startDay = `${(start || { day: null }).day}日`;
    const endDay = `${(end || { day: null }).day}日`;

    switch (this.type) {
      case 'month':
        return `${startMonth} ${startYear}`;
      case 'week':
      case 'day':
        return `${startMonth} ${startDay} ${startYear}`;
    }

    return '';
  }

  private get monthFormatter() {
    return this.$refs.calendar.getFormatter({
      timeZone: 'UTC',
      month: 'long'
    });
  }

  private async mounted() {
    console.log(this.$refs.calendar);
    await TaskService.getMultiProcessTaskList(this.currentProcessIDList);
  }
}
</script>
