<template>
  <div style="height:calc(100vh - 113px)">
    <v-layout fill-height justify-center>
      <v-flex md6>
        <v-card class="mt-5">
          <v-card-title class="subtitle-1 font-weight-bold">信息</v-card-title>
          <v-container fluid>
            <dim-form :formContent="settingsContent" :target="processInfo"></dim-form>
            <v-layout justify-center>
              <v-flex xs6>
                <v-btn
                  @click="updateProcessInfo"
                  rounded
                  depressed
                  block
                  color="primary"
                  class="mt-4"
                >保存</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
        <v-card class="mt-5">
          <v-card-title class="subtitle-1 font-weight-bold">成员</v-card-title>
          <v-container fluid style="padding-top:0">
            <v-select
              v-model="processMember"
              :items="projectMember"
              chips
              single-line
              label="Chips"
              item-value="userID"
              item-text="userID"
              multiple
              outlined
            ></v-select>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import dimForm from "@/plugins/dim-form/Main.vue";
import ProcessService from "@/service/processService";
import { Process, ProcessMember } from "@/types/process";
import { namespace } from "vuex-class";

const projectModule = namespace("project");

@Component({
  components: {
    "dim-form": dimForm
  }
})
export default class Settings extends Vue {
  @projectModule.Getter("currentProject") private currentProject: any;
  @projectModule.Getter("currentProjectID") private currentProjectID: any;

  private settingsContent = [
    {
      type: "text-field",
      title: "名称",
      name: "name"
    },
    {
      type: "text-area",
      title: "备注",
      name: "description"
    }
  ];
  private range: [number, number] = [0, 0];
  private processInfo: Process = {
    id: "",
    name: ""
  };
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

  // private async removeMember(item: Member) {}

  get projectMember() {
    return this.currentProject.member.data;
  }

  @Watch("processMember")
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
</style>
