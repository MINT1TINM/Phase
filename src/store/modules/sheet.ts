import { Field, Sheet, Template } from '@/types/sheet';

class State {
  sheetTemplate?: Template;
  currentTemplateID?: string;
  typeList?: any[];
  sheetList?: Sheet[];
  viewMode?: string;
}

const state: State = {
  sheetTemplate: new Template(),
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
    s.typeList!.find((e: any) => e.type === type),
  sheetList: (s: State) => s.sheetList,
  viewMode: (s: State) => s.viewMode
};

const mutations = {
  insertNewEmptyField: (s: State) => {
    s.sheetTemplate!.field!.data.push(new Field());
  },
  updateSheetTemplate: (s: State, template: Template) => {
    s.sheetTemplate = template!;
  },
  updateCurrentTemplateID: (s: State, id: string) => {
    s.currentTemplateID = id;
  },
  restoreSheetTemplate: (s: State) => {
    s.sheetTemplate = new Template();
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
