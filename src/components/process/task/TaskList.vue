<template>
  <v-container fluid grid-list-md>
    <transition appear appear-active-class="fade-up-enter">
      <v-layout row wrap>
        <v-flex xs12 v-if="$route.params.processId" style="display:flex">
          <v-text-field
            hide-details
            class="text-field-semidense"
            outlined
            label="+ 新任务"
            v-model="newTaskName"
          ></v-text-field>
          <v-btn
            v-if="newTaskName"
            @click="createTask"
            style="margin-left:10px;height:100%"
            color="primary"
            outlined
          >
            <v-icon size="18">mdi-plus</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs12 v-for="(item, i) in taskList" :key="`task-${i}`">
          <v-card
            v-if="$route.params.taskId==item.id"
            class="card-active"
            outlined
            flat
            :to="`/dashboard/process/${processId}/task/${item.id}`"
          >
            <v-card-text class="body-2 text-uppercase text-active">{{item.name}}</v-card-text>
          </v-card>
          <v-hover v-else v-slot:default="{hover}">
            <v-card
              :elevation="hover ? 6 : 0"
              outlined
              flat
              :to="`/dashboard/process/${processId}/task/${item.id}`"
            >
              <v-card-text class="body-2 text-uppercase">{{item.name}}</v-card-text>
            </v-card>
          </v-hover>
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
      newTaskName: "",
      taskList: [
        {
          id: 1,
          name: "test"
        },
        {
          id: 2,
          name: "test 2"
        }
      ]
    };
  },
  methods: {
    createTask() {
      if (this.newTaskName) {
      }
    }
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
