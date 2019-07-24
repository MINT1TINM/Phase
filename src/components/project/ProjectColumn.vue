<template>
  <div>
    <v-toolbar flat color="transparent">
      <v-toolbar-title class="subtitle-1 font-weight-black">简单了解</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn style="margin-right:-20px" icon :to="`/dashboard/project/${projectId}`">
        <v-icon>mdi-arrow-right</v-icon>
      </v-btn>
    </v-toolbar>
    <div style="height:calc(100vh - 153px);overflow:scroll" color="transparent">
      <v-container grid-list-md>
        <v-layout row wrap>
          <template v-for="(item, i) in taskList">
            <v-flex xs12 :key="`task-${i}`">
              <v-card :to="`/dashboard/project/${projectId}/task/${item.id}`">
                <v-card-text class="body-2 font-weight-black black--text text-uppercase">{{item.title}}</v-card-text>
              </v-card>
            </v-flex>
            <v-divider v-if="i + 1 < taskList.length" :key="i"></v-divider>
          </template>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    projectId: Number
  },
  data() {
    return {
      taskList: [
        {
          id: 1,
          title: "test"
        },
        {
          id: 2,
          title: "test 2"
        }
      ]
    };
  },
  methods: {}
};
</script>

<style>
</style>
