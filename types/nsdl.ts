export type Holding2 = {
  code: string;
  isin: string;
  name: string;
  holderType: string;
  quantity: number;
  value: number;
};

export type Summary = {
  date: string;
  totalValue: number;
};

export type Account = {
  dpId: string;
  name: string;
  address: string[];
  status: string;
  nri: string;
  freeze: string;
  boCategory: string;
};

export type ParsedData2 = {
  holdings: Holding2[];
  summary: Summary;
  account: Account;
};
