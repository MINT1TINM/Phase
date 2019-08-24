interface Field {
  title: string;
  type: string;
  name: string;
  disabled?: boolean;
  dense?: boolean;
  list?: [];
}

interface Template {
  name: string;
  field: { data: Field[] };
  type: string;
}

interface Sheet {
  id: string;
  name: string;
  projectID?: string;
  templateID?: string;
  userID?: string;
  updatedAt?: string;
  craetedAt?: string;
  content: any;
}

export { Field, Template, Sheet };
