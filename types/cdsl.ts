export interface Holding {
  type: string;
  isin: string;
  name: string;
  quantity: number;
  value: number;
};

export interface Cdsl {
  dpClientId?: string;
  status: string;
  holdings: Holding[];
  totalValue?: number;
  asOnDate?: string
};

export const mockCdsl: Cdsl = {
  status: "Y",
  dpClientId: "34342455",
  holdings: [
    {
      type: "01",
      isin: "INE208A01029",
      name: "ASHOK LEYLAND LIMITED - EQ NEW FV RE.1/-",
      quantity: 35,
      value: 8013.6
    },
    {
      type: "01",
      isin: "INE02RE01045",
      name: "BRAINBEES SOLUTIONS LIMITED - EQ NEW FV Rs.2/-",
      quantity: 32,
      value: 18796.8
    },
    {
      type: "01",
      isin: "INE0CU601026",
      name: "GMR POWER AND URBAN INFRA LIMITED - EQ NEW FV Rs.5/-",
      quantity: 92,
      value: 10444.76
    }
  ],
  totalValue: 1010749.26,
  asOnDate: "10-12-2024"
};
