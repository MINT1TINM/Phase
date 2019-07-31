<template>
  <v-container fluid grid-list-md fill-height style="padding:0">
    <v-layout row wrap>
      <v-flex style="padding: 0" xs2>
        <v-navigation-drawer permanent class="inner-sidebar" style="width:100%">
          <v-text-field
            prepend-inner-icon="mdi-magnify"
            single-line
            outlined
            hide-details
            class="text-field-dense mt-1"
            label="搜索过程"
          ></v-text-field>
          <v-toolbar dense class="transparent mt-3" flat>
            <h5 style="margin-left:-12px">分组</h5>
          </v-toolbar>
          <v-divider></v-divider>
          <v-list nav dense color="transparent" style="padding:8px 0px">
            <v-list-item-group color="primary">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>全部</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
      </v-flex>
      <v-flex xs10 style="padding:0">
        <v-sheet color="transparent">
          <v-slide-group center-active show-arrows style="height:100%">
            <transition appear appear-active-class="fade-up-enter">
              <v-slide-item>
                <v-card class="ml-3 mr-2 my-3" width="100" @click="createProcessDialog=true">
                  <v-container fill-height>
                    <v-layout align-center justify-center>
                      <v-icon size="30">mdi-plus</v-icon>
                    </v-layout>
                  </v-container>
                </v-card>
              </v-slide-item>
            </transition>

            <v-slide-item v-for="(item,i) in processList" :key="`process-${i}`">
              <div class="mx-2 my-3" style="width:300px">
                <process-column :processId="item.id" :processName="item.name"></process-column>
              </div>
            </v-slide-item>
          </v-slide-group>
        </v-sheet>
      </v-flex>
    </v-layout>
    <v-dialog v-model="createProcessDialog" width="300" persistent>
      <v-card>
        <v-card-title class="subtitle-1 font-weight-black">新建过程</v-card-title>
        <v-container>
          <v-text-field outlined class="text-field-dense" label="项目名称" v-model="processName"></v-text-field>
        </v-container>
        <v-card-actions class="justify-center">
          <v-btn rounded color="primary" depressed @click="createProcess">确认</v-btn>
          <v-btn rounded text @click="createProcessDialog=false">取消</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import processColumn from "@/components/process/ProcessColumn";
import processService from "@/service/ProcessService";
import { mapGetters } from "vuex";
export default {
  components: {
    processColumn: processColumn
  },
  data() {
    return {
      processList: [],
      createProcessDialog: false,
      processName: ""
    };
  },
  computed: {
    ...mapGetters({
      currentProjectID: "project/currentProjectID"
    })
  },
  methods: {
    async createProcess() {
      await processService.createProcess(
        this.processName,
        this.currentProjectID
      );
      this.createProcessDialog = false;
      this.getProcessList();
    },
    async getProcessList() {
      const rsp = await processService.getProcessList(this.currentProjectID);
      this.processList = rsp.processList;
    }
  },
  mounted() {
    this.getProcessList();
  }
};
</script>

<style>
</style>
