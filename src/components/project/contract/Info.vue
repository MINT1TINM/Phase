<template>
  <v-container>
    <v-row>
      <v-col cols="6" class="pt-0">
        <v-toolbar dense flat color="transparent">
          <v-toolbar-title class="subtitle-1 font-weight-black"
            >基本</v-toolbar-title
          >
        </v-toolbar>
        <v-card>
          <v-container fluid>
            <dim-form
              disabled
              :target="contractShow"
              :formContent="contractContent"
            ></dim-form>
          </v-container>
        </v-card>
      </v-col>
      <v-col cols="6" class="pt-0">
        <v-toolbar dense flat color="transparent">
          <v-toolbar-title class="subtitle-1 font-weight-black"
            >附件</v-toolbar-title
          >
          <v-spacer></v-spacer>
          <v-btn text @click="fileDialog = true">
            <v-icon size="20" class="mr-2">mdi-plus</v-icon>上传
          </v-btn>
        </v-toolbar>
        <v-card>
          <v-simple-table>
            <thead>
              <tr>
                <th class="text-center">名称</th>
                <th class="text-center">创建时间</th>
                <th class="text-center">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="my-2"
                v-for="(item, i) in contractFile"
                :key="`f-${i}`"
              >
                <td class="pl-3 pr-2 text-center">{{ item.name }}</td>
                <td class="pl-3 pr-2 text-center">
                  {{ item.createdAt | format('yyyy-MM-dd hh:mm') }}
                </td>
                <td class="pl-3 pr-2 text-center">
                  <v-btn icon @click="downloadFile(item)">
                    <v-icon size="20">mdi-download-outline</v-icon>
                  </v-btn>
                  <v-btn icon @click="removeFile(item)" color="error">
                    <v-icon size="20">mdi-close</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card>
      </v-col>
    </v-row>

    <v-bottom-sheet v-model="fileDialog" persistent>
      <v-sheet class="text-center" height="750" style="overflow:auto">
        <v-toolbar flat>
          <v-toolbar-title class="subtitle-1 font-weight-black"
            >项目文件</v-toolbar-title
          >
          <v-spacer></v-spacer>
          <v-btn icon @click="fileDialog = false">
            <v-icon size="20">mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <document :window="true" @linkFile="linkFile"></document>
      </v-sheet>
    </v-bottom-sheet>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Contract } from '@/types/project';
import document from '@/views/project/document/Document.vue';
import ContractService from '../../../service/contractService';

@Component({
  components: { document }
})
export default class ProjectContractInfo extends Vue {
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
    // {
    //   type: 'tags',
    //   title: '乙方标签',
    //   name: 'contractorTags'
    // },
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
  fileDialog = false;

  async linkFile(v: any) {
    this.contract.file.push(v);
    await ContractService.updateContract(this.contract);
    this.fileDialog = false;
  }

  async downloadFile(item: any) {
    window.open('/api/file/download?sName=' + item.sName, '_blank');
  }

  async removeFile(item: any) {
    // const index = this.contract.file.indexOf(item);
    // this.contract.file.splice(index, 1);
    // await ContractService.updateContract(this.contract);
  }

  get contractShow() {
    return this.contract;
  }

  set contractShow(v: Contract) {
    this.contractShow = v;
  }

  get contractFile() {
    return this.contract.file;
  }

  mounted() {
    console.log(this.contract);
  }
}
</script>

<style scoped></style>
