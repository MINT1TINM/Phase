<template>
  <v-card outlined>
    <v-card-title class="font-weight-black subtitle-1">
      待办事项
      <v-spacer></v-spacer>
      <v-btn text rounded>
        <v-icon size="20">mdi-plus</v-icon>&nbsp;新建
      </v-btn>
    </v-card-title>

    <v-data-table class="mt-4" :headers="headers" :items="subTaskList" hide-default-footer>
      <template v-slot:item.status="props">
        <v-btn small icon @click="toggleItemStatus(props.item)">
          <v-icon v-if="props.item.status===true" color="green">mdi-check-circle-outline</v-icon>
          <v-icon v-else color="warning darken-1">mdi-alert-circle-outline</v-icon>
        </v-btn>
      </template>
      
      <template v-slot:item.name="props">
        <v-edit-dialog :return-value.sync="props.item.name" @save="save(props.item)">
          {{ props.item.name }}
          <template v-slot:input>
            <v-text-field v-model="props.item.name" label="编辑" single-line></v-text-field>
          </template>
        </v-edit-dialog>
      </template>

      <template v-slot:item.description="props">
        <v-edit-dialog :return-value.sync="props.item.description" @save="save(props.item)">
          {{ props.item.description }}
          <template v-slot:input>
            <v-text-field v-model="props.item.description" label="编辑" single-line></v-text-field>
          </template>
        </v-edit-dialog>
      </template>

      <template v-slot:item.actions="{item}">
        <v-btn icon small color="error">
          <v-icon>mdi-delete-outline</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <v-layout justify-center class="py-3">
      <v-flex xs6></v-flex>
    </v-layout>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class SubTask extends Vue {
  private subTaskList = [
    {
      id: 0,
      name: "test",
      status: false,
      description: "超标"
    },
    {
      id: 1,
      name: "test2",
      status: true,
      description: "未超标"
    }
  ];
  private headers = [
    { text: "状态", value: "status", align: "center", sortable: false },
    { text: "名称", value: "name", align: "center", sortable: false },

    { text: "描述", value: "description", align: "center", sortable: false },
    { text: "操作", value: "actions", align: "center", sortable: false }
  ];
  private statusList = [
    {
      text: "正常",
      value: true
    },
    {
      text: "异常",
      value: false
    }
  ];

  private async toggleItemStatus(item: any) {
    item.status = !item.status;
    await this.save(item);
  }

  private async save(item: any) {
    console.log(item);
  }
}
</script>

<style scoped>
</style>
