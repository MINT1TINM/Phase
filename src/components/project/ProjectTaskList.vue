<template>
  <div style="height:calc(100vh - 113px)">
    <v-layout fill-height>
      <v-flex xs3 class="inner-sidebar-withoutpadding">
        <v-list>
          <v-list-item-group v-model="selectedTasks" multiple>
            <transition-group appear appear-active-class="fade-up-enter">
              <template v-for="(item,i) in taskList">
                <v-list-item
                  :key="`task-${i}`"
                  :to="`/dashboard/project/${$route.params.projectId}/task/${item.id}`"
                >
                  <v-list-item-action>
                    <v-checkbox color="primary"></v-checkbox>
                  </v-list-item-action>

                  <v-list-item-content>
                    <v-list-item-title>{{item.title}}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-divider v-if="i + 1 < taskList.length" :key="i"></v-divider>
              </template>
            </transition-group>
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
