<template>
  <div>
    <v-toolbar dense>
      <v-btn icon @click="$router.go(-1)">
        <v-icon size="20">mdi-arrow-left</v-icon>
      </v-btn>
    </v-toolbar>

    <v-container fluid>
      <v-row>
        <v-col cols="6">
          <v-card>
            <v-container fluid>
              <v-subheader class="px-0"> 基本信息</v-subheader>
              <dim-form :target="supplier" :formContent="content"></dim-form>

              <v-row justify="center">
                <v-col cols="6">
                  <v-btn @click="updateSupplier" block rounded depressed
                    ><v-icon size="20" class="mr-2"
                      >mdi-content-save-outline</v-icon
                    >保存修改</v-btn
                  >
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card>
            <v-container fluid>
              <v-subheader class="px-0">人员</v-subheader>
            </v-container>
            <v-list dense>
              <v-list-item
                v-for="(item, i) in supplier.member.data"
                :key="`s-${i}`"
              >
                <v-list-item-title>{{ item.nickName }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Supplier } from '@/types/company';
import CompanyService from '@/service/companyService';

@Component
export default class AdminSupplierInfo extends Vue {
  supplier: Supplier = new Supplier();

  get content() {
    return [
      {
        name: 'name',
        title: '名称',
        type: 'text-field'
      },
      {
        name: 'phone',
        title: '联系电话',
        type: 'text-field'
      },
      {
        name: 'address',
        title: '地址',
        type: 'text-field'
      }
    ];
  }

  get supplierID() {
    return this.$route.params.supplierID;
  }

  async updateSupplier() {
    await CompanyService.updateSupplier(this.supplier);
  }

  async mounted() {
    this.supplier = await CompanyService.getSupplier(this.supplierID);
  }
}
</script>

<style scoped></style>
