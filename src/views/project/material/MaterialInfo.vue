<template>
  <div>
    <v-toolbar dense>
      <v-toolbar-title class="subtitle-1">{{ material.name }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="$router.push({ path: `/material` })"
        ><v-icon size="20">mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <div>
      <v-container>
        <v-row dense>
          <v-col cols="8">
            <v-card>
              <v-toolbar dense flat class="transparent">
                <v-toolbar-title class="subtitle-1 font-weight-black"
                  >材料信息</v-toolbar-title
                >
              </v-toolbar>
              <v-container fluid class="py-0">
                <dim-form
                  :target="materialShow"
                  :formContent="materialInfoContent"
                ></dim-form>

                <v-row justify="center" class="py-3">
                  <v-flex xs6>
                    <v-btn
                      @click="updateMaterial"
                      block
                      rounded
                      color="primary"
                      depressed
                      >保存</v-btn
                    >
                  </v-flex>
                </v-row>
              </v-container>
            </v-card>
          </v-col>

          <v-col cols="4">
            <v-card>
              <v-toolbar dense flat class="transparent">
                <v-toolbar-title class="subtitle-1 font-weight-black"
                  >供应商信息</v-toolbar-title
                >
              </v-toolbar>
            </v-card>
          </v-col>

          <v-col cols="8">
            <v-card>
              <v-toolbar dense flat class="transparent">
                <v-toolbar-title class="subtitle-1 font-weight-black"
                  >操作</v-toolbar-title
                >
              </v-toolbar>
              <v-container fluid>
                <v-row justify="center" class="py-3">
                  <v-flex xs6>
                    <v-btn
                      @click="deleteMaterial"
                      block
                      rounded
                      color="error"
                      depressed
                      >删除</v-btn
                    >
                  </v-flex>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Material } from '@/types/project';
import MaterialService from '@/service/materialService';

@Component
export default class ProjectMaterialInfo extends Vue {
  material: Material = new Material();

  materialInfoContent = [
    {
      subheader: '基本'
    },
    {
      type: 'text-field',
      name: 'name',
      title: '名称'
    },
    {
      type: 'text-field',
      name: 'unit',
      title: '单位'
    },
    {
      subheader: '来源'
    },
    {
      type: 'text-field',
      name: 'region',
      title: '省'
    },
    {
      type: 'text-field',
      name: 'city',
      title: '市'
    },
    {
      type: 'text-field',
      name: 'brand',
      title: '品牌'
    },
    {
      type: 'text-field',
      name: 'specification',
      title: '规格'
    },
    {
      subheader: '价格'
    },
    {
      type: 'text-field',
      name: 'marketPrice',
      title: '市场价'
    },
    {
      type: 'text-field',
      name: 'price',
      title: '面价'
    },
    {
      type: 'text-field',
      name: 'taxRate',
      title: '税率'
    },
    {
      type: 'date-picker',
      name: 'inquiryTime',
      title: '询价时间'
    }
  ];

  async getMaterialInfo() {
    this.material = await MaterialService.getOneMaterial(
      this.$route.params.materialID
    );
  }

  async deleteMaterial() {
    try {
      await MaterialService.deleteMaterial(this.materialShow.id);
      this.$router.push({ path: `/material` });
      this.$snack('删除成功');
    } catch (_) {
      this.$snack('删除失败');
    }
  }

  async updateMaterial() {
    try {
      await MaterialService.updateMaterial(this.materialShow);
      this.$snack('更新成功');
    } catch (_) {
      this.$snack('更新失败');
    }
  }

  get materialShow() {
    const m = this.material;
    m.inquiryTime = new Date(m.inquiryTime || 0).toISOString().slice(0, 10);
    return m;
  }

  set materialShow(v: Material) {
    this.materialShow = v;
  }

  mounted() {
    this.getMaterialInfo();
  }
}
</script>

<style scoped></style>
