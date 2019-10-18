<template>
  <v-container fluid>
    <v-card flat color="transparent" v-if="userInfo.nickName">
      <transition appear appear-active-class="fade-up-enter">
        <v-container fluid>
          <v-layout>
            <div class="pa-2">
              <v-avatar color="primary" size="100">
                <img v-if="userInfo.headImgURL" :src="userInfo.headImgURL | httpsfy" />
                <span
                  v-else
                  class="headline font-weight-black white--text"
                >{{userInfo.nickName | avatar}}</span>
              </v-avatar>
            </div>
            <v-flex class="pl-3">
              <v-layout align-center fill-height>
                <h2>{{userInfo.nickName}}</h2>
              </v-layout>
            </v-flex>
          </v-layout>
          <v-tabs v-model="tab" class="mt-2" background-color="transparent">
            <v-tab href="#info">信息</v-tab>
            <v-tab href="#activity">动态</v-tab>
          </v-tabs>
          <v-divider></v-divider>
          <v-container v-if="tab===`info`" fluid grid-list-md>
            <v-layout row wrap>
              <v-flex class="d-flex align-stretch" xs4 v-if="userInfo.phone">
                <v-card width="100%" outlined>
                  <v-card-title class="caption grey--text font-weight-black">移动电话</v-card-title>
                  <v-card-text>
                    <h4>{{userInfo.phone}}</h4>
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex class="d-flex align-stretch" xs4 v-if="userInfo.email">
                <v-card width="100%" outlined>
                  <v-card-title class="caption grey--text font-weight-black">电子邮件</v-card-title>
                  <v-card-text>
                    <h4>{{userInfo.email}}</h4>
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex class="d-flex align-stretch" xs4>
                <v-card width="100%" outlined>
                  <v-card-title class="caption grey--text font-weight-black">加入时间</v-card-title>
                  <v-card-text>
                    <h4>{{userInfo.createdAt | format("yyyy-MM-dd")}}</h4>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
          <v-container v-if="tab===`activity`" fluid></v-container>
        </v-container>
      </transition>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import UserService from '@/service/userService';
import { UserInfo } from '@/types/user';

const userModule = namespace('user');
const systemModule = namespace('system');

@Component
export default class ContactInfo extends Vue {
  @Prop(String) public userID!: string;

  @userModule.Getter('privilege') private privilege!: string[];

  @systemModule.Getter('permissionList') private permissionList: any;

  private userInfo: UserInfo = {
    city: '',
    country: '',
    headImgURL: '',
    nickName: '',
    openid: '',
    privilege: [],
    project: {
      data: [],
    },
    province: '',
    sex: '',
    unionid: '',
  };

  private tab = null;

  @Watch('userID')
  private async onUserIDChanged() {
    this.userInfo = {
      city: '',
      country: '',
      headImgURL: '',
      nickName: '',
      openid: '',
      privilege: [],
      project: {
        data: [],
      },
      province: '',
      sex: '',
      unionid: '',
    };
    if (this.userID) {
      const rsp = await UserService.getOtherUserInfo(this.userID);
      this.userInfo = rsp.userInfo;
    }
  }

  private async mounted() {
    this.userInfo = {
      city: '',
      country: '',
      headImgURL: '',
      nickName: '',
      openid: '',
      privilege: [],
      project: {
        data: [],
      },
      province: '',
      sex: '',
      unionid: '',
    };
    if (this.userID) {
      const rsp = await UserService.getOtherUserInfo(this.userID);
      this.userInfo = rsp.userInfo;
    }
  }
}
</script>

<style scoped>
</style>
