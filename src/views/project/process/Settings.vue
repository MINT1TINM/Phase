<template>
  <div style="height:calc(100vh - 113px)">
    <v-layout fill-height justify-center>
      <v-flex md6>
        <v-card class="mt-5">
          <v-card-title class="subtitle-1 font-weight-bold">信息</v-card-title>
          <v-container fluid>
            <dim-form :formContent="settingsContent" :target="settings"></dim-form>
          </v-container>
        </v-card>
        <v-card class="mt-5">
          <v-card-title class="subtitle-1 font-weight-bold">成员</v-card-title>
          <v-container fluid style="padding-top:0">
            <v-autocomplete
              v-model="processMember"
              :items="projectMember"
              outlined
              single-line
              chips
              color="blue-grey lighten-2"
              label="Select"
              item-text="name"
              item-value="name"
              multiple
            >
              <template v-slot:selection="data">
                <v-chip
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  :close="data.item.role==1?false:true"
                  @click="data.select"
                  @click:close="removeMember(data.item)"
                >
                  <v-avatar left>
                    <v-img :src="data.item.avatar"></v-img>
                  </v-avatar>
                  {{ data.item.name }}
                </v-chip>
              </template>
              <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-item-content v-text="data.item"></v-list-item-content>
                </template>
                <template v-else>
                  <v-list-item-avatar size="30">
                    <img :src="data.item.avatar" />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title class="subtitle-1 font-weight-black" v-html="data.item.name"></v-list-item-title>
                  </v-list-item-content>
                </template>
              </template>
            </v-autocomplete>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      settingsContent: [
        {
          type: "text-field",
          title: "名称",
          content: "name"
        },
        {
          type: "select",
          title: "标签",
          content: "tags",
          list: []
        },
        {
          type: "date-range",
          title: "时间范围",
          content: "dateRange"
        }
      ],
      projectMember: [{ name: "MINT", role: 1 }],
      processMember: [{ name: "MINT", role: 1 }],
      settings: {
        name: "",
        dateRange: [
          Math.round(new Date().getTime()),
          Math.round(new Date().getTime())
        ]
      },
      range: []
    };
  },
  methods: {
    async removeMember(item) {
      const index = this.processMember.indexOf(item.name);
      if (index >= 0) this.processMember.splice(index, 1);
    },
    async addMember() {}
  },
  computed: {}
};
</script>

<style>
</style>
