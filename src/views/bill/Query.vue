<template>
  <v-layout fill-height>
    <v-navigation-drawer permanent>
      <v-container fluid>
        <v-text-field outlined single-line hide-details dense label="状态"></v-text-field>
        <v-text-field class="mt-3 body-2" outlined single-line hide-details dense label="来源"></v-text-field>
        <v-text-field class="mt-3 body-2" outlined single-line hide-details dense label="类型"></v-text-field>
        <v-text-field class="mt-3 body-2" outlined single-line hide-details dense label="区域"></v-text-field>
        <v-text-field class="mt-3 body-2" outlined single-line hide-details dense label="时间范围"></v-text-field>
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
              <th class="text-left">租期</th>
              <th class="text-left">房源</th>
              <th class="text-left">价格</th>
              <th class="text-left">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,i) in billList" :key="`user-${i}`">
              <td class="caption text-left">{{ item.time }}</td>
              <td class="caption text-left">{{ item.name }}</td>
              <td class="caption text-left">{{ item.timeRange }}</td>
              <td class="caption text-left">{{ item.estate }}</td>
              <td class="caption text-left">¥ {{ item.price }}</td>
              <td>
                <v-btn outlined small rounded color="primary">
                  <v-icon size="15">mdi-pencil-outline</v-icon>&nbsp;编辑
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
  </v-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class BillQuery extends Vue {
  private billList = [
    {
      time: '2019/10/11',
      timeRange: '2019/10/11 - 2019/10/20',
      name: 'MINT',
      price: 2000,
      estate: '光明小区 3室 1厅 1卫'
    },
    {
      time: '2019/10/15',
      timeRange: '2019/10/17 - 2019/10/31',
      name: 'TINM',
      price: 2000,
      estate: '光明小区 3室 1厅 1卫'
    },
    {
      time: '2019/10/15',
      timeRange: '2019/10/17 - 2019/10/31',
      name: 'TIM',
      price: 2000,
      estate: '光明小区 2室 1厅 1卫'
    }
  ];
}
</script>

<style scoped>
</style>
