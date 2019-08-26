<template>
  <div>
    <v-icon size="90" color="blue lighten-1" v-if="item.type==`doc`">mdi-file-word</v-icon>
    <v-icon size="90" color="red lighten-1" v-else-if="item.type==`ppt`">mdi-file-powerpoint</v-icon>
    <v-icon size="90" color="green lighten-1" v-else-if="item.type==`xls`">mdi-file-excel</v-icon>
    <v-icon size="90" color="red darken-2" v-else-if="item.type==`pdf`">mdi-file-pdf</v-icon>
    <v-icon size="90" color="primary lighten-1" v-else-if="item.data">mdi-folder</v-icon>
    <v-icon size="90" color="grey lighten-1" v-else>mdi-file</v-icon>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class DocIcon extends Vue {
  @Prop({ default: {} }) private item!: any;
}
</script>

<style scoped>
</style>
