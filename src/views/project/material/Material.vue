<template>
  <div>
    <v-toolbar dense class="navbar">
      <v-toolbar-title class="subtitle-1 font-weight-black"
        >材料</v-toolbar-title
      >

      <v-spacer></v-spacer>

      <v-divider vertical class="mx-2"></v-divider>

      <v-btn outlined color="primary" @click="createMaterialDialog = true"
        ><v-icon size="20" class="mr-1">mdi-plus</v-icon>创建</v-btn
      >
    </v-toolbar>

    <v-data-table
      height="calc(100vh - 156px)"
      style="overflow:auto"
      fixed-header
      disable-sort
      disable-filtering
      :options.sync="options"
      :headers="headers"
      :items="materialList"
      :items-per-page="1"
      class="transparent"
      :footer-props="{
        itemsPerPageOptions: [20, 50],
        showCurrentPage: true
      }"
      @click:row="showInfo"
    >
      <template v-slot:item.userUUID="{ item }">
        <v-chip small class="caption font-weight-black">{{
          item.userCache.nickName
        }}</v-chip>
      </template>
      <template v-slot:item.createdAt="{ item }">
        {{ item.createdAt | format('yyyy-MM-dd hh:mm:ss') }}
      </template>
      <template v-slot:item.price="{ item }">
        ¥{{ item.price.toFixed(2) }}
      </template>
      <template v-slot:item.marketPrice="{ item }">
        ¥{{ item.marketPrice.toFixed(2) }}
      </template>
    </v-data-table>

    <v-dialog v-model="createMaterialDialog" width="400" persistent>
      <v-card>
        <v-toolbar dense flat class="transparent">
          <v-toolbar-title class="subtitle-1 font-weight-black">
            创建材料
          </v-toolbar-title>
        </v-toolbar>
        <v-container fluid>
          <dim-form
            dense
            :target="newMaterial"
            :formContent="materialFormContent"
          ></dim-form>
          <v-layout justify-center>
            <v-btn
              depressed
              rounded
              color="primary darken-1"
              @click="createMaterial"
              >创建</v-btn
            >
            <v-btn
              @click="createMaterialDialog = false"
              rounded
              text
              class="ml-2"
              >取消</v-btn
            >
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Material } from '@/types/project';
import MaterialService from '@/service/materialService';

@Component
export default class ProjectMaterial extends Vue {
  private materialList: Material[] = [];
  private newMaterial: Material = new Material();

  private createMaterialDialog = false;
  private materialFormContent = [
    {
      type: 'text-field',
      name: 'name',
      title: '名称'
    }
  ];

  private headers = [
    { text: '名称', value: 'name' },
    { text: '创建人', value: 'userUUID' },
    { text: '创建时间', value: 'createdAt' },
    { text: '市场价', value: 'marketPrice' },
    { text: '面价', value: 'price' }
  ];
  private options: { page: number; itemsPerPage: number } = {
    page: 1,
    itemsPerPage: 20
  };

  private async getMaterialList() {
    this.materialList = await MaterialService.getMaterialList(
      this.options.page,
      this.options.itemsPerPage
    );
  }

  private showInfo(v: Material) {
    this.$router.push({ path: `/material/${v.id}` });
  }

  private async createMaterial() {
    if (this.newMaterial.name) {
      try {
        await MaterialService.createMaterial(this.newMaterial);
        this.$snack('创建成功');
      } catch (_) {
        this.$snack('创建失败');
      }
      this.createMaterialDialog = false;
      this.newMaterial = new Material();
    }
  }

  private async mounted() {
    this.getMaterialList();
  }
}
</script>

<style scoped></style>
