<template>
  <div>
    <v-card outlined>
      <v-card-title class="font-weight-black subtitle-1">
        相关表单
        <v-spacer></v-spacer>
        <v-btn text rounded @click="createSheetDialog=true">
          <v-icon size="20">mdi-plus</v-icon>&nbsp;新建
        </v-btn>
      </v-card-title>
    </v-card>
    <v-bottom-sheet v-model="createSheetDialog" inset>
      <v-sheet class="text-center" height="800px" style="overflow:auto">
        <v-container fluid></v-container>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class RelatedDocument extends Vue {
  private createSheetDialog: boolean = false;
}
</script>

<style scoped>
</style>
