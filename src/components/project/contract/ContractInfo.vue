<template>
  <div>
    <v-toolbar dense>
      <v-tabs style="flex:auto">
        <v-tab>信息</v-tab>
        <v-tab>支付</v-tab>
      </v-tabs>
      <v-spacer></v-spacer>
      <v-btn icon @click="$router.push({ path: `/contract` })"
        ><v-icon size="20">mdi-close</v-icon></v-btn
      >
    </v-toolbar>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Contract } from '@/types/project';
import ContractService from '@/service/contractService';

@Component
export default class ProjectContractInfo extends Vue {
  private contract: Contract = new Contract();

  private async getContract() {
    try {
      this.contract = await ContractService.getOneContract(
        this.$route.params.contractID
      );
    } catch (err) {
      this.$snack('加载失败');
    }
  }

  private mounted() {
    this.getContract();
  }
}
</script>

<style scoped></style>
