<template>
  <v-card class="mb-2">
    <v-toolbar dense flat color="transparent">
      <v-toolbar-title class="subtitle-1 font-weight-black">{{processName}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="mr-0" small icon :to="`/project/process/${processID}/timeline`">
        <v-icon size="20">mdi-arrow-right</v-icon>
      </v-btn>
    </v-toolbar>
    <div style="height:calc(100vh - 210px);overflow:auto" color="transparent">
      <task-list :processID="processID"></task-list>
    </div>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import taskList from "./task/TaskList.vue";
import { Prop, Watch } from "vue-property-decorator";

@Component({
  components: {
    "task-list": taskList
  }
})
export default class ProjectColumn extends Vue {
  @Prop({ default: 0 }) public processID!: number;
  @Prop({ default: "" }) public processName!: string;

  @Watch("processID")
  private onProcessIDChanged() {
    console.log(this.processID);
  }
}
</script>

<style>
</style>
