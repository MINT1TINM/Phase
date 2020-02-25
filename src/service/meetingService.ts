import { Meeting } from '@/types/project';
import BasicService from './basicService';

class MeetingService {
  static async createMeeting(c: Meeting) {
    c.time = new Date().toISOString().slice(0, 10);
    const rsp = await BasicService.postRequest('/meeting', c);
    if (rsp.msg === 'success') {
      return Promise.resolve(rsp.msg);
    }
    return Promise.reject(rsp.msg);
  }

  static async getMeetingList(page: number, size: number, c?: Meeting) {
    const rsp = await BasicService.getRequest('/meeting', {
      page,
      size,
      projectUUID: c?.projectUUID,
      name: c?.name
    });
    if (rsp.msg === 'success') {
      return Promise.resolve(rsp.meeting as Meeting[]);
    }
    return Promise.reject([]);
  }

  static async getOneMeeting(id: string) {
    const rsp = await BasicService.getRequest('/meeting/info', {
      id
    });
    if (rsp.msg === 'success') {
      return Promise.resolve(rsp.meeting as Meeting);
    }
    return Promise.reject(new Meeting());
  }

  static async updateMeeting(c: Meeting) {
    const rsp = await BasicService.putRequest('/meeting', c);
    if (rsp.msg === 'success') {
      return Promise.resolve(rsp.msg);
    }
    return Promise.reject(rsp.msg);
  }

  static async deleteMeeting(id: string) {
    const rsp = await BasicService.deleteRequest('/meeting', {
      id
    });
    if (rsp.msg === 'success') {
      return Promise.resolve(rsp.msg);
    }
    return Promise.reject(rsp.msg);
  }
}

export default MeetingService;
