interface Field {
  title: string;
  type: string;
  name: string;
  disabled?: boolean;
  dense?: boolean;
}

interface Template {
  name: string;
  field: { data: Field[] };
}

interface Sheet {
  id: string;
  name: string;
  projectID?: string;
  templateID?: string;
  userID?: string;
  updatedAt?: string;
  craetedAt?: string;
  content: {};
}

export { Field, Template, Sheet };
