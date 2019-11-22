import { Field, Sheet, Template } from '@/types/sheet';

interface State {
  sheetTemplate: {
    name: string;
    field: { data: Field[] };
  };
  currentTemplateID: string;
  typeList: any[];
  sheetList: Sheet[];
  viewMode: string;
}

const state: State = {
  sheetTemplate: {
    name: '未命名模版',
    field: {
      data: []
    }
  },
  currentTemplateID: '',
  typeList: [
    {
      name: '键值型',
      type: 'key'
    },
    {
      name: '列表型',
      type: 'list'
    }
  ],
  sheetList: [],
  viewMode: 'grid'
};

const getters = {
  sheetTemplate: (s: State) => s.sheetTemplate,
  currentTemplateID: (s: State) => s.currentTemplateID,
  typeList: (s: State) => s.typeList,
  type: (s: State) => (type: string) =>
    s.typeList.find((e: any) => e.type === type),
  sheetList: (s: State) => s.sheetList,
  viewMode: (s: State) => s.viewMode
};

const mutations = {
  insertNewEmptyField: (s: State) => {
    s.sheetTemplate.field.data.push({
      title: '',
      type: '',
      name: '',
      list: []
    });
  },
  updateSheetTemplate: (s: State, template: Template) => {
    s.sheetTemplate = template;
  },
  updateCurrentTemplateID: (s: State, id: string) => {
    s.currentTemplateID = id;
  },
  restoreSheetTemplate: (s: State) => {
    s.sheetTemplate = {
      name: '未命名模版',
      field: {
        data: []
      }
    };
  },
  updateSheetList: (s: State, sheetList: Sheet[]) => {
    s.sheetList = sheetList;
  },
  updateViewMode: (s: State, viewMode: string) => {
    s.viewMode = viewMode;
  }
};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
