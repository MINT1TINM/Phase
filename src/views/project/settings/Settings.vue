<template>
  <div style="height:calc(100vh - 113px)">
    <v-layout fill-height>
      <v-flex xs3 class="inner-sidebar-withoutpadding">
        <v-list color="transparent" dense shaped>
          <v-list-item-group color="primary">
            <transition-group appear appear-active-class="fade-up-enter">
              <div v-for="(item, i) in settingsItems" :key="i">
                <v-subheader class="mt-3" v-if="item.title">{{item.title}}</v-subheader>
                <v-list-item v-else :to="`/dashboard/project/${projectId}/settings/#${item.route}`">
                  <v-list-item-icon>
                    <v-icon v-text="item.icon"></v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.text"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </div>
            </transition-group>
          </v-list-item-group>
        </v-list>
      </v-flex>
      <v-flex xs9>
        
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      settingsItems: [
        { text: "信息", icon: "mdi-information-outline", route: "info" },
        { text: "通知", icon: "mdi-bell-outline", route: "notification" },
        { text: "操作", icon: "mdi-settings-outline", route: "action" }
      ]
    };
  },
  computed: {
    projectId: function() {
      return Number(this.$route.params.projectId);
    },
    settingItem: function() {
      return this.$route.hash.slice(1);
    }
  },

  mounted() {}
};
</script>

<style>
</style>
