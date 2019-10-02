<template>
  <v-container fluid>
    <v-layout justify-center>
      <v-icon class="py-10" size="90" color="primary lighten-1">mdi-folder</v-icon>
    </v-layout>
    <v-layout justify-center>
      <v-subheader>{{childrenNum}} 个项目</v-subheader>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import docIcon from "@/components/project/document/DocIcon.vue";
import { namespace } from "vuex-class";

const fileModule = namespace("file");

@Component({
  components: {
    "doc-icon": docIcon
  }
})
export default class CatalogInfo extends Vue {
  @fileModule.Getter("fileList") private fileList: any;

  get childrenNum() {
    return Object.values(this.fileList).length;
  }

  private mounted() {}
}
</script>

<style scoped>
</style>
