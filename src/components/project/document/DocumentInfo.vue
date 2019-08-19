<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class DocumentInfo extends Vue {
  @Prop({ default: "" }) public docID!: string;

  @Watch("docID")
  private onDocIDChanged() {
    console.log(this.docID);
  }
}
</script>

