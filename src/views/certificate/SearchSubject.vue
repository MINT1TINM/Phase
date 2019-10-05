<template>
  <div>
    <app-bar></app-bar>
    <v-content>
      <v-app-bar dense app fixed dark color="primary darken-1" style="margin-top:48px">
        <v-layout row wrap justify-center>
          <v-flex xs6>
            <v-layout>
              <v-menu
                ref="datePickerMenu"
                v-model="datePickerMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    dense
                    solo-inverted
                    flat
                    class="body-2"
                    v-model="dateRangeText"
                    single-line
                    hide-details
                    label="时间范围"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker type="month" range v-model="dateRange"></v-date-picker>
              </v-menu>
              <v-text-field
                dense
                solo-inverted
                flat
                class="body-2 ml-1"
                v-model="certificateNo"
                single-line
                hide-details
                label="凭证号"
                append-outer-icon="mdi-magnify"
                @click:append-outer="searchSubject"
              ></v-text-field>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-app-bar>
    </v-content>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class SearchSubject extends Vue {
  private datePickerMenu: boolean = false;
  private dateRange = [];
  private certificateNo = "";

  private async searchSubject() {}

  private get dateRangeText() {
    return this.dateRange.join(" ~ ");
  }
}
</script>

<style scoped>
</style>
