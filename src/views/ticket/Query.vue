<template>
  <v-layout fill-height>
    <v-navigation-drawer permanent>
      <v-container fluid>
        <v-text-field
          outlined
          single-line
          hide-details
          dense
          label="状态"
        ></v-text-field>
        <v-text-field
          class="mt-3 body-2"
          outlined
          single-line
          hide-details
          dense
          label="来源"
        ></v-text-field>
        <v-text-field
          class="mt-3 body-2"
          outlined
          single-line
          hide-details
          dense
          label="类型"
        ></v-text-field>
        <v-text-field
          class="mt-3 body-2"
          outlined
          single-line
          hide-details
          dense
          label="区域"
        ></v-text-field>
        <v-text-field
          class="mt-3 body-2"
          outlined
          single-line
          hide-details
          dense
          label="时间范围"
        ></v-text-field>
        <v-btn block outlined class="mt-3">
          <v-icon size="20">mdi-magnify</v-icon>&nbsp;查询
        </v-btn>
      </v-container>
    </v-navigation-drawer>
    <div style="height:calc(100vh - 48px);overflow:auto;width:100%">
      <v-simple-table fixed-header class="transparent" style="width:100%">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">创建时间</th>
              <th class="text-left">真实姓名</th>
              <th class="text-left">房源</th>
              <th class="text-left">类型</th>
              <th class="text-left">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in billList" :key="`user-${i}`">
              <td class="caption text-left">{{ item.time }}</td>
              <td class="caption text-left">{{ item.name }}</td>

              <td class="caption text-left">{{ item.estate }}</td>
              <td class="caption text-left">{{ item.type }}</td>
              <td>
                <v-btn
                  outlined
                  small
                  rounded
                  color="primary"
                  @click="replyDialog = true"
                >
                  <v-icon size="15">mdi-reply-outline</v-icon>&nbsp;答复
                </v-btn>
                <v-btn class="ml-2" outlined small rounded>
                  <v-icon size="15">mdi-comment-outline</v-icon>&nbsp;备注
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>

    <v-dialog persistent v-model="replyDialog" width="600">
      <v-card>
        <v-toolbar dense flat color="transparent">
          <v-toolbar-title class="subtitle-1 font-weight-black"
            >答复工单</v-toolbar-title
          >
          <v-spacer></v-spacer>
          <v-btn icon @click="replyDialog = false">
            <v-icon size="20">mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-container fluid>
          <v-text-field
            single-line
            hide-details
            label="标题"
            dense
            outlined
          ></v-text-field>
          <v-textarea class="mt-3" outlined label="答复内容"></v-textarea>
        </v-container>
        <v-container fluid>
          <v-layout justify-center>
            <v-btn depressed rounded color="primary">确认</v-btn>
            <v-btn class="ml-2" depressed rounded>取消</v-btn>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class QueryTicket extends Vue {
  private billList = [
    {
      time: '2019/10/11',
      timeRange: '2019/10/11 - 2019/10/20',
      name: 'MINT',

      estate: '光明小区 3室 1厅 1卫',
      type: '电表损坏'
    },
    {
      time: '2019/10/15',
      timeRange: '2019/10/17 - 2019/10/31',
      name: 'TINM',
      type: '照明损坏',
      estate: '光明小区 3室 1厅 1卫'
    },
    {
      time: '2019/10/15',
      timeRange: '2019/10/17 - 2019/10/31',
      name: 'TIM',
      type: '电表损坏',
      estate: '光明小区 2室 1厅 1卫'
    }
  ];

  private replyDialog: boolean = false;
}
</script>

<style scoped></style>
