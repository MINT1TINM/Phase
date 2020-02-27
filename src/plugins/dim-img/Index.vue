<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class DimImage extends Vue {
  @Prop() url!: string;
}
</script>

<style scoped></style>
