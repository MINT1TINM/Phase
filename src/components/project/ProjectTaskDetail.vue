<template>
  <v-layout fill-height>
    <v-flex xs5 class="inner-sidebar-withoutpadding">
      <v-container fluid>
        <v-text-field class="mb-3" v-model="taskInfo.title" label="任务" outlined hide-details></v-text-field>
        <div style="flex:1 0 auto;display:flex">
          <h4>创建时间</h4>
          <v-spacer></v-spacer>
          {{taskInfo.createTime}}
        </div>
        <v-divider class="my-3"></v-divider>
        <v-select
          v-model="taskInfo.status"
          outlined
          hide-details
          :items="statusList"
          item-text="text"
          item-value="value"
          label="状态"
          class="mb-3"
        ></v-select>
        <v-text-field disabled v-model="taskInfo.creator" label="创建人" outlined hide-details></v-text-field>
      </v-container>
    </v-flex>
    <v-flex xs7></v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      taskInfo: {},
      statusList: [
        {
          text: "已完成",
          value: 1
        },
        {
          text: "未完成",
          value: 0
        }
      ]
    };
  },
  mounted() {}
};
</script>

<style>
</style>
