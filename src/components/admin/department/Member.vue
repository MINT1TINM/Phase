<template>
  <div style="height:calc(100vh - 48px); overflow:auto">
    <v-toolbar color="transparent" dense>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text>
          <v-icon size="20">mdi-plus</v-icon>&nbsp;成员
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class DepartmentMember extends Vue {
  private async insertDepartmentMember(userID: string) {}

  private async removeDepartmentMember(userID: string) {}
}
</script>

<style scoped>
</style>
