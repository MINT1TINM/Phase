<template>
  <div>
    <v-card>
      <v-toolbar dense flat>
        <v-btn outlined class="mr-4" @click="setToday">
          今日
        </v-btn>
        <v-btn fab text small @click="prev">
          <v-icon size="20">mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn fab text small @click="next">
          <v-icon size="20">mdi-chevron-right</v-icon>
        </v-btn>
        <!-- <v-toolbar-title>{{ title }}</v-toolbar-title> -->
        <v-spacer></v-spacer>
        <v-btn-toggle dense v-model="type">
          <v-btn text @click="type = 'day'" value="day">日</v-btn>
          <v-btn text @click="type = 'week'" value="week">周</v-btn>
          <v-btn text @click="type = 'month'" value="month">月</v-btn>
        </v-btn-toggle>
      </v-toolbar>

      <v-sheet height="750">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="fullTaskList"
          event-start="startDate"
          event-end="endDate"
          :event-margin-bottom="3"
          :event-color="getEventColor"
          :now="today"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @change="updateRange"
        ></v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card elevation="10" min-width="100px">
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
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { ProcessTask } from '@/types/process';
import TaskService from '@/service/taskService';

const processModule = namespace('process');
const projectModule = namespace('project');
const systemModule = namespace('system');

@Component
export default class ProjectDashboardCalendar extends Vue {
  $refs!: {
    calendar: any;
  };

  @projectModule.Getter('projectMemberCache') projectMemberCache: any;

  @processModule.Getter('fullTaskList') fullTaskList!: ProcessTask[];

  @processModule.Getter('currentProcessIDList')
  currentProcessIDList!: string[];

  focus = '';
  type = 'month';
  typeToLabel = {
    month: 'Month',
    week: 'Week',
    day: 'Day',
    '4day': '4 Days'
  };
  start = new Date().toISOString().slice(0, 10);
  end = new Date().toISOString().slice(0, 10);
  today = new Date().toISOString().slice(0, 10);
  selectedEvent = {};
  selectedElement = null;
  selectedOpen = false;

  get monthFormatter() {
    return this.$refs.calendar.getFormatter({
      timeZone: 'UTC',
      month: 'long'
    });
  }

  viewDay({ date }: any) {
    this.focus = date;
    this.type = 'day';
  }

  getEventColor(event: any) {
    return event.color || 'primary darken-1';
  }
  setToday() {
    this.focus = this.today;
  }
  prev() {
    this.$refs.calendar.prev();
  }
  next() {
    this.$refs.calendar.next();
  }
  showEvent({ nativeEvent, event }: any) {
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

  updateRange({ start, end }: any) {
    this.start = start;
    this.end = end;
  }

  formatDate(a: Date, withTime: string) {
    return withTime
      ? `${a.getFullYear()}-${a.getMonth() +
          1}-${a.getDate()} ${a.getHours()}:${a.getMinutes()}`
      : `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()}`;
  }

  async mounted() {
    await TaskService.getMultiProcessTaskList(this.currentProcessIDList);
  }
}
</script>

<style scoped></style>
