<template>
  <div>
    <v-icon
      size="90"
      color="blue lighten-1"
      v-if="item.type.indexOf(`doc`) != -1"
      >mdi-file-word</v-icon
    >
    <v-icon
      size="90"
      color="red lighten-1"
      v-else-if="item.type.indexOf(`ppt`) != -1"
      >mdi-file-powerpoint</v-icon
    >
    <v-icon
      size="90"
      color="green lighten-1"
      v-else-if="item.type.indexOf(`excel`) != -1"
      >mdi-file-excel</v-icon
    >
    <v-icon
      size="90"
      color="red darken-2"
      v-else-if="item.type.indexOf(`pdf`) != -1"
      >mdi-file-pdf</v-icon
    >
    <v-icon size="90" color="primary lighten-1" v-else-if="item.data"
      >mdi-folder</v-icon
    >
    <v-icon
      size="90"
      v-else-if="
        item.type.indexOf(`png`) != -1 || item.type.indexOf(`jpg`) != -1
      "
      >mdi-image</v-icon
    >
    <v-icon size="90" color="grey lighten-1" v-else>mdi-file</v-icon>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class DocIcon extends Vue {
  @Prop({ default: {} }) private item!: any;

  private mounted() {
    console.log(this.item.type.indexOf(''));
  }
}
</script>

<style scoped></style>
