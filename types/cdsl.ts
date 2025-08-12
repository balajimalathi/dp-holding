export type Holding = {
  isin: string;
  name: string;
  quantity: number;
  value: number;
};

export type ParsedData = {
  holdings: Holding[];
  totalValue: number;
  asOnDate: string;
};