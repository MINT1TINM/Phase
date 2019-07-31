<template>
  <v-app>
    <v-progress-linear
      :active="loading"
      :indeterminate="loading"
      absolute
      top
      color="deep-purple accent-4"
    ></v-progress-linear>
    <v-overlay :value="fullScreenLoading" :absolute="true" opacity="1" color="primary" style="z-index:9">
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
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "App",
  data: () => ({
    //
  }),
  computed: {
    ...mapGetters({
      loading: "system/loading",
      fullScreenLoading: "system/fullScreenLoading"
    })
  }
};
</script>
