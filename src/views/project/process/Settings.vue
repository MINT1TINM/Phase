<template>
  <div>
    <transition appear appear-active-class="fade-up-enter">
      <v-layout fill-height justify-center>
        <v-flex md6>
          <v-card class="mt-5">
            <v-card-title class="subtitle-1 font-weight-bold"
              >信息</v-card-title
            >
            <v-container fluid>
              <dim-form
                :formContent="settingsContent"
                :target="processInfo"
              ></dim-form>
              <v-layout justify-center>
                <v-flex xs6>
                  <v-btn
                    @click="updateProcessInfo"
                    rounded
                    depressed
                    block
                    color="primary darken-1"
                    class="mt-4"
                    >保存</v-btn
                  >
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
          <v-card class="mt-5">
            <v-card-title class="subtitle-1 font-weight-bold"
              >成员</v-card-title
            >
            <v-container fluid style="padding-top:0">
              <v-select
                v-model="processMember"
                :items="projectMember"
                chips
                dense
                single-line
                label="成员"
                item-value="userID"
                item-text="nickName"
                multiple
                outlined
              >
                <template v-slot:selection="{ item, index }">
                  <v-chip pill small>
                    <v-avatar size="10" left>
                      <v-img :src="item.headImgURL"></v-img>
                    </v-avatar>
                    <span class="font-weight-black">{{ item.nickName }}</span>
                  </v-chip>
                </template>
              </v-select>
            </v-container>
          </v-card>
          <v-card class="mt-5">
            <v-card-title class="subtitle-1 font-weight-bold"
              >操作</v-card-title
            >
            <v-container fluid style="padding-top:0">
              <v-layout justify-center>
                <v-flex xs6>
                  <v-btn
                    @click="deleteProcess"
                    rounded
                    depressed
                    block
                    color="error"
                    class="mt-4"
                    >删除过程</v-btn
                  >
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

import { namespace } from 'vuex-class';
import ProcessService from '@/service/processService';
import { Process, ProcessMember } from '@/types/process';
import { Authorization } from '@/types/user';

const projectModule = namespace('project');
const userModule = namespace('user');

@Component({
  components: {}
})
export default class Settings extends Vue {
  @userModule.Getter('authorization') private authorization!: Authorization;

  @projectModule.Getter('currentProject') private currentProject: any;

  @projectModule.Getter('currentProjectID') private currentProjectID: any;

  @projectModule.Getter('projectPermission')
  private projectPermission: any;

  private settingsContent = [
    {
      type: 'text-field',
      title: '名称',
      name: 'name'
    },
    {
      type: 'text-area',
      title: '备注',
      name: 'description'
    }
  ];

  private range: [number, number] = [0, 0];

  private processInfo: Process = new Process();

  private processMember: ProcessMember[] = [];

  private async getProcessInfo() {
    const rsp = await ProcessService.getProcessInfo(
      this.$route.params.processID
    );
    this.processInfo = rsp.process;
    this.processMember = this.processInfo.member!.data;
  }

  private async updateProcessInfo() {
    const rsp = await ProcessService.updateProcessInfo(
      this.$route.params.processID,
      this.processInfo
    );
  }

  private async deleteProcess() {
    const res = await this.$confirm('此操作无法恢复', {
      title: '确认删除?',
      buttonTrueColor: 'primary',
      dark: this.$vuetify.theme.dark
    });
    if (res) {
      await ProcessService.deleteProcess(this.$route.params.processID);
      this.$router.push({ path: '/process' });
    }
  }

  // private async removeMember(item: Member) {}

  get projectMember() {
    console.log(this.currentProject.member.data);
    return this.currentProject.member.data;
  }

  @Watch('processMember')
  private async onProcessMemberChanged() {
    // watch change after initialized
    if (this.processMember !== this.processInfo.member!.data) {
      await ProcessService.updateProcessMember(
        this.$route.params.processID,
        this.projectMember
      );
      ProcessService.getProcessList(this.currentProjectID);
    }
  }

  private mounted() {
    this.getProcessInfo();
  }
}
</script>

<style scoped>
::-webkit-scrollbar {
  display: block;
}
</style>
