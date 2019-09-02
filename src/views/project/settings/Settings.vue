<template>
  <v-container grid-list-lg fluid fill-height>
    <v-layout row wrap justify-center>
      <v-flex xs8>
        <transition appear appear-active-class="fade-up-enter">
          <div>
            <v-card class="mt-3">
              <v-container fill-height fluid grid-list-lg style="padding-top:0px">
                <div style="width:100%">
                  <dim-form :formContent="projectInfoList" :target="currentProject"></dim-form>

                  <v-layout row justify-center class="pt-5">
                    <v-flex xs6>
                      <v-btn block rounded depressed color="primary" @click="updateProjectInfo()">保存</v-btn>
                    </v-flex>
                  </v-layout>
                  <v-divider class="my-3"></v-divider>
                  <v-layout>
                    <v-flex xs3>
                      <v-subheader class="body-2 px-1" style="height:36px">封面</v-subheader>
                    </v-flex>
                    <v-flex xs9>
                      <v-img
                        max-width="200"
                        v-if="currentProject.folderURL"
                        :src="`/api/file/download?sName=${currentProject.folderURL}`"
                      ></v-img>
                      <v-file-input
                        class="text-field-semidense mt-3"
                        accept="image/png, image/jpeg, image/bmp"
                        placeholder="上传封面"
                        prepend-icon="mdi-camera-outline"
                        single-line
                        @change="updateProjectFolder"
                        hide-details
                        outlined
                      ></v-file-input>
                    </v-flex>
                  </v-layout>
                </div>
              </v-container>
            </v-card>
          </div>
        </transition>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import ProjectService from "@/service/projectService";

const systemModule = namespace("system");
const projectModule = namespace("project");

@Component({
  components: {}
})
export default class Settings extends Vue {
  @systemModule.Getter("lastPage") private lastPage: any;
  @projectModule.Getter("currentProject") private currentProject: any;
  @projectModule.Getter("currentProjectID") private currentProjectID!: string;

  private projectInfoList = [
    {
      subheader: "信息"
    },
    {
      divider: true
    },
    {
      type: "text-field",
      title: "名称",
      name: "name"
    },
    {
      type: "text-area",
      title: "简介",
      name: "description"
    },
    {
      type: "date-range",
      title: "审计期间",
      nameStart: "startDate",
      nameEnd: "endDate"
    },
    {
      type: "date-picker",
      disabled: true,
      title: "创建时间",
      name: "createdAt"
    },
    {
      type: "date-picker",
      title: "实施时间",
      name: "actionDate"
    }
  ];

  private async updateProjectInfo() {
    await ProjectService.updateProjectInfo(this.currentProject);
  }

  private async updateProjectFolder(v: any) {
    console.log(v);
    await ProjectService.updateProjectFolder(v, this.currentProjectID);
    await ProjectService.getProjectList();
  }
}
</script>

<style scoped>
</style>
