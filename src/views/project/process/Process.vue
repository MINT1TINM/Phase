<template>
  <v-container fluid grid-list-md fill-height style="padding:0">
    <v-layout row wrap>
      <v-flex xs12 style="padding:0">
        <v-toolbar flat class="transparent">
          <v-layout>
            <v-flex xs3>
              <v-text-field
                prepend-inner-icon="mdi-magnify"
                hide-details
                outlined
                single-line
                class="text-field-dense"
                label="搜索过程"
                v-model="searchProcessContent"
              ></v-text-field>
            </v-flex>
            <v-spacer></v-spacer>
            <v-btn outlined color="primary" @click="createProcessDialog=true">+ 新过程</v-btn>
          </v-layout>
        </v-toolbar>
        <v-sheet color="transparent">
          <v-slide-group center-active show-arrows style="height:100%">
            <v-slide-item v-for="(item,i) in processListShow" :key="`process-${i}`">
              <div :class="i==0?'ml-5 mr-2 my-3':`mx-2 my-3`" style="width:300px">
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
      processListShow: [],
      createProcessDialog: false,
      processName: "",
      searchProcessContent: ""
    };
  },
  computed: {
    ...mapGetters({
      currentProjectID: "project/currentProjectID"
    })
  },
  watch: {
    searchProcessContent: function() {
      this.searchProcess();
    }
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
      this.processListShow = rsp.processList;
    },
    searchProcess() {
      this.processListShow = [];
      let processList = this.processList;
      let searchProcessContent = this.searchProcessContent;
      for (let i = processList.length - 1; i >= 0; i--) {
        const e = processList[i];
        if (e.name.indexOf(searchProcessContent) != -1) {
          this.processListShow.unshift(e);
        }
      }
    }
  },
  mounted() {
    this.getProcessList();
  }
};
</script>

<style>
</style>
