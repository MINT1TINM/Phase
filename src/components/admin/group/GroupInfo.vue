<template>
  <v-layout fill-height>
    <v-container fluid class="pa-0">
      <v-toolbar flat color="transparent" dense>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn text @click="updateGroupInfo">
            <v-icon size="20" class="mr-2">mdi-content-save-outline</v-icon>保存
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-container fluid>
        <v-subheader class="subtitle-2 pl-1 mb-0">基本信息</v-subheader>
        <v-form ref="groupInfoForm">
          <dim-form
            :formContent="groupInfoContent"
            :target="groupInfo"
          ></dim-form>
        </v-form>
        <v-subheader class="subtitle-2 pl-1 mb-0">群组成员</v-subheader>
        <v-card outlined flat>
          <v-container fluid>
            <v-autocomplete
              :loading="loading"
              :items="userListShow"
              :search-input.sync="search"
              flat
              hide-no-data
              dense
              hide-details
              label="+ 群组成员"
              outlined
              item-text="nickName"
              item-value="id"
            >
              <template v-slot:item="{ item }">
                <v-list-item-avatar>
                  <v-img :src="item.headImgURL"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title v-text="item.nickName"></v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon @click="insertGroupMember(item.id)">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </v-list-item-action>
              </template>
            </v-autocomplete>
          </v-container>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">ID</th>
                  <th class="text-left">昵称</th>
                  <!-- <th class="text-left">标签</th> -->
                  <th class="text-left">操作</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, i) in groupInfo.member.data"
                  :key="`member-${i}`"
                >
                  <td class="caption text-left">{{ item.userID }}</td>
                  <td class="caption text-left">{{ item.nickName }}</td>
                  <!-- <td class="caption text-left">{{ item.tags }}</td> -->
                  <td class="text-left">
                    <v-btn
                      icon
                      color="error"
                      @click="deleteGroupUser(item.userID)"
                    >
                      <v-icon size="20">mdi-close</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-container>
    </v-container>
  </v-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import CompanyService from '@/service/companyService';
import { Group, GroupMember } from '@/types/company';
import UserService from '@/service/userService';
import { UserInfo } from '@/types/user';

@Component
export default class AdminGroupInfo extends Vue {
  @Prop(String) public groupID!: string;

  private groupInfo: Group = {
    id: '',
    name: '',
    description: '',
    member: {
      data: []
    },
    createdAt: ''
  };

  private loading = false;

  private userList = [];

  private search: string = '';

  private select = null;

  private groupInfoContent = [
    {
      type: 'text-field',
      title: '群组名称',
      name: 'name'
    },
    {
      type: 'text-area',
      title: '简介',
      name: 'description'
    }
  ];

  private async updateGroupInfo() {
    await CompanyService.updateGroupInfo(this.groupID, this.groupInfo);
    this.$emit('updateGroupList');
  }

  private async querySelections(v: string) {
    this.loading = true;
    // Simulated ajax query
    const rsp = await UserService.searchUser(v);
    // allow duplicated user group
    this.userList = rsp.user;
    this.loading = false;
  }

  private async insertGroupMember(userID: any) {
    this.select = null;
    this.search = '';
    await CompanyService.insertGroupMember(this.groupID, userID);
    this.getGroupInfo();
  }

  private async deleteGroupUser(userID: string) {
    const res = await this.$confirm('此操作无法还原', {
      title: '确认删除?',
      buttonTrueColor: 'primary',
      dark: this.$vuetify.theme.dark
    });
    if (res) {
      await CompanyService.deleteGroupMember(this.groupID, userID);
      this.getGroupInfo();
    }
  }

  private get selectedNickNameList() {
    const userNickNameList: string[] = [];
    for (const item of this.groupInfo.member.data) {
      userNickNameList.push((item as GroupMember).nickName.toLowerCase());
    }
    return userNickNameList;
  }

  private get userListShow() {
    return this.userList.filter(
      (e: GroupMember) =>
        this.selectedNickNameList.indexOf(e.nickName.toLowerCase()) === -1
    );
  }

  private async getGroupInfo() {
    const rsp = await CompanyService.getGroupInfo(this.groupID);
    this.groupInfo = rsp.group;
  }

  @Watch('search')
  private async onSearchContentChanged(val: string) {
    val && val !== this.select && this.querySelections(val);
  }

  @Watch('groupID')
  private async onGroupIDChanged() {
    this.getGroupInfo();
  }

  private async mounted() {
    if (this.groupID !== '') {
      this.getGroupInfo();
    }
  }
}
</script>
