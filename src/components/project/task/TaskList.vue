<template>
  <div>
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <template v-for="(item, i) in taskList">
          <v-flex xs12 :key="`task-${i}`">
            <v-card :to="`/dashboard/project/${projectId}/task/${item.id}`">
              <v-card-text
                class="body-2 font-weight-black black--text text-uppercase"
              >{{item.title}}</v-card-text>
            </v-card>
          </v-flex>
        </template>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  props: {
    projectId: Number
  },
  data() {
    return {
      selectedTasks: [],
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
  watch: {
    selectedTasks: function() {
      console.log(this.selectedTasks);
    }
  },
  mounted() {}
};
</script>

<style>
</style>
