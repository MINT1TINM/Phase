<template>
  <v-container fluid grid-list-lg>
    <v-layout>
      <v-flex xs8 offset-2>
        <v-form ref="processInfo">
          <dim-form :keyName="'process-info'" :formContent="processInfoList" :target="processInfo"></dim-form>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      processInfoList: [
        {
          type: "text-field",
          title: "名称",
          content: "title",
          disabled: true
        },
        {
          type: "select",
          title: "性别",
          content: "sex",
          list: [
            {
              value: 0,
              title: "男"
            },
            {
              value: 1,
              title: "女"
            }
          ]
        }
      ],
      processInfo: {}
    };
  }
};
</script>

<style>
</style>
