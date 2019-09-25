<template>
  <div>
    <dim-form
      class="mt-4"
      keyName="profile"
      :formContent="privacySettingList"
      :target="privacySetting"
    ></dim-form>
    <v-layout justify-center class="pt-5">
      <v-flex xs6>
        <v-btn block rounded depressed color="primary" @click="updatePrivacySetting()">保存</v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class PrivacySetting extends Vue {
  private privacySettingList = [
    {
      type: "switch",
      title: "隐藏真实姓名",
      name: "hideName"
    },
    {
      type: "switch",
      title: "隐藏邮箱",
      name: "hideEmail"
    },
    {
      type: "switch",
      title: "隐藏电话号码",
      name: "hidePhone"
    }
  ];
  private privacySetting = {};

  private async updatePrivacySetting() {}
}
</script>

<style scoped>
</style>
