<template>
  <div id="flow_chart">
    <transition appear appear-active-class="fade-up-enter">
      <v-card>
        <v-card-title class="subtitle-1 font-weight-black"
          >工作流 - {{ workflowDefine.name }}</v-card-title
        >
        <v-container fluid>
          <v-stepper alt-labels :value="0">
            <v-stepper-header>
              <template v-for="(node, i) in nodeList">
                <v-stepper-step :step="i + 1" :key="`${i}-step`">
                  {{ node.name }}
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
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import CompanyService from '@/service/companyService';
import { namespace } from 'vuex-class';
import { Authorization, UserInfo } from '@/types/user';
import WorkflowService from '@/service/workflowService';
import SheetService from '@/service/sheetService';
import { ActionDefine, Flow } from '@/types/workflow';

@Component
export default class FlowChartComponent extends Vue {
  @Prop({ default: () => {} }) workflowDefine!: {};

  nodeList: any[] = [];

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

  @Watch('workflowDefine', { immediate: true })
  onWorkflowDefinChanged() {
    this.nodeList = this.getNodeIdList(this.workflowDefine);
  }

  async mounted() {}
}
</script>

<style lang="scss">
#flow_chart {
  .v-stepper__step__step {
    background: #79daed !important;
  }
}
</style>
