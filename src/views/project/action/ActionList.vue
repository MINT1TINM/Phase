<template>
  <ActionDefineListFrame :projectID="currentProject.id" />
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import ActionDefineListFrame from '@/components/flow/action/ActionListFrame.vue';

import { namespace } from 'vuex-class';
import { Project } from '@/types/project';
const projectModule = namespace('project');

@Component({
  components: {
    ActionDefineListFrame
  }
})
export default class ProjectActionDefineView extends Vue {
  @projectModule.Getter('currentProject') currentProject!: Project;
}
</script>
