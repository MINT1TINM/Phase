<template>
  <v-container>
    <v-row>
      <v-col cols="4" xs="6" class="pt-0">
        <v-toolbar dense flat color="transparent">
          <v-toolbar-title class="subtitle-1 font-weight-black"
            >概况</v-toolbar-title
          >
        </v-toolbar>
        <v-card>
          <v-container class="pa-5">
            <v-row>
              <v-progress-circular
                class="mx-5"
                :size="100"
                :width="10"
                :value="contract.paidPercentage || 0"
                color="primary"
              >
              </v-progress-circular>

              <v-col class="pl-5 py-0">
                <v-card-title class="subtitle-1 font-weight-black"
                  >支付比例</v-card-title
                >
                <v-card-text class="headline">
                  {{ contract.paidPercentage || 0 }}
                  <span class="body-2">%</span>
                </v-card-text>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <v-toolbar dense flat color="transparent">
      <v-toolbar-title class="subtitle-1 font-weight-black"
        >记录</v-toolbar-title
      >
    </v-toolbar>
    <v-card>
      <v-toolbar dense flat color="transparent">
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn text @click="createPaymentDialog = true">
            <v-icon size="20" class="mr-1">mdi-plus</v-icon>新建
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-data-table
        hide-default-footer
        disable-sort
        disable-filtering
        :headers="headers"
        :items="paymentList"
      >
        <template v-slot:item.applyAmount="{ item }">
          ¥ {{ (item.applyAmount || 0).toFixed(2) }}
        </template>
        <template v-slot:item.payAmount="{ item }">
          ¥ {{ (item.payAmount || 0).toFixed(2) }}
        </template>
        <template v-slot:item.action="{ item }">
          <v-btn
            icon
            @click="
              currentPayment = item;
              editPaymentDialog = true;
            "
            ><v-icon size="20">mdi-pencil-outline</v-icon></v-btn
          >
          <v-btn icon color="error" @click="deletePayment(item.id)"
            ><v-icon size="20">mdi-close</v-icon></v-btn
          >
        </template>
      </v-data-table>
    </v-card>

    <v-bottom-sheet inset v-model="createPaymentDialog">
      <v-sheet height="600">
        <v-toolbar dense flat color="transparent">
          <v-toolbar-title class="subtitle-1 font-weight-black"
            >新建支付记录</v-toolbar-title
          >
        </v-toolbar>
        <v-container>
          <dim-form
            dense
            :target="newPayment"
            :formContent="paymentInfoContent"
          ></dim-form>
          <v-row justify="center">
            <v-col cols="6">
              <v-btn
                @click="createPayment"
                block
                rounded
                depressed
                color="primary darken-1"
                >新建</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
    </v-bottom-sheet>

    <v-bottom-sheet inset v-model="editPaymentDialog">
      <v-sheet height="600">
        <v-toolbar dense flat color="transparent">
          <v-toolbar-title class="subtitle-1 font-weight-black"
            >新建支付记录</v-toolbar-title
          >
        </v-toolbar>
        <v-container>
          <dim-form
            dense
            :target="currentPayment"
            :formContent="paymentInfoContent"
          ></dim-form>
          <v-row justify="center">
            <v-col cols="6">
              <v-btn
                @click="updatePayment"
                block
                rounded
                depressed
                color="primary darken-1"
                >保存</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
    </v-bottom-sheet>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Contract, Payment } from '@/types/project';
import ContractService from '@/service/contractService';
import { namespace } from 'vuex-class';

const projectModule = namespace('project');

@Component
export default class ProjectContractPayment extends Vue {
  @Prop() contract!: Contract;

  @projectModule.Getter('currentProjectID') currentProjectID!: string;

  paymentList: Payment[] = [];
  newPayment: Payment = new Payment();
  currentPayment: Payment = new Payment();
  createPaymentDialog = false;
  editPaymentDialog = false;
  headers = [
    {
      text: '名称',
      value: 'name'
    },
    {
      text: '时间',
      value: 'appliedAt'
    },
    {
      text: '金额',
      value: 'applyAmount'
    },
    {
      text: '已支付',
      value: 'payAmount'
    },
    {
      text: '支付时间',
      value: 'paidAt'
    },
    {
      text: '操作',
      value: 'action'
    }
  ];

  paymentInfoContent = [
    {
      type: 'text-field',
      name: 'name',
      title: '名称'
    },
    {
      type: 'date-picker',
      name: 'appliedAt',
      title: '时间'
    },
    {
      type: 'text-field',
      title: '金额',
      name: 'applyAmount',
      inputType: 'number'
    },
    {
      type: 'text-field',
      title: '已支付',
      name: 'payAmount',
      inputType: 'number'
    },
    {
      type: 'date-picker',
      name: 'paidAt',
      title: '支付时间'
    }
  ];

  async getPaymentList() {
    const p = new Payment();
    p.contractUUID = this.$route.params.contractID;
    p.projectUUID = this.currentProjectID;
    this.paymentList = await ContractService.getPaymentList(p);
  }

  async createPayment() {
    this.newPayment.projectUUID = this.currentProjectID;
    this.newPayment.contractUUID = this.$route.params.contractID;

    // fix type
    this.newPayment.payAmount = Number(this.newPayment.payAmount);
    this.newPayment.applyAmount = Number(this.newPayment.applyAmount);
    if (this.newPayment.name) {
      try {
        await ContractService.createPayment(this.newPayment);
        this.$snack('创建成功');
      } catch (_) {
        this.$snack('创建失败');
      }
      this.createPaymentDialog = false;
      this.newPayment = new Payment();
      this.getPaymentList();
    }
  }

  async updatePayment() {
    if (this.currentPayment.name) {
      this.currentPayment.payAmount = Number(this.currentPayment.payAmount);
      this.currentPayment.applyAmount = Number(this.currentPayment.applyAmount);
      try {
        await ContractService.updatePayment(this.currentPayment);
        this.$snack('更新成功');
      } catch (_) {
        this.$snack('更新失败');
      }
      this.editPaymentDialog = false;
      this.currentPayment = new Payment();
      this.getPaymentList();
    }
  }

  async deletePayment(id: string) {
    const rsp = await this.$confirm('此操作无法恢复', {
      title: '确认删除?',
      buttonTrueColor: 'red darken-2',
      dark: this.$vuetify.theme.dark
    });
    if (rsp) {
      try {
        await ContractService.deletePayment(id);
        this.getPaymentList();
        this.$snack('删除成功');
      } catch (_) {
        this.$snack('删除失败');
      }
    }
  }

  async mounted() {
    this.getPaymentList();
  }
}
</script>

<style scoped></style>
