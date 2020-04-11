<template>
  <div id="workflow"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class AlertCount extends Vue {
  @Prop({ default: () => [] }) groupList!: string[];
  procdefList: any[] = [];

  mounted() {}
}
</script>

<style scoped></style>
