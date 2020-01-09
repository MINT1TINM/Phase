<template>
  <v-container>
    <v-toolbar class="nav" flat color="transparent" dense>
      <v-btn icon @click="$router.push({ path: `/` })">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title class="subtitle-1 font-weight-black"
        >政策内容</v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-btn
        class="mr-2"
        color="error lighten-1"
        outlined
        rounded
        @click="deletePolicy"
      >
        <v-icon size="20" class="mr-1">mdi-close</v-icon>删除
      </v-btn>
      <v-btn outlined rounded @click="updatePolicy">
        <v-icon size="20" class="mr-1">mdi-content-save-outline</v-icon>保存
      </v-btn>
    </v-toolbar>
    <dim-form :formContent="policyInfoContent" :target="policyInfo"></dim-form>
    <vue-editor v-model="policyInfo.text"></vue-editor>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { VueEditor } from 'vue2-editor';
import { Policy } from '@/types/policy';
import PolicyService from '@/service/policyService';

@Component({
  components: {
    VueEditor
  }
})
export default class EditPolicy extends Vue {
  private policyInfo = new Policy();
  private policyInfoContent = [
    {
      type: 'text-field',
      title: '标题',
      name: 'title'
    },
    {
      type: 'text-field',
      title: '链接',
      name: 'link'
    },
    {
      type: 'text-area',
      title: '描述',
      name: 'describe'
    },
    {
      type: 'text-field',
      title: '类别',
      name: 'regulationsCategory'
    },
    {
      type: 'text-field',
      title: '级别',
      name: 'effectiveLevel'
    }
  ];

  private async getInfo() {
    const rsp = await PolicyService.getPolicyInfo(Number(this.policyID));
    if (rsp.msg === 'notfound') {
      this.$router.push({ path: '/' });
    }
    this.policyInfo = rsp.policyInfo;
  }

  private async updatePolicy() {
    await PolicyService.updatePolicy(this.policyInfo);
  }

  private async deletePolicy() {
    const res = await this.$confirm('此操作无法还原', {
      title: '确认删除?',
      buttonTrueColor: 'primary',
      dark: this.$vuetify.theme.dark
    });
    if (res) {
      await PolicyService.deletePolicy(Number(this.policyID));
      this.$router.push('/');
    }
  }

  private mounted() {
    this.getInfo();
  }

  private get policyID() {
    return this.$route.params.id;
  }
}
</script>

<style>
.ql-toolbar {
  background-color: #dcdcdc !important;
}
</style>
