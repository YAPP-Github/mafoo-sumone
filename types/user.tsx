export interface ObjectedParams {
  top: string;
  bottom: string;
  nickName: string;
  partnerNickName: string;
  dDay: string;
  isConnected: string;
}

export type AsyncSearchParams = Promise<{ [key: string]: string }>;

export type SearchParams = { [key: string]: string };
