export interface Holding {
  type: string;
  isin: string;
  name: string;
  quantity: number;
  value: number;
};

export interface Cdsl {
  status: string;
  holdings: Holding[];
  totalValue?: number;
  asOnDate?: string
};

// export const cdslData: Cdsl = {
//   holdings: [
//     {
//       code: "01",
//       isin: "INE208A01029",
//       name: "ASHOK LEYLAND LIMITED - EQ NEW FV RE.1/-",
//       holderType: "Beneficiary",
//       quantity: 35,
//       value: 8013.6,
//     },
//     {
//       code: "01",
//       isin: "INE02RE01045",
//       name: "BRAINBEES SOLUTIONS LIMITED - EQ NEW FV Rs.2/-",
//       holderType: "Beneficiary",
//       quantity: 32,
//       value: 18796.8,
//     },
//   ],
//   summary: {
//     date: "10-12-2024",
//     totalValue: 1010749.26,
//   },
//   account: {
//     dpId: "10336632",
//     name: "BELSON P KURIAN",
//     address: ["PAZHAYAMPILLIL HOUSE", "SANTHIPURAM", "PERUVA P O", "KOTTAYAM, KERALA"],
//     status: "Active",
//     nri: "NO",
//     freeze: "NO",
//     boCategory: "Resident",
//   },
//   totalValue: 0,
//   asOnDate: ""
// };