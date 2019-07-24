<template>
  <v-container fluid grid-list-md>
    <transition appear appear-active-class="fade-up-enter">
      <v-layout row wrap>
        <v-flex xs12 v-for="(item, i) in taskList" :key="`task-${i}`">
          <v-card :to="`/dashboard/project/${projectId}/task/${item.id}`">
            <v-card-text class="body-2 font-weight-black black--text text-uppercase">{{item.title}}</v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </transition>
  </v-container>
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
