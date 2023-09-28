declare namespace Api {
  export interface EnumType {
    label: React.Key;
    value: React.Key;
    children?: EnumType[];
  }
}
