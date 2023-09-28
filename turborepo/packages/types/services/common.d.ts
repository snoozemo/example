declare namespace Api {
  export interface GetListVO<T> {
    success: boolean;
    total: number;
    data: T[];
  }

  export interface ResultVO<T> {
    code: number;
    msg: string;
    data: T;
  }

  export interface ListDto {
    current: number;
    pageSize: number;
  }
}
