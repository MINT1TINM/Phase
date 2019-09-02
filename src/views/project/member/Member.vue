<template>
  <v-container grid-list-lg fluid fill-height>
    <v-layout row wrap justify-center>
      <v-flex xs12 sm10 lg8>
        <transition appear appear-active-class="fade-up-enter">
          <v-card>
            <v-container fill-height fluid grid-list-lg>
              <div style="width:100%">
                <v-text-field
                  outlined
                  class="text-field-semidense"
                  label="搜索成员"
                  single-line
                  hide-details
                  v-model="searchMemberContent"
                ></v-text-field>
                <v-simple-table class="mt-2">
                  <thead>
                    <tr>
                      <th class="text-center">头像</th>
                      <th class="text-center">昵称</th>
                      <th class="text-center">电子邮件</th>
                      <th class="text-center">移动电话</th>
                      <th class="text-center">项目权限</th>
                      <th class="text-center">项目角色</th>
                      <th class="text-center">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,i) in memberListShow" :key="`member-${i}`">
                      <td class="text-center">
                        <v-avatar color="primary" size="32" class="white--text font-weight-black">
                          <img :src="item.headImgURL | httpsfy" />
                        </v-avatar>
                      </td>
                      <td class="font-weight-black text-center">{{ item.nickName }}</td>
                      <td class="font-weight-black text-center">{{ item.email }}</td>
                      <td class="font-weight-black text-center">{{ item.phone }}</td>
                      <td class="font-weight-black text-center">
                        <v-chip
                          class="mx-1 text-uppercase"
                          v-if="item.projectRole.indexOf('c')!=-1"
                        >C</v-chip>
                        <v-chip
                          class="mx-1 text-uppercase"
                          v-if="item.projectRole.indexOf('r')!=-1"
                        >R</v-chip>
                        <v-chip
                          class="mx-1 text-uppercase"
                          v-if="item.projectRole.indexOf('u')!=-1"
                        >U</v-chip>
                        <v-chip
                          class="mx-1 text-uppercase"
                          v-if="item.projectRole.indexOf('d')!=-1"
                        >D</v-chip>
                      </td>
                      <td class="font-weight-black text-center">
                        <v-chip v-for="(item,i) in item.tag" :key="`tag-${i}`">{{item}}</v-chip>
                      </td>
                      <td class="font-weight-black text-center">
                        <!-- project creator/loginuser cannot edit himself -->

                        <v-tooltip bottom>
                          <template v-slot:activator="{ on }">
                            <v-btn
                              small
                              icon
                              v-on="on"
                              @click="editMemberRoleDialog=true;targetMember = item;targetMember.role = item.projectRole"
                            >
                              <v-icon>mdi-pencil-outline</v-icon>
                            </v-btn>
                          </template>
                          <span class="caption">编辑权限 & 角色</span>
                        </v-tooltip>

                        <v-tooltip
                          bottom
                          v-if="item.id!==currentProject.userID&&authorization.userID === currentProject.userID"
                        >
                          <template v-slot:activator="{ on }">
                            <v-btn small icon v-on="on" @click="removeMember(item.id)">
                              <v-icon>mdi-close</v-icon>
                            </v-btn>
                          </template>
                          <span class="caption">移除</span>
                        </v-tooltip>
                      </td>
                    </tr>
                  </tbody>
                </v-simple-table>
                <v-layout row justify-center class="pt-5">
                  <v-flex xs6>
                    <v-bottom-sheet v-model="addMemberDialog" inset>
                      <template v-slot:activator="{ on }">
                        <v-btn block rounded depressed color="primary" v-on="on">
                          <v-icon size="20">mdi-plus</v-icon>&nbsp;新增成员
                        </v-btn>
                      </template>
                      <v-sheet class="text-center" height="800px" style="overflow:auto">
                        <v-container fluid style="height:100%">
                          <search-user></search-user>
                        </v-container>
                      </v-sheet>
                    </v-bottom-sheet>
                  </v-flex>
                </v-layout>
                <v-dialog v-model="editMemberRoleDialog" width="500">
                  <v-card>
                    <v-toolbar flat>
                      <v-toolbar-title class="subtitle-1 font-weight-black">编辑权限 & 角色</v-toolbar-title>
                    </v-toolbar>
                    <v-container
                      fluid
                      v-if="targetMember.id!==currentProject.userID&&authorization.userID === currentProject.userID"
                    >
                      <v-checkbox
                        v-model="targetMember.projectRole"
                        hide-details
                        color="primary"
                        label="C - 可邀请成员，新建过程、任务"
                        value="c"
                      ></v-checkbox>
                      <v-checkbox
                        v-model="targetMember.projectRole"
                        color="primary"
                        hide-details
                        label="R - 可查看基础 & 审定表格"
                        value="r"
                      ></v-checkbox>
                      <v-checkbox
                        v-model="targetMember.projectRole"
                        color="primary"
                        hide-details
                        label="U - 可更改过程、任务内容，上传文件"
                        value="u"
                      ></v-checkbox>
                      <v-checkbox
                        v-model="targetMember.projectRole"
                        color="primary"
                        hide-details
                        label="D - 可移除成员、删除过程、任务等资源"
                        value="d"
                      ></v-checkbox>
                    </v-container>
                    <v-container fluid>
                      <v-combobox
                        class="mt-3"
                        label="项目角色"
                        single-line
                        hide-details
                        outlined
                        v-model="targetMember.tag"
                        multiple
                        chips
                      ></v-combobox>
                    </v-container>

                    <v-card-actions class="mt-3">
                      <v-layout justify-center>
                        <v-btn
                          text
                          rounded
                          color="primary"
                          @click="updateMemberRole(targetMember.id,targetMember.projectRole,targetMember.tag);editMemberRoleDialog=false"
                        >确认</v-btn>
                      </v-layout>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
            </v-container>
          </v-card>
        </transition>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import searchUser from "@/components/project/member/SearchUser.vue";
import { namespace } from "vuex-class";
import ProjectService from "@/service/projectService";
import { UserProject } from "@/types/user";
import { ProjectMemberComplete, ProjectMember } from "@/types/project";

const projectModule = namespace("project");
const userModule = namespace("user");

@Component({
  components: {
    "search-user": searchUser
  }
})
export default class ProjectMemberManagement extends Vue {
  @projectModule.Getter("currentProject") private currentProject: any;
  @projectModule.Getter("projectList") private projectList: any;
  @userModule.Getter("authorization") private authorization: any;

  private memberList: ProjectMemberComplete[] = [];
  private memberListShow: ProjectMemberComplete[] = [];
  private searchMemberContent: string = "";
  private targetMember: ProjectMember = {
    userID: "",
    role: [],
    tag: []
  };
  private addMemberDialog: boolean = false;
  private editMemberRoleDialog: boolean = false;

  private async getProjectMember() {
    const rsp = await ProjectService.getProjectMember(
      this.currentProject.member.data
    );
    for (const e of rsp.memberList) {
      // find user role in this particular project
      e.projectRole = e.project.data.find((u: UserProject) => {
        return u.projectID === this.currentProject.id;
      }).role;

      e.tag = e.project.data.find((u: UserProject) => {
        return u.projectID === this.currentProject.id;
      }).tag;
    }
    this.memberList = rsp.memberList;
    this.memberListShow = this.memberList;
  }

  private async removeMember(userID: string) {
    const res = await this.$confirm("", {
      title: "确认移除成员?",
      buttonTrueColor: "primary"
    });
    if (res) {
      await ProjectService.removeProjectMember(this.currentProject.id, userID);
      // update redundancy
      await ProjectService.getProjectList();
      // update memberlist
      this.getProjectMember();
    }
  }

  private async updateMemberRole(userID: string, role: [], tag: []) {
    await ProjectService.updateMemberRole(
      this.currentProject.id,
      userID,
      role,
      tag
    );
    this.getProjectMember();
  }

  @Watch("searchMemberContent")
  private onSearchMemberContentChanged() {
    this.memberListShow = [];
    for (const e of this.memberList) {
      if (
        e.nickName
          .toLowerCase()
          .indexOf(this.searchMemberContent.toLowerCase()) !== -1 ||
        // serach email before .com
        e.email
          .split(".")[0]
          .toLowerCase()
          .indexOf(this.searchMemberContent.toLowerCase()) !== -1 ||
        e.phone
          .toLowerCase()
          .indexOf(this.searchMemberContent.toLowerCase()) !== -1
      ) {
        this.memberListShow.push(e);
      }
    }
  }

  private mounted() {
    this.getProjectMember();
  }
}
</script>

<style scoped>
</style>
