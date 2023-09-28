declare namespace Api {
  export interface DictsItemsVo {
    creator: string;
    desc: string;
    id: string;
    key: string;
    name: string;
    pid?: string;
    value: string;
  }
  export interface DictEnumsVo {
    children?: DictEnumsVo[];
    id: number;
    label: string;
    pid?: number;
    value: string;
  }
  export interface DictVo extends DictsItemsVo {
    createAt: string;
  }
  export interface PostDictDto {
    desc?: string;
    key: string;
    name: string;
    value: string;
  }
  export interface PutDictDto extends PostDictDto {
    id: number;
  }
  export interface GetDictDto {
    id: number;
  }
  export interface GetDictsDto extends ListDto {
    createUserId?: number;
    key?: string;
    name?: string;
    value?: string;
  }
  export interface DeleteDictDto extends GetDictDto {}
}
