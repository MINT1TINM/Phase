<template>
  <div>
    <v-toolbar dense>
      <v-toolbar-title class="subtitle-1 font-weight-black">{{
        visa.appCode
      }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="updateVisa" text>
        <v-icon size="20" class="mr-2">mdi-content-save-outline </v-icon>保存
      </v-btn>
      <v-btn icon @click="$router.push({ path: `/visa` })"
        ><v-icon size="20">mdi-close</v-icon></v-btn
      >
    </v-toolbar>
    <v-container
      fluid
      style="height:calc(100vh - 96px)"
      class="overflow-y-auto"
    >
      <v-row justify="center">
        <v-col cols="8">
          <v-card>
            <v-toolbar dense color="transparent" flat>
              <v-toolbar-title class="body-2 font-weight-black">
                基本信息
              </v-toolbar-title>
            </v-toolbar>
            <v-container fluid>
              <dim-form :target="visa" :formContent="infoContent"></dim-form>
            </v-container>

            <v-col cols="12">
              <v-subheader class="pl-1">相关附件</v-subheader>
              <v-file-input
                outlined
                dense
                hide-details
                label="相关附件"
                @change="uploadFile"
              ></v-file-input>
            </v-col>
            <v-list dense>
              <v-list-item v-for="(item, i) in visa.file" :key="`pf-${i}`">
                <v-list-item-action>
                  <v-btn icon small @click="downloadFile(item)"
                    ><v-icon size="20">mdi-download-outline</v-icon></v-btn
                  >
                </v-list-item-action>
                <v-list-item-title>{{ item }}</v-list-item-title>

                <v-list-item-action>
                  <v-btn icon small color="error" @click="removeFile(item)"
                    ><v-icon>mdi-close</v-icon></v-btn
                  >
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>

        <v-col cols="8">
          <v-card>
            <v-toolbar dense flat color="transparent">
              <v-toolbar-title class="body-2 font-weight-black"
                >⚠️危险</v-toolbar-title
              >
            </v-toolbar>
            <v-row justify="center">
              <v-col cols="6">
                <v-btn
                  @click="deleteVisa"
                  color="error darken-1"
                  depressed
                  rounded
                  block
                  ><v-icon class="mr-2" size="20">mdi-delete-outline</v-icon
                  >删除</v-btn
                >
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Visa } from '@/types/project';
import VisaService from '@/service/visaService';
import FileService from '@/service/fileService';

@Component
export default class ProjectVisaInfo extends Vue {
  visa: Visa = new Visa();

  get infoContent() {
    return [
      {
        type: 'text-field',
        title: '项目名称',
        name: 'name'
      },
      {
        type: 'select',
        title: '申请类型',
        name: 'appType',
        list: ['签证', '变更', '批价', '招标文件']
      },
      {
        type: 'text-field',
        title: '申请编号',
        name: 'appCode'
      },
      {
        type: 'text-field',
        title: '送审金额',
        name: 'amount',
        prependIcon: '¥'
      },
      {
        type: 'text-area',
        title: '送审说明',
        name: 'description'
      },
      {
        divider: true
      },
      {
        type: 'text-field',
        title: '审核金额',
        name: 'checkAmount',
        prependIcon: '¥'
      }
    ];
  }

  async updateVisa() {
    try {
      await VisaService.updateVisa(this.visa);
      this.$snack('更新成功');
    } catch (err) {
      this.$snack('更新失败');
    }
  }

  async getVisa() {
    this.visa = await VisaService.getOneVisa(this.$route.params.visaID);
  }

  async deleteVisa() {
    const c = await this.$confirm('此操作无法恢复', {
      title: '确认删除？',
      buttonTrueColor: 'error',
      dark: this.$vuetify.theme.dark
    });
    if (c) {
      try {
        await VisaService.deleteVisa(this.$route.params.visaID);
        this.$router.push({ path: '/visa' });
        this.$snack('删除成功');
      } catch (_) {
        this.$snack('删除失败');
      }
    }
  }

  async uploadFile(v: any) {
    if (v) {
      const rsp = await FileService.uploadFile(v, '', '');
      this.visa.file.unshift(rsp.path);
      this.updateVisa();
    }
  }

  async removeFile(v: string) {
    this.visa.file = this.visa.file.filter(e => e !== v);
    this.updateVisa();
  }

  async uploadProblemFile(v: any) {
    const rsp = await FileService.uploadFile(v, '', '');

    this.visa.file.unshift(rsp.path);
    this.updateVisa();
  }

  downloadFile(v: string) {
    FileService.downloadFileFromFs(v);
  }

  mounted() {
    this.getVisa();
  }
}
</script>

<style scoped></style>
