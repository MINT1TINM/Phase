import { UserInfo } from './user';

class Group {
  id!: string;
  name!: string;
  description!: string;
  member!: {
    data: [];
  };
  createdAt!: string;
  level!: number;
  parent!: string;
}

class GroupMember {
  userID!: string;
  nickName!: string;
  headImgURL!: string;
  tags!: string[];
}

class Department {
  id!: string;
  departmentID!: string;
  member!: {
    data: [];
  };
}

class DepartmentMember {
  userID!: string;
  nickName!: string;
  headImgURL!: string;
  tags!: string[];
}

class Supplier {
  constructor() {
    this.member = { data: [] };
  }

  id!: string;
  name!: string;
  phone!: string;
  address!: string;
  member!: {
    data: SupplierMember[];
  };
  extraInfo!: any;
}

class SupplierMember {
  userID!: string;
  nickName!: string;
}

export {
  Group,
  GroupMember,
  Department,
  DepartmentMember,
  Supplier,
  SupplierMember
};
