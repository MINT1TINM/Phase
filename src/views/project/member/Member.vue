<template>
  <v-container grid-list-lg fluid fill-height>
    <v-layout row wrap justify-center>
      <v-flex xs8>
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
                      <th class="text-center">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,i) in memberListShow" :key="`member-${i}`">
                      <td class="text-center">
                        <v-avatar
                          color="primary"
                          size="32"
                          class="white--text font-weight-black"
                        >{{ item.headImgURL }}</v-avatar>
                      </td>
                      <td class="font-weight-black text-center">{{ item.nickName }}</td>
                      <td class="font-weight-black text-center">{{ item.email }}</td>
                      <td class="font-weight-black text-center">{{ item.phone }}</td>
                      <td class="font-weight-black text-center">
                        <v-chip
                          class="mx-1 text-uppercase"
                          v-for="(item,i) in item.projectRole"
                          :key="`role-${i}`"
                        >{{item}}</v-chip>
                      </td>
                      <td class="font-weight-black text-center">
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on }">
                            <v-btn small icon v-on="on">
                              <v-icon>mdi-pencil-outline</v-icon>
                            </v-btn>
                          </template>
                          <span class="caption">编辑权限</span>
                        </v-tooltip>

                        <!-- project creator cannot remove himself -->
                        <v-tooltip bottom v-if="!currentProject.userID==userInfo.id">
                          <template v-slot:activator="{ on }">
                            <v-btn small icon v-on="on">
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
                    <v-btn block rounded depressed color="primary" @click="updateProjectInfo()"><v-icon size="20">mdi-plus</v-icon>&nbsp;新增成员</v-btn>
                  </v-flex>
                </v-layout>
              </div>
            </v-container>
          </v-card>
        </transition>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import projectService from "../../../service/ProjectService";
export default {
  data() {
    return {
      searchMemberContent: "",
      memberListShow: [],
      memberList: [
        {
          avatar: "x",
          nickName: "MINT",
          email: "mint@insdim.com",
          phone: "18101720295",
          role: ["c", "u", "d"]
        }
      ]
    };
  },
  methods: {
    async getProjectMember() {
      const rsp = await projectService.getProjectMember(
        this.currentProject.member
      );
      for (let i = 0; i < rsp.memberList.length; i++) {
        const e = rsp.memberList[i];
        // find user role in this particular project
        e.projectRole = e.project.find(e => {
          return e.projectID == this.currentProject.id;
        }).role;
      }
      this.memberList = rsp.memberList;
      this.memberListShow = this.memberList;
    },
    async addMember() {}
  },
  computed: {
    ...mapGetters({
      currentProject: "project/currentProject",
      projectList: "project/projectList",
      userInfo: "user/userInfo"
    })
  },
  watch: {
    searchMemberContent() {
      this.memberListShow = [];
      for (let i = 0; i < this.memberList.length; i++) {
        const e = this.memberList[i];
        if (
          e.nickName
            .toLowerCase()
            .indexOf(this.searchMemberContent.toLowerCase()) != -1 ||
          // serach email before .com
          e.email
            .split(".")[0]
            .toLowerCase()
            .indexOf(this.searchMemberContent.toLowerCase()) != -1 ||
          e.phone
            .toLowerCase()
            .indexOf(this.searchMemberContent.toLowerCase()) != -1
        ) {
          this.memberListShow.push(e);
        }
      }
    }
  },
  mounted() {
    this.getProjectMember();
  }
};
</script>

<style>
</style>
