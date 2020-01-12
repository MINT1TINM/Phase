<template>
  <v-row class="px-3">
    <v-col cols="9">
      <Calendar></Calendar>
    </v-col>
    <v-col cols="3">
      <Info></Info>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Calendar from '@/components/project/dashboard/Calendar.vue';
import Info from '@/components/project/dashboard/Info.vue';

@Component({
  components: {
    Calendar,
    Info
  }
})
export default class ProjectDashboard extends Vue {}
</script>

<style scoped></style>
