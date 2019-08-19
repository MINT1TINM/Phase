<template>
  <v-container grid-list-lg fluid fill-height>
    <v-layout row wrap justify-center>
      <v-flex xs8>
        <transition appear appear-active-class="fade-up-enter">
          <v-card>
            <v-container fill-height fluid grid-list-lg style="padding-top:0px">
              <div style="width:100%">
                <dim-form :formContent="projectInfoList" :target="currentProject"></dim-form>
                <v-layout row justify-center class="pt-5">
                  <v-flex xs6>
                    <v-btn block rounded depressed color="primary" @click="updateProjectInfo()">保存</v-btn>
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

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import ProjectService from "@/service/projectService";
import dimForm from "@/plugins/dim-form/Main.vue";

const systemModule = namespace("system");
const projectModule = namespace("project");

@Component({
  components: {
    "dim-form": dimForm
  }
})
export default class Settings extends Vue {
  @systemModule.Getter("lastPage") private lastPage: any;
  @projectModule.Getter("currentProject") private currentProject: any;

  private projectInfoList = [
    {
      subheader: "信息"
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
      subheader: "通知"
    }
  ];

  private async updateProjectInfo() {
    await ProjectService.updateProjectInfo(this.currentProject);
  }
}
</script>

<style scoped>
</style>
