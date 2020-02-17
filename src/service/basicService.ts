import axios from 'axios';

import Vue from 'vue';
import store from '@/store/store';

const vue = new Vue() as any;

class BasicService {
  static async getData(rsp: any) {
    let rspData = rsp;
    if (rsp.data) {
      rspData = rsp.data;
    }
    if (rsp.response) {
      console.log(rsp.response.status);
      if (rsp.response.status === 402) {
        vue.$snack('令牌过期，请重新登录');

        store.commit('user/clearAuthorization');
        store.commit('system/toggleFullScreenLoading', false);
        window.location.href = '/login';
      }
    }
    // err => no data
    return rspData;
  }

  static async getRequest(url: string, params: any) {
    store.commit('system/toggleLoading', true);
    try {
      const rsp = await axios.get(`/api${url}`, {
        params
      });
      const json = rsp.data;
      const msg = { url, params, rsp: json };
      console.log(msg);

      store.commit('system/toggleLoading', false);
      return this.getData(rsp);
    } catch (err) {
      store.commit('system/toggleLoading', false);
      return this.getData(err);
    }
  }

  static async postRequest(url: string, params: any) {
    store.commit('system/toggleLoading', true);
    try {
      const config = {
        onUploadProgress: (progressEvent: any) => {
          const totalLength = progressEvent.lengthComputable
            ? progressEvent.total
            : progressEvent.target.getResponseHeader('content-length') ||
              progressEvent.target.getResponseHeader(
                'x-decompressed-content-length'
              );

          const complete = `${(progressEvent.loaded / totalLength) * 100 ||
            0}%`;
          store.commit('system/updateUploadPercent', progressEvent.loaded);
        }
      };
      const rsp = await axios.post(`/api${url}`, params, config);
      const json = rsp.data;
      const msg = { url, params, rsp: json };
      console.log(msg);
      store.commit('system/toggleLoading', false);
      return this.getData(rsp);
    } catch (err) {
      store.commit('system/toggleLoading', false);
      return this.getData(err);
    }
  }

  static async putRequest(url: string, params: any) {
    store.commit('system/toggleLoading', true);
    try {
      const rsp = await axios.put(`/api${url}`, params);
      const json = rsp.data;
      const msg = { url, params, rsp: json };
      console.log(msg);
      store.commit('system/toggleLoading', false);
      return this.getData(rsp);
    } catch (err) {
      store.commit('system/toggleLoading', false);
      return this.getData(err);
    }
  }

  static async deleteRequest(url: string, params: any) {
    store.commit('system/toggleLoading', true);
    try {
      const rsp = await axios.delete(`/api${url}`, {
        params
      });
      const json = rsp.data;
      const msg = { url, params, rsp: json };
      store.commit('system/toggleLoading', false);
      console.log(msg);

      return this.getData(rsp);
    } catch (err) {
      store.commit('system/toggleLoading', false);
      return this.getData(err);
    }
  }
}

export default BasicService;
