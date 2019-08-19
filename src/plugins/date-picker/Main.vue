<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    full-width
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="dateShow"
        outlined
        hide-details
        :single-line="dense?false:true"
        :label="label"
        class="text-field-dense"
        readonly
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker v-model="dateShow" @input="menu = false"></v-date-picker>
  </v-menu>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class DatePicker extends Vue {
  @Prop({ default: () => new Date() }) private date!: Date;
  @Prop({ default: () => "" }) private label!: string;
  @Prop({ default: false }) private dense!: boolean;
  private dateShow: string = "";
  private menu: boolean = false;

  @Watch("dateShow")
  private onDateShowChanged() {
    this.$emit("update:date", this.dateShow);
  }

  @Watch("date")
  private onDateChanged() {
    this.dateShow = this.date.toString().slice(0, 10);
  }

  mounted() {
    this.dateShow = this.date.toString().slice(0, 10);
  }
}
</script>

<style scoped>
</style>
