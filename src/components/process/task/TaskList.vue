<template>
  <v-container
    fluid
    grid-list-md
  >
    <transition
      appear
      appear-active-class="fade-up-enter"
    >
      <v-layout
        row
        wrap
      >
        <v-flex
          xs12
          v-for="(item, i) in taskList"
          :key="`task-${i}`"
        >
          <v-card
            v-if="$route.params.taskId==item.id"
            class="card-active"
            outlined 
            flat
            :to="`/dashboard/process/${processId}/task/${item.id}`"
          >
            <v-card-text class="body-2 text-uppercase text-active">{{item.name}}</v-card-text>
          </v-card>
          <v-card
            outlined
            flat
            v-else
            :to="`/dashboard/process/${processId}/task/${item.id}`"
          >
            <v-card-text class="body-2  text-uppercase">{{item.name}}</v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </transition>
  </v-container>
</template>

<script>
export default {
  props: {
    processId: Number
  },
  data() {
    return {
      selectedTasks: [],
      taskList: [
        {
          id: 1,
          name: "test"
        },
        {
          id: 2,
          name: "test 2"
        },
        {
          id: 1,
          name: "test"
        },
        {
          id: 1,
          name: "test"
        },
        {
          id: 1,
          name: "test"
        },
        {
          id: 1,
          name: "test"
        },
        {
          id: 1,
          name: "test"
        },
        {
          id: 1,
          name: "test"
        },
        {
          id: 1,
          name: "test"
        },
        {
          id: 1,
          name: "test"
        },
        {
          id: 1,
          name: "test"
        },
        {
          id: 1,
          name: "test"
        },
        {
          id: 1,
          name: "test"
        },
        {
          id: 1,
          name: "test"
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
