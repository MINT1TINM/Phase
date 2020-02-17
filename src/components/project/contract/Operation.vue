<template>
  <v-container>
    <v-toolbar dense flat color="transparent">
      <v-toolbar-title class="subtitle-1 font-weight-black"
        >基本</v-toolbar-title
      >
    </v-toolbar>
    <v-card>
      <v-container>
        <dim-form
          :target="contractShow"
          :formContent="contractContent"
        ></dim-form>
        <v-layout justify-center>
          <v-flex xs6>
            <v-btn
              @click="updateContract"
              rounded
              color="primary darken-1"
              block
              depressed
              >保存</v-btn
            >
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
    <v-toolbar class="mt-2" dense flat color="transparent">
      <v-toolbar-title class="subtitle-1 font-weight-black"
        >危险</v-toolbar-title
      >
    </v-toolbar>
    <v-card>
      <v-container fluid>
        <v-layout justify-center>
          <v-flex xs6>
            <v-btn
              @click="deleteContract"
              rounded
              color="error darken-1"
              block
              depressed
              >删除合同</v-btn
            >
          </v-flex>
        </v-layout></v-container
      >
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Contract } from '@/types/project';
import ContractService from '@/service/contractService';

@Component
export default class ProjectContractOperation extends Vue {
  @Prop() contract!: Contract;

  contractContent = [
    {
      type: 'text-field',
      title: '编号',
      name: 'code'
    },
    {
      type: 'text-field',
      title: '名称',
      name: 'name'
    },
    {
      type: 'text-field',
      title: '乙方',
      name: 'contractorName'
    },
    {
      type: 'tags',
      title: '乙方标签',
      name: 'contractorTags'
    },
    {
      type: 'text-field',
      title: '总金额',
      name: 'amount'
    },
    {
      type: 'text-area',
      title: '约定',
      name: 'promise'
    }
  ];

  async updateContract() {
    try {
      await ContractService.updateContract(this.contractShow);
      this.$snack('更新成功');
    } catch (_) {
      this.$snack('更新失败');
    }
  }

  async deleteContract() {
    const rsp = await this.$confirm('此操作无法恢复', {
      title: '确认删除?',
      buttonTrueColor: 'red darken-1',
      dark: this.$vuetify.theme.dark
    });
    if (rsp) {
      try {
        await ContractService.deleteContract(this.$route.params.contractID);
        this.$snack('删除成功');
        this.$router.push({ path: `/contract` });
      } catch (_) {
        this.$snack('删除失败');
        this.$router.push({ path: `/contract` });
      }
    }
  }

  get contractShow() {
    return this.contract;
  }

  set contractShow(v: Contract) {
    this.contractShow = v;
  }

  mounted() {}
}
</script>

<style scoped></style>
