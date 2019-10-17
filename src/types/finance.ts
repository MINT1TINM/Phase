interface AuditProject {
  code: string;
  name: string;
  chargeName: string;
  chargeSno: string;
  balance: number;
  balanceSyear?: string;
}

interface Certificate {
  chargeSno: string;
  dAmount: number;
  jAmount: number;
  ord: string;
  sDay: string;
  sMonth: string;
  sYear: string;
  date: string;
  sabstract: string;
  subj: string;
  subjName: string;
  uniNo: string;
  uniPrjName: string;
  uniPrjOrder: string;
  pzds?: any[];
}

export { AuditProject, Certificate };
