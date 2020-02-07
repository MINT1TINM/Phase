class Group {
  id!: string;
  name!: string;
  description!: string;
  member!: {
    data: [];
  };
  createdAt!: string;
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
  id!: string;
  name!: string;
  phone!: string;
  address!: string;
}

export { Group, GroupMember, Department, DepartmentMember, Supplier };
