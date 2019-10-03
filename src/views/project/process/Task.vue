<template>
  <v-layout style="height:calc(100vh - 96px)">
    <v-flex xs3 class="inner-sidebar-withoutpadding" style="overflow-y:auto">
      <task-list @func="getKey" :processID="processID"></task-list>
    </v-flex>
    <v-flex xs9>
      <router-view v-if="$route.params.taskID" :key="activeTask"></router-view>

      <v-layout class="inner-sidebar-withoutpadding" v-else align-center justify-center>
        <h3>请选择或新建任务</h3>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import taskList from "@/components/project/process/task/TaskList.vue";

@Component({
  components: {
    "task-list": taskList
  }
})
export default class Task extends Vue {
  public activeTask: string = "";

  private get processID() {
    return this.$route.params.processID;
  }

  private getKey(data: any) {
    this.activeTask = data;
  }
}
</script>
