declare namespace API {
  export interface Response<T = null> {
    code?: number;
    msg?: string;
    data: T;
  }
  export interface ValidatePayload {
    id: number;
    username: string;
    level?: string;
    iat?: number;
    exp?: number;
  }
}
