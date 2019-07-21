
<template>
  <div style="width:100%">
    <v-layout row wrap>
      <v-container>
        <v-flex xs8 offset-2>
          <v-form ref="userProfile">
            <v-list>
              <v-list-item>
                <v-subheader style="padding:0">头像</v-subheader>
              </v-list-item>
              <v-list-item>
                <v-avatar size="64">
                  <img :src="userInfo.headImgURL" />
                </v-avatar>
                <v-btn class="ml-5" outlined color="primary">修改</v-btn>
              </v-list-item>
            </v-list>
            <v-divider class="my-3"></v-divider>

            <v-layout class="my-4" row v-for="(item,i) in profileList" :key="`profile-${i}`">
              <v-flex xs4>
                <v-subheader>{{item.title}}</v-subheader>
              </v-flex>
              <v-flex xs8>
                <!-- text-field -->
                <v-text-field
                  v-if="item.type=='text-field'"
                  class="text-field-semidense"
                  v-model="userInfo[item.content]"
                  :disabled="item.disabled"
                  single-line
                  outlined
                  hide-details
                ></v-text-field>
                <!-- select -->
                <v-select
                  v-else-if="item.type=='select'"
                  class="text-field-semidense"
                  :items="item.list"
                  v-model="userInfo[item.content]"
                  outlined
                  hide-details
                  style="line-height:14px"
                  item-text="title"
                  item-value="value"
                ></v-select>
                <!-- date -->
                <v-menu
                  ref="menu"
                  v-if="item.type=='date'"
                  v-model="dateMenu[i]"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      class="text-field-semidense"
                      outlined
                      v-model="userInfo[item.content]"
                      readonly
                      hide-details
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    ref="picker"
                    v-model="userInfo[item.content]"
                    :max="new Date().toISOString().substr(0, 10)"
                    min="1900-01-01"
                    @change="dateMenu[i]=false"
                  ></v-date-picker>
                </v-menu>
              </v-flex>
            </v-layout>
          </v-form>
          <v-layout justify-center class="pt-5">
            <v-flex xs6>
              <v-btn block rounded depressed color="primary">保存</v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-container>
    </v-layout>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      dateMenu: [],
      profileList: [
        {
          type: "text-field",
          title: "用户名",
          content: "username",
          disabled: true
        },
        {
          type: "text-field",
          title: "昵称",
          content: "nickName"
        },
        {
          type: "select",
          title: "性别",
          content: "sex",
          list: [
            {
              value: 0,
              title: "男"
            },
            {
              value: 1,
              title: "女"
            }
          ]
        },
        {
          type: "date",
          title: "生日",
          content: "birthday"
        }
      ]
    };
  },
  methods: {},
  mounted() {},
  computed: {
    ...mapGetters({
      userInfo: "user/userInfo"
    })
  }
};
</script>

<style>
</style>
