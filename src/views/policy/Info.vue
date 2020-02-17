<template>
  <div style="height:100%">
    <v-app-bar dense fixed dark style="margin-top:48px">
      <v-toolbar-title class="body-2 font-weight-black">
        <v-chip small>{{ policyInfo.effective_level }}</v-chip>
        &nbsp;
        {{ policyInfo.title }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="$router.go(-1)">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <transition appear appear-active-class="fade-up-enter">
        <v-container>
          <v-layout class="mt-2" justify-start>
            <strong>简介</strong>
            <p class="ml-2">{{ policyInfo.describe }}</p>
          </v-layout>
          <v-layout class="mb-2" justify-start>
            <strong>类型</strong>
            <p class="ml-2">{{ policyInfo.regulations_category }}</p>
          </v-layout>
          <v-layout justify-center>
            <p class="body-2" v-html="policyInfo.text"></p>
          </v-layout>
        </v-container>
      </transition>
    </v-content>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import PolicyService from '@/service/policyService';
import { Policy } from '@/types/policy';

@Component
export default class PolicyInfo extends Vue {
  policyInfo = new Policy();

  async getInfo() {
    const rsp = await PolicyService.getPolicyInfo(
      Number(this.$route.params.id)
    );
    if (rsp.msg === 'notfound') {
      this.$router.push({ path: '/' });
    }
    this.policyInfo = rsp.policyInfo;
  }

  mounted() {
    this.getInfo();
  }
}
</script>

<style scoped></style>
