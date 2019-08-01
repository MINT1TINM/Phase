<template>
  <div style="height:calc(100vh - 113px)">
    <v-layout fill-height justify-center>
      <v-flex md6>
        <v-card class="mt-5">
          <v-container fluid>
            <dim-form :formContent="settingsContent" :target="settings" keyName="process-settings"></dim-form>
            <v-layout style="margin-top:70px">
              <v-flex xs3>
                <v-subheader>时间范围</v-subheader>
              </v-flex>
              <v-flex xs9>
                <v-range-slider
                  :max="max"
                  :min="min"
                  thumb-label="always"
                  v-model="range"
                  :thumb-size="64"
                  hide-details
                  class="align-center text-center"
                >
                  <template v-slot:thumb-label="props">
                    <small class="font-weight-black">{{ props.value | format("yyyy") }}</small>
                    <br />
                    <small class="font-weight-black">{{ props.value | format("MM/dd") }}</small>
                  </template>
                </v-range-slider>
              </v-flex>
            </v-layout>
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
          subheader: "信息"
        },
        {
          type: "text-field",
          title: "名称",
          content: "name"
        }
      ],
      settings: {
        name: ""
      },
      range: []
    };
  },

  computed: {
    processId() {
      return Number(this.$route.params.processId);
    },
    max() {
      return this.range[1] + 500000000;
    },
    min() {
      return this.range[0] - 500000000;
    }
  },
  mounted() {
    this.range = [
      Math.round(new Date().getTime()),
      Math.round(new Date().getTime())
    ];
  }
};
</script>

<style>
</style>
