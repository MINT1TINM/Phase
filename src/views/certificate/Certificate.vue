<template>
  <div>
    <app-bar></app-bar>
    <v-content>
      <v-toolbar dark color="primary">
        <v-layout row wrap justify-center>
          <v-flex xs6>
            <v-text-field
              label="搜索凭证"
              flat
              solo-inverted
              single-line
              hide-details
              :append-outer-icon="'mdi-magnify'"
              @click:append-outer="search"
              @keyup.enter="search"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-toolbar>
    </v-content>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Certifcate extends Vue {
  private search() {}
}
</script>

<style scoped>
</style>
