<template>
  <v-container grid-list-lg fluid fill-height>
    <v-layout row wrap justify-center>
      <v-flex xs6>
        <transition appear appear-active-class="fade-up-enter">
          <div>
            <v-card>
              <v-container fill-height fluid grid-list-lg style="padding-top:0px">
                <div style="width:100%">
                  <dim-form :formContent="projectInfoList" :target="projectInfo"></dim-form>
                  <v-layout row justify-center class="pt-5">
                    <v-flex xs6>
                      <v-btn block rounded depressed color="primary" @click="updateProjectInfo()">保存</v-btn>
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

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      projectInfo: {},
      projectInfoList: [
        {
          subheader:"信息"
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
          type: "select",
          title: "公开性",
          content: "open",
          list: [
            {
              value: 0,
              title: "仅项目成员可见"
            },
            {
              value: 1,
              title: "所有组织成员可见"
            }
          ]
        },
        {
          subheader:"通知"
        }
      ]
    };
  },
  computed: {
    ...mapGetters({ lastPage: "system/lastPage" })
  }
};
</script>

<style>
</style>
