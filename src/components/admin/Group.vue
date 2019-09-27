<template>
  <div style="height:calc(100vh - 48px);overflow-y:auto">
    <v-layout fill-height>
      <v-flex xs3>
        <v-toolbar flat class="transparent" dense>
          <v-btn text rounded>
            <v-icon size="20">mdi-plus</v-icon>&nbsp;群组
          </v-btn>
        </v-toolbar>
        <v-container fluid></v-container>
      </v-flex>
    </v-layout>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class AdminGroup extends Vue {}
</script>

<style scoped>
</style>
