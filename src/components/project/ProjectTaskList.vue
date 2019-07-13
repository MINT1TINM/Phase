<template>
  <div style="height:calc(100vh - 113px)">
    <v-layout fill-height>
      <v-flex xs3 class="inner-sidebar-withoutpadding">
        <v-list two-line>
          <v-list-item-group v-model="selectedTasks" multiple>
            <v-list-item
              v-for="(item,i) in taskList"
              :key="`task-${i}`"
              :to="`/dashboard/project/${projectId}/task/${item.id}`"
            >
              <v-list-item-action>
                <v-checkbox color="primary"></v-checkbox>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>{{item.title}}</v-list-item-title>
                <v-list-item-subtitle>{{item.summary}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-flex>
      <v-flex xs9>
        <router-view></router-view>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedTasks: [],
      taskList: [
        {
          id: 1,
          title: "test",
          summary: "test"
        }
      ]
    };
  },
  watch: {
    selectedTasks: function() {
      console.log(this.selectedTasks);
    }
  }
};
</script>

<style>
</style>
