<template>
  <v-app>
    <v-progress-linear
      :active="loading"
      :indeterminate="loading"
      absolute
      top
      color="deep-purple accent-4"
    ></v-progress-linear>
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
      loading: "system/loading"
    })
  }
};
</script>
