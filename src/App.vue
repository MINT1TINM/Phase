<template>
  <v-app>
    <v-progress-linear
      :active="loading"
      :indeterminate="loading"
      absolute
      top
      color="deep-purple accent-4"
    ></v-progress-linear>
    <v-overlay
      :value="fullScreenLoading"
      :absolute="true"
      opacity="1"
      color="primary"
      style="z-index:9"
    >
      <v-card flat color="transparent">
        <v-container>
          <v-layout justify-center>
            <v-progress-circular indeterminate size="64"></v-progress-circular>
          </v-layout>
        </v-container>
        <v-card-text class="text-xs-center font-weight-black">
          <strong>Phase</strong> 正在加载数据
        </v-card-text>
      </v-card>
    </v-overlay>
    <router-view />

    <!-- app switcher -->
    <v-navigation-drawer v-model="appSwitcher" absolute temporary>
      <app-switcher style="height:cals(100vh - 48px);overflow:auto"></app-switcher>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import appSwitcher from "@/components/common/AppSwitcher";
export default {
  name: "App",
  components: {
    appSwitcher: appSwitcher
  },
  data: () => ({
    //
  }),
  computed: {
    ...mapGetters({
      loading: "system/loading",
      fullScreenLoading: "system/fullScreenLoading"
    }),
    appSwitcher: {
      get() {
        return this.$store.getters["system/appSwitcher"];
      },
      set(v) {
        this.$store.commit("system/toggleAppSwitcher", v);
      }
    }
  },
  methods: {
    ...mapMutations({
      toggleAppSwitcher: "system/toggleAppSwitcher"
    })
  },
  mounted() {}
};
</script>
