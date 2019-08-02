<template>
  <v-layout fill-height>
    <transition appear appear-active-class="fade-up-enter">
      <v-flex xs5 class="inner-sidebar-withoutpadding">
        <v-container fluid style="padding:30px">
          <v-form ref="taskInfoForm">
            <v-text-field
              class="mb-5 text-field-semidense"
              v-model="taskInfo.name"
              :autofocus="taskInfo.name?false:true"
              label="任务"
              outlined
              hide-details
            ></v-text-field>
            <v-autocomplete
              v-model="taskInfo.tags"
              :items="tagList"
              outlined
              chips
              label="标签"
              class="text-field-semidense mb-5"
              hide-details
              item-text="text"
              item-value="text"
              multiple
              dense
            >
              <template v-slot:selection="data">
                <v-chip
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  close
                  @click="data.select"
                  @click:close="remove(data.item)"
                >
                  <v-avatar size="16" left :color="data.item.color"></v-avatar>
                  {{ data.item.text }}
                </v-chip>
              </template>
              <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-item-content v-text="data.item"></v-list-item-content>
                </template>
                <template v-else>
                  <v-list-item-avatar>
                    <v-avatar size="16" :color="data.item.color" />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-html="data.item.text"></v-list-item-title>
                  </v-list-item-content>
                </template>
              </template>
            </v-autocomplete>
            <v-divider class="mb-5"></v-divider>
            <v-select
              v-model="taskInfo.status"
              outlined
              hide-details
              dense
              :items="statusList"
              item-text="text"
              item-value="value"
              label="状态"
              class="mb-5 text-field-semidense"
            ></v-select>
            <v-layout class="mb-5">
              <v-flex xs6 class="pr-2">
                <v-dialog
                  ref="deadlineDatePickerDialog"
                  v-model="deadlineDatePicker"
                  :return-value.sync="taskInfo.deadlineDate"
                  persistent
                  full-width
                  width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      outlined
                      hide-details
                      v-model="taskInfo.deadlineDate"
                      class="text-field-semidense"
                      label="截止日期"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="taskInfo.deadlineDate" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn rounded text @click="deadlineDatePicker = false">取消</v-btn>
                    <v-btn
                      rounded
                      text
                      color="primary"
                      @click="$refs.deadlineDatePickerDialog.save(taskInfo.deadlineDate)"
                    >确认</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-flex>
              <v-flex xs6 class="pl-2">
                <v-dialog
                  ref="dialog"
                  v-model="deadlineTimePicker"
                  :return-value.sync="taskInfo.deadlineTime"
                  persistent
                  full-width
                  width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      outlined
                      hide-details
                      v-model="taskInfo.deadlineTime"
                      label="截止时间"
                      class="text-field-semidense"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="deadlineTimePicker"
                    v-model="taskInfo.deadlineTime"
                    full-width
                    format="24hr"
                  >
                    <v-spacer></v-spacer>
                    <v-btn text rounded @click="deadlineTimePicker = false">取消</v-btn>
                    <v-btn
                      text
                      rounded
                      color="primary"
                      @click="$refs.dialog.save(taskInfo.deadlineTime)"
                    >确认</v-btn>
                  </v-time-picker>
                </v-dialog>
              </v-flex>
            </v-layout>
            <v-text-field
              disabled
              v-model="taskInfo.creator"
              text-field-semidense
              class="text-field-semidense mb-5"
              label="创建人"
              outlined
              hide-details
            ></v-text-field>
            <v-textarea class="text-field-semidense mb-5" outlined label="备注"></v-textarea>
          </v-form>
        </v-container>
      </v-flex>
    </transition>
    <v-flex xs7></v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      taskInfo: {},
      deadlineDatePicker: false,
      deadlineTimePicker: false,
      statusList: [
        {
          text: "已完成",
          value: 1
        },
        {
          text: "未完成",
          value: 0
        }
      ],
      tagList: [
        {
          text: "红色",
          color: "red"
        }
      ]
    };
  },
  mounted() {}
};
</script>

<style>
</style>
