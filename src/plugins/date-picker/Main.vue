<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    :disabled="disabled"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="dateShow"
        outlined
        hide-details
        :disabled="disabled"
        :single-line="dense?false:true"
        :label="label"
        dense
        readonly
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      :show-current="true"
      :max="max"
      :min="min"
      v-model="dateShow"
      @input="menu = false"
    ></v-date-picker>
  </v-menu>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class DatePicker extends Vue {
  @Prop({ default: () => new Date() }) private date!: Date;
  @Prop({ default: () => "" }) private label!: string;
  @Prop({ default: false }) private dense!: boolean;
  @Prop({ default: false }) private disabled!: boolean;
  @Prop(String) private max!: string;
  @Prop(String) private min!: string;

  private dateShow: string = "";
  private menu: boolean = false;

  @Watch("dateShow")
  private onDateShowChanged() {
    this.$emit("update:date", this.dateShow);
  }

  @Watch("date")
  private onDateChanged() {
    this.dateShow = new Date(this.date).toISOString().slice(0, 10);
  }

  private mounted() {
    this.dateShow = new Date(this.date).toISOString().slice(0, 10);
  }
}
</script>

<style scoped>
</style>
