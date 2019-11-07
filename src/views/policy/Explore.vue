<template>
  <v-container fluid style="height:100%">
    <v-layout justify-center align-center style="height:70%">
      <v-flex xs10 md6>
        <v-layout class="mb-10">
          <h1 class="display-2 font-weight-black">搜索政策</h1>
        </v-layout>
        <v-text-field
          single-line
          hide-details
          rounded
          solo
          class="body-2"
          label="键入以搜索"
          prepend-inner-icon="mdi-magnify"
          v-model="searchContent"
          @keyup.enter="search"
        ></v-text-field>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import PolicyService from '@/service/policyService';
import { Policy } from '@/types/policy';

@Component
export default class PolicyExplore extends Vue {
  private searchContent: string = ''

  private policyList: Policy[] = []

  private count: number = 0

  private async search() {
    this.$router.push({
      path: `/explore/${this.searchContent}`,
      query: {
        page: '1'
      }
    });
  }
}
</script>

<style scoped>
</style>
