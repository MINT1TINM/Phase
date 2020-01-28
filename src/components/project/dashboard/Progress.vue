<template>
  <div>
    <v-card>
      <v-card-title class="body-2 font-weight-black">
        进度
      </v-card-title>
      <v-container fluid class="py-5">
        <v-layout justify-center class="pa-5">
          <v-progress-circular
            :rotate="-90"
            :size="160"
            :width="15"
            :value="80"
            color="primary"
          >
            <div class="font-weight-black headline">{{ 80 }}%</div>
          </v-progress-circular>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ProjectWidgetProgress extends Vue {}
</script>

<style scoped></style>
