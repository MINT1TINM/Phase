import Vue from 'vue';

import basicService from '@/service/basicService';
import store from '@/store/store';

const vue = new Vue();

class FileService {
  public static async createCatalog(
    projectID: string,
    path: string[],
    name: string,
  ) {
    const rsp = await basicService.postRequest('/file/catalog', {
      projectID,
      path,
      name,
    });
    if (rsp.msg === 'success') {
      // @ts-ignore
      vue.$snackbar.show('创建成功');
    }
    return rsp;
  }

  public static async renameCatalog(
    projectID: string,
    path: string[],
    name: string,
  ) {
    const rsp = await basicService.putRequest('/file/catalog', {
      projectID,
      path,
      name,
    });
    if (rsp.msg === 'success') {
      // @ts-ignore
      vue.$snackbar.show('重命名成功');
    }
    return rsp;
  }

  public static async getFile(projectID: string, path: string[]) {
    const rsp = await basicService.getRequest('/file/catalog', {
      projectID,
      path,
    });
    store.commit('file/updateFileList', rsp.fileList);
    return rsp;
  }

  public static async uploadFile(file: any, path: string[], projectID: string) {
    // store.commit("system/updateUploadPercent", 0);
    const fileForm = new FormData();
    fileForm.append('path', path.toString());
    fileForm.append('file', file);
    fileForm.append('projectID', projectID);

    const rsp = await basicService.postRequest('/file', fileForm);
    // store.commit("system/updateUploadPercent", 0);
    return rsp;
  }

  public static async deleteFile(path: string[], projectID: string) {
    const rsp = await basicService.deleteRequest('/file', {
      path,
      projectID,
    });
    if (rsp.msg === 'success') {
      // @ts-ignore
      vue.$snackbar.show('删除成功');
    }
    return rsp;
  }
}

export default FileService;
