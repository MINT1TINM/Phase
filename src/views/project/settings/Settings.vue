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

<script>
import { mapGetters } from "vuex";
import projectService from "../../../service/ProjectService";
export default {
  data() {
    return {
      projectInfoList: [
        {
          subheader: "信息"
        },
        {
          type: "text-field",
          title: "名称",
          content: "name"
        },
        {
          type: "text-area",
          title: "简介",
          content: "description"
        },
        {
          subheader: "通知"
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      lastPage: "system/lastPage",
      currentProject: "project/currentProject"
    })
  },
  methods: {
    async updateProjectInfo() {
      await projectService.updateProjectInfo(this.currentProject);
    }
  }
};
</script>

<style>
</style>
