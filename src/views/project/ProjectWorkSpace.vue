<template>
  <div>
    <v-navigation-drawer
      expand-on-hover
      mini-variant-width="62"
      app
      clipped
      permanent
      fixed
    >
      <v-list nav dense color="transparent">
        <div v-for="(item, i) in appList" :key="i">
          <v-list-item
            class="my-1"
            :disabled="!item.condition"
            link
            :to="item.route"
          >
            <template>
              <v-list-item-icon style="margin-right:0">
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title style="margin-left:20px">
                {{ item.name }}
              </v-list-item-title>
            </template>
          </v-list-item>
        </div>
      </v-list>
    </v-navigation-drawer>

    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { namespace } from 'vuex-class';
import { Authorization } from '@/types/user';
import { Project } from '@/types/project';
import WorkflowService from '@/service/workflowService';
import { Instance } from '@/types/workflow';
import ProjectService from '@/service/projectService';

const userModule = namespace('user');
const projectModule = namespace('project');

@Component({
  components: {}
})
export default class ProjectIndex extends Vue {
  @userModule.Getter('authorization') authorization!: Authorization;
  @projectModule.Getter('currentProject') currentProject!: Project;
  @projectModule.Getter('projectPermission')
  projectPermission: any;

  get appList() {
    // started=1 && no active workflow instance -> project started
    return [
      {
        icon: 'mdi-view-dashboard-outline',
        name: '仪表板',
        route: '/dashboard',
        role: ['r'],
        condition: true
      },
      {
        icon: 'mdi-view-agenda',
        name: '过程',
        route: '/process',
        role: ['r'],
        condition: true
      },
      {
        icon: 'mdi-account-box-outline',
        name: '成员',
        route: '/member',
        role: ['r'],
        condition: true
      },
      {
        icon: 'mdi-file-document-edit-outline',
        name: '合同',
        route: '/contract',
        role: ['r'],
        condition: true
      },
      {
        icon: 'mdi-checkbox-marked-circle-outline',
        name: '跟踪',
        route: '/track',
        role: ['r'],
        condition: true
      },
      {
        icon: 'mdi-account-multiple-outline',
        name: '例会',
        route: '/meeting',
        role: ['r'],
        condition: true
      },
      {
        icon: 'mdi-passport',
        name: '签证变更',
        route: '/visa',
        role: ['r'],
        condition: true
      },
      {
        icon: 'mdi-cart-outline',
        name: '材料',
        route: '/material',
        role: ['r'],
        condition: true
      },
      {
        icon: 'mdi-folder-outline',
        name: '文件',
        route: '/document',
        role: ['r'],
        condition: true
      },
      {
        icon: 'mdi-file-table-outline',
        name: '表单',
        route: '/sheet',
        role: ['r'],
        condition: true
      },
      {
        icon: 'mdi-tune',
        name: '设置',
        route: '/settings',
        role: ['r'],
        condition: true
      }
    ];
  }

  async mounted() {
    await ProjectService.getProjectList(this.authorization.userID);
  }
}
</script>
