import { Track } from '@/types/project';
import BasicService from './basicService';

class TrackService {
  static async createTrack(c: Track) {
    const rsp = await BasicService.postRequest('/track', c);
    if (rsp.msg === 'success') {
      return Promise.resolve(rsp.msg);
    }
    return Promise.reject(rsp.msg);
  }

  static async getTrackList(page: number, size: number, c?: Track) {
    const rsp = await BasicService.getRequest('/track', {
      page,
      size,
      projectUUID: c?.projectUUID,
      name: c?.name
    });
    if (rsp.msg === 'success') {
      return Promise.resolve(rsp.track as Track[]);
    }
    return Promise.reject([]);
  }

  static async getOneTrack(id: string) {
    const rsp = await BasicService.getRequest('/track/info', {
      id
    });
    if (rsp.msg === 'success') {
      return Promise.resolve(rsp.track as Track);
    }
    return Promise.reject(new Track());
  }

  static async updateTrack(c: Track) {
    const rsp = await BasicService.putRequest('/track', c);
    if (rsp.msg === 'success') {
      return Promise.resolve(rsp.msg);
    }
    return Promise.reject(rsp.msg);
  }

  static async deleteTrack(id: string) {
    const rsp = await BasicService.deleteRequest('/track', {
      id
    });
    if (rsp.msg === 'success') {
      return Promise.resolve(rsp.msg);
    }
    return Promise.reject(rsp.msg);
  }
}

export default TrackService;
