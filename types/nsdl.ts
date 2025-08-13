export interface Holding2 {
  isin: string;
  name: string;
  beneficiary: string;
  quantity: number;
  value: number;
};

export interface TotalValueInfo {
  date: string;
  totalValue: number;
};

export interface ClientInfo {
  dpmClientId: string;
  name: string;
  address: string[];
  clientStatus: string;
  bsdaFlag: string;
  rgessFlag: string;
  secondHolderName: string;
  thirdHolderName: string;
  clientType: string;
  clientSubtype: string;
};

export interface Nsdl {
  status: string;
  holdings: Holding2[];
  totalValueInfo?: TotalValueInfo;
  lastCodDate?: string;
  clientInfo?: ClientInfo;
};

// export const nsdlData: Nsdl = {
//   holdings: [
//     {
//       isin: "INE263A01024",
//       name: "BHARAT ELECTRONIC- EQ",
//       quantity: 6,
//       holderType: "Beneficiary",
//       value: 1887,
//     },
//     {
//       isin: "INE171A01029",
//       name: "FEDERAL BANK EQ 2/-",
//       holderType: "Beneficiary",
//       quantity: 1996,
//       value: 426645,
//     },
//     {
//       isin: "IN0020220045",
//       name: "GOI SGB 31724 2030",
//       quantity: 1,
//       holderType: "Beneficiary",
//       value: 8178,
//     },
//     {
//       isin: "INE251H01024",
//       name: "GVK POWER - EQ RE 1",
//       quantity: 94,
//       holderType: "Beneficiary",
//       value: 474,
//     },
//     {
//       isin: "INE335Y01020",
//       name: "IRCTCL-EQ2/-",
//       quantity: 35,
//       holderType: "Beneficiary",
//       value: 29162,
//     },
//     {
//       isin: "INE146L01010",
//       name: "KIRLOSKAR OIL ENG- EQ",
//       quantity: 70,
//       holderType: "Beneficiary",
//       value: 82408,
//     },
//     {
//       isin: "INE683A01023",
//       name: "SOUTH INDIAN-EQ 1/-",
//       quantity: 182,
//       holderType: "Beneficiary",
//       value: 4778,
//     },
//     {
//       isin: "INE398A01010",
//       name: "VENKY'(INDIA) EQTY",
//       quantity: 10,
//       holderType: "Beneficiary",
//       value: 18145,
//     },
//     {
//       isin: "INE528G01035",
//       name: "YES BANK LTD-EQ2/-",
//       quantity: 10,
//       holderType: "Beneficiary",
//       value: 218,
//     },
//   ],
//   totalValue: 571893.98,
//   asOnDate: "09-DEC-2024",
// }