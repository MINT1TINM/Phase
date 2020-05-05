<template>
  <ActionInstanceListFrame :projectID="currentProject.id" />
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import ActionInstanceListFrame from '@/components/flow/action/InstanceListFrame.vue';

import { namespace } from 'vuex-class';
import { Project } from '@/types/project';
const projectModule = namespace('project');

@Component({
  components: {
    ActionInstanceListFrame
  }
})
export default class ProjectActionInstanceView extends Vue {
  @projectModule.Getter('currentProject') currentProject!: Project;
}
</script>
