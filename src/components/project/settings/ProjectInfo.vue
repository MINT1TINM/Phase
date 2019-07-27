<template>
  <v-container fluid grid-list-lg>
    <v-layout>
      <v-flex xs8 offset-2>
        <v-form ref="projectInfo">
          <v-layout class="my-4" row v-for="(item,i) in projectInfoList" :key="`profile-${i}`"></v-layout>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      projectInfoList: []
    };
  }
};
</script>

<style>
</style>
