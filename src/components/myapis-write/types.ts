export interface IMyApiWrite {
  id: string;
  writer: string;
  contents: string;
  title: string;
}

export interface IMyApiAddProps {
  isEdit: boolean;
}
