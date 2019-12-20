<template>
  <div>
    <v-toolbar dense flat>
      <v-toolbar-title class="caption mr-3">合同编号</v-toolbar-title>

      <v-text-field
        style="max-width:250px"
        single-line
        class="body-2"
        hide-details
        dense
        v-model="search.id"
        outlined
      ></v-text-field>

      <v-toolbar-title class="caption ml-5 mr-3">时间范围</v-toolbar-title>

      <v-menu
        ref="datePickerMenu"
        v-model="datePickerMenu"
        :close-on-content-click="false"
        :return-value.sync="search.timeRange"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            style="max-width:250px"
            v-model="dateRangeText"
            label="Picker in menu"
            single-line
            hide-details
            class="body-2"
            outlined
            dense
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker range v-model="search.timeRange" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="datePickerMenu = false"
            >Cancel</v-btn
          >
          <v-btn
            text
            color="primary"
            @click="$refs.datePickerMenu.save(search.timeRange)"
            >OK</v-btn
          >
        </v-date-picker>
      </v-menu>

      <v-spacer></v-spacer>
      <v-btn outlined color="primary"
        ><v-icon size="20" class="mr-1">mdi-magnify</v-icon>搜索</v-btn
      >
    </v-toolbar>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

class SearchContract {
  constructor(timeRange: string[]) {
    this.timeRange = timeRange;
  }
  id?: string;
  timeRange!: string[];
}

@Component
export default class ProjectContract extends Vue {
  public $refs!: {
    datePickerMenu: HTMLBaseElement;
  };

  private search = new SearchContract([
    new Date(new Date().getTime() - 7 * 1000 * 60 * 60 * 24)
      .toISOString()
      .substr(0, 10),
    new Date().toISOString().slice(0, 10)
  ]);
  private datePickerMenu = false;

  private get dateRangeText() {
    return this.search.timeRange.join(' ~ ');
  }
}
</script>

<style scoped></style>
