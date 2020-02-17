<template>
  <div>
    <v-toolbar dense flat class="navbar">
      <v-tabs v-model="tab" background-color="transparent">
        <v-tab :to="`/process/${$route.params.processID}/timeline`"
          >时间轴</v-tab
        >
        <v-tab :to="`/process/${$route.params.processID}/task`">任务清单</v-tab>
        <v-tab :to="`/process/${$route.params.processID}/settings`"
          >过程设置</v-tab
        >
      </v-tabs>
      <v-spacer></v-spacer>
      <v-btn icon @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import taskList from '@/components/project/process/task/TaskList.vue';

@Component({
  components: {
    'task-list': taskList
  }
})
export default class ProcessBoard extends Vue {
  tab: number = 0;

  close() {
    this.$router.push({ path: '/process' });
  }
}
</script>
