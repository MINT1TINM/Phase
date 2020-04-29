<template>
  <div>
    <transition appear appear-active-class="fade-up-enter">
      <v-card>
        <v-card-title class="subtitle-1 font-weight-black"
          >工作流 - {{ workflowDefine.name }} - {{ status }}</v-card-title
        >
        <v-container fluid>
          <v-stepper alt-labels :value="currentNodeIndex">
            <v-stepper-header>
              <template v-for="(node, i) in nodeList">
                <v-stepper-step
                  :complete="currentNodeIndex > i"
                  :rules="[() => status != '已中止' || currentNodeIndex != i]"
                  :step="i + 1"
                  :key="`${i}-step`"
                >
                  {{ node.name }}
                  <!-- <small>{{new Date() | format("yyyy-MM-dd")}}</small> -->
                </v-stepper-step>
                <v-divider
                  v-if="i + 1 !== (nodeList.length || 0)"
                  :key="i"
                ></v-divider>
              </template>
            </v-stepper-header>
          </v-stepper>
        </v-container>
      </v-card>
    </transition>
    currentNodeID:{{ currentNodeID }}
    <br />
    currentNodeIndex:{{ currentNodeIndex }}
    <br />
    <div v-for="(item, i) in timeLine" :key="i">
      {{ i }} {{ nodeList[item.step].name }} {{ item.comment }}
      {{ item.updateTime }}
      <!-- {{item}} -->
      <br />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import CompanyService from '@/service/companyService';
import { namespace } from 'vuex-class';
import { Authorization, UserInfo } from '@/types/user';
import { ActionDefine, NodeInfo, Flow, Event } from '@/types/workflow';
import WorkflowService from '@/service/workflowService';
import SheetService from '@/service/sheetService';

@Component
export default class TimeLineComponent extends Vue {
  @Prop({ default: () => [] }) flowNode!: NodeInfo[];
  @Prop({ default: () => [] }) timeLine!: Event[];
  @Prop({ default: () => '' }) currentNodeID!: string;
  @Prop({ default: () => new Flow() }) workflowDefine!: Flow;
  @Prop({ default: () => '' }) status!: string;

  nodeList: any[] = [];
  currentNodeIndex: number = -1;

  getNodeIdList(procdef: any) {
    var node = JSON.parse(procdef.resource || '{}');
    var nodeIdList = [];
    while (node) {
      console.log(node);
      nodeIdList.push({
        name: node.name,
        nodeID: node.nodeId,
        type: node.type
      });
      node = node.childNode;
    }
    return nodeIdList;
  }

  getCurrentNodeID() {
    if (this.status == '已结束') this.currentNodeIndex = this.nodeList.length;
    else if (this.currentNodeID) {
      for (let index = 0; index < this.nodeList.length; index++) {
        const node = this.nodeList[index];
        if (node.nodeId == this.currentNodeID) {
          this.currentNodeIndex = index;
          break;
        }
      }
    }
  }

  @Watch('flowNode', { immediate: true })
  onFlowNodeChanged() {
    this.currentNodeIndex = -1;
    if (this.flowNode.length) {
      this.nodeList = this.flowNode;
      if (this.nodeList.length > 2) {
        this.nodeList[0].name = '开始';
        this.nodeList[this.nodeList.length - 1].name = '审批完成';
      }
      this.getCurrentNodeID();
    } else {
      this.nodeList = this.getNodeIdList(this.workflowDefine);
    }
  }

  async mounted() {
    // console.log('actionDefineID:', this.actionDefineID);
  }
}
</script>

<style></style>
