interface Group {
  id: string;
  name: string;
  description: string;
  member: [];
  createdAt: string;
}

interface GroupMember {
  userID: string;
  tags: string[];
}

export { Group, GroupMember };
