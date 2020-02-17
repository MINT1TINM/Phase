<template>
  <v-card flat class="mb-2">
    <v-toolbar dense flat color="transparent">
      <v-toolbar-title class="subtitle-1 font-weight-black">{{
        processName
      }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="mr-0" small icon :to="`/process/${processID}/timeline`">
        <v-icon size="20">mdi-arrow-right</v-icon>
      </v-btn>
    </v-toolbar>
    <div style="height:calc(100vh - 200px);overflow:auto" color="transparent">
      <task-list :processID="processID"></task-list>
    </div>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import taskList from './task/TaskList.vue';

@Component({
  components: {
    'task-list': taskList
  }
})
export default class ProjectColumn extends Vue {
  @Prop({ default: 0 }) processID!: number;

  @Prop({ default: '' }) processName!: string;

  @Watch('processID')
  onProcessIDChanged() {
    console.log(this.processID);
  }
}
</script>

<style>
::-webkit-scrollbar {
  display: block;
}
</style>
