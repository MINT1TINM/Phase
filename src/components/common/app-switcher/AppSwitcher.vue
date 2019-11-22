<template>
  <div>
    <v-toolbar dense flat color="transparent">
      <!-- app switcher toggle -->
      <v-btn icon @click="toggleAppSwitcher(false)">
        <v-icon size="23">mdi-arrow-left</v-icon>
      </v-btn>
    </v-toolbar>
    <v-container class="px-5" fluid grid-list-md>
      <h3 class="mt-5">应用</h3>
      <v-layout row wrap class="mt-3">
        <v-flex xs6 v-for="(item, i) in appList" :key="`app-${i}`">
          <v-hover v-slot:default="{ hover }">
            <v-card
              class="transparent"
              :elevation="hover ? 8 : 0"
              outlined
              @click="toApp(item.route)"
            >
              <v-img class="ma-4" :src="item.icon"></v-img>
              <div class="body-2 pb-2 pt-0 text-center font-weight-black">
                {{ item.name }}
              </div>
            </v-card>
          </v-hover>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

const systemModule = namespace('system');

@Component
export default class AppSwitcher extends Vue {
  @systemModule.Mutation('toggleAppSwitcher') private toggleAppSwitcher: any;

  @systemModule.Getter('appList') private appList: any;

  private toApp(route: string) {
    window.location.href = `/${route}`;
  }
}
</script>

<style scoped></style>
