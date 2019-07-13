<template>
  <div>
    <v-toolbar flat color="transparent">
      <h4>简单了解</h4>
      <v-spacer></v-spacer>
      <v-btn icon :to="`/dashboard/project/${projectId}`">
        <v-icon>mdi-arrow-right</v-icon>
      </v-btn>
    </v-toolbar>
    <v-list two-line style="height:calc(100vh - 162px);overflow:scroll" color="transaprent">
      <v-list-item-group>
        <template v-for="(item, index) in taskList">
          <v-list-item
            :key="`task-${index}`"
            :to="`/dashboard/project/${projectId}/task/${item.id}`"
          >
            <template v-slot:default="{ active, toggle }">
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
                <v-list-item-subtitle class="grey--text" v-text="item.summary"></v-list-item-subtitle>
              </v-list-item-content>
            </template>
          </v-list-item>
        </template>
      </v-list-item-group>
    </v-list>
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
          title: "test",
          summary: "test"
        }
      ]
    };
  },
  methods: {}
};
</script>

<style>
</style>
