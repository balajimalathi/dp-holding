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
  dpClientId?: string;
  holdings: Holding2[];
  totalValueInfo?: TotalValueInfo;
  lastCodDate?: string;
  clientInfo?: ClientInfo;
};

export const mockNsdl: Nsdl = {
  status: "Y",
  dpClientId: "10336632",
  holdings: [
    {
      isin: "INE208A01029",
      name: "ASHOK LEYLAND LIMITED - EQ NEW FV RE.1/-",
      beneficiary: "Beneficiary",
      quantity: 35,
      value: 8013.6
    },
    {
      isin: "INE02RE01045",
      name: "BRAINBEES SOLUTIONS LIMITED - EQ NEW FV Rs.2/-",
      beneficiary: "Beneficiary",
      quantity: 32,
      value: 18796.8
    },
    {
      isin: "INE0CU601026",
      name: "GMR POWER AND URBAN INFRA LIMITED - EQ NEW FV Rs.5/-",
      beneficiary: "Beneficiary",
      quantity: 92,
      value: 10444.76
    },
    {
      isin: "IN0020200377",
      name: "GOVERNMENT OF INDIA - SGB 05JN29 S IX 2.50 FV RS 5000",
      beneficiary: "Beneficiary",
      quantity: 5,
      value: 40644.4
    },
    {
      isin: "INE528G01035",
      name: "YES BANK LIMITED - EQ NEW FV RS. 2/-",
      beneficiary: "Beneficiary",
      quantity: 1000,
      value: 21600
    },
    {
      isin: "INE02RE01045",
      name: "BRAINBEES SOLUTIONS LIMITED - EQ NEW FV Rs.2/-",
      beneficiary: "Beneficiary",
      quantity: 32,
      value: 18796.8
    },
    {
      isin: "INE0CU601026",
      name: "GMR POWER AND URBAN INFRA LIMITED - EQ NEW FV Rs.5/-",
      beneficiary: "Beneficiary",
      quantity: 92,
      value: 10444.76
    },
    {
      isin: "IN0020200377",
      name: "GOVERNMENT OF INDIA - SGB 05JN29 S IX 2.50 FV RS 5000",
      beneficiary: "Beneficiary",
      quantity: 5,
      value: 40644.4
    },
    {
      isin: "INE528G01035",
      name: "YES BANK LIMITED - EQ NEW FV RS. 2/-",
      beneficiary: "Beneficiary",
      quantity: 1000,
      value: 21600
    },
    {
      isin: "INE02RE01045",
      name: "BRAINBEES SOLUTIONS LIMITED - EQ NEW FV Rs.2/-",
      beneficiary: "Beneficiary",
      quantity: 32,
      value: 18796.8
    },
    {
      isin: "INE0CU601026",
      name: "GMR POWER AND URBAN INFRA LIMITED - EQ NEW FV Rs.5/-",
      beneficiary: "Beneficiary",
      quantity: 92,
      value: 10444.76
    },
    {
      isin: "IN0020200377",
      name: "GOVERNMENT OF INDIA - SGB 05JN29 S IX 2.50 FV RS 5000",
      beneficiary: "Beneficiary",
      quantity: 5,
      value: 40644.4
    },
    {
      isin: "INE528G01035",
      name: "YES BANK LIMITED - EQ NEW FV RS. 2/-",
      beneficiary: "Beneficiary",
      quantity: 1000,
      value: 21600
    },
    {
      isin: "INE02RE01045",
      name: "BRAINBEES SOLUTIONS LIMITED - EQ NEW FV Rs.2/-",
      beneficiary: "Beneficiary",
      quantity: 32,
      value: 18796.8
    },
    {
      isin: "INE0CU601026",
      name: "GMR POWER AND URBAN INFRA LIMITED - EQ NEW FV Rs.5/-",
      beneficiary: "Beneficiary",
      quantity: 92,
      value: 10444.76
    },
    {
      isin: "IN0020200377",
      name: "GOVERNMENT OF INDIA - SGB 05JN29 S IX 2.50 FV RS 5000",
      beneficiary: "Beneficiary",
      quantity: 5,
      value: 40644.4
    },
    {
      isin: "INE528G01035",
      name: "YES BANK LIMITED - EQ NEW FV RS. 2/-",
      beneficiary: "Beneficiary",
      quantity: 1000,
      value: 21600
    },
    {
      isin: "INE02RE01045",
      name: "BRAINBEES SOLUTIONS LIMITED - EQ NEW FV Rs.2/-",
      beneficiary: "Beneficiary",
      quantity: 32,
      value: 18796.8
    },
    {
      isin: "INE0CU601026",
      name: "GMR POWER AND URBAN INFRA LIMITED - EQ NEW FV Rs.5/-",
      beneficiary: "Beneficiary",
      quantity: 92,
      value: 10444.76
    },
    {
      isin: "IN0020200377",
      name: "GOVERNMENT OF INDIA - SGB 05JN29 S IX 2.50 FV RS 5000",
      beneficiary: "Beneficiary",
      quantity: 5,
      value: 40644.4
    },
    {
      isin: "INE528G01035",
      name: "YES BANK LIMITED - EQ NEW FV RS. 2/-",
      beneficiary: "Beneficiary",
      quantity: 1000,
      value: 21600
    },
    {
      isin: "INE02RE01045",
      name: "BRAINBEES SOLUTIONS LIMITED - EQ NEW FV Rs.2/-",
      beneficiary: "Beneficiary",
      quantity: 32,
      value: 18796.8
    },
    {
      isin: "INE0CU601026",
      name: "GMR POWER AND URBAN INFRA LIMITED - EQ NEW FV Rs.5/-",
      beneficiary: "Beneficiary",
      quantity: 92,
      value: 10444.76
    },
    {
      isin: "IN0020200377",
      name: "GOVERNMENT OF INDIA - SGB 05JN29 S IX 2.50 FV RS 5000",
      beneficiary: "Beneficiary",
      quantity: 5,
      value: 40644.4
    },
    {
      isin: "INE528G01035",
      name: "YES BANK LIMITED - EQ NEW FV RS. 2/-",
      beneficiary: "Beneficiary",
      quantity: 1000,
      value: 21600
    },
    {
      isin: "INE02RE01045",
      name: "BRAINBEES SOLUTIONS LIMITED - EQ NEW FV Rs.2/-",
      beneficiary: "Beneficiary",
      quantity: 32,
      value: 18796.8
    },
    {
      isin: "INE0CU601026",
      name: "GMR POWER AND URBAN INFRA LIMITED - EQ NEW FV Rs.5/-",
      beneficiary: "Beneficiary",
      quantity: 92,
      value: 10444.76
    },
    {
      isin: "IN0020200377",
      name: "GOVERNMENT OF INDIA - SGB 05JN29 S IX 2.50 FV RS 5000",
      beneficiary: "Beneficiary",
      quantity: 5,
      value: 40644.4
    },
    {
      isin: "INE528G01035",
      name: "YES BANK LIMITED - EQ NEW FV RS. 2/-",
      beneficiary: "Beneficiary",
      quantity: 1000,
      value: 21600
    },
    {
      isin: "INE02RE01045",
      name: "BRAINBEES SOLUTIONS LIMITED - EQ NEW FV Rs.2/-",
      beneficiary: "Beneficiary",
      quantity: 32,
      value: 18796.8
    },
    {
      isin: "INE0CU601026",
      name: "GMR POWER AND URBAN INFRA LIMITED - EQ NEW FV Rs.5/-",
      beneficiary: "Beneficiary",
      quantity: 92,
      value: 10444.76
    },
    {
      isin: "IN0020200377",
      name: "GOVERNMENT OF INDIA - SGB 05JN29 S IX 2.50 FV RS 5000",
      beneficiary: "Beneficiary",
      quantity: 5,
      value: 40644.4
    },
    {
      isin: "INE528G01035",
      name: "YES BANK LIMITED - EQ NEW FV RS. 2/-",
      beneficiary: "Beneficiary",
      quantity: 1000,
      value: 21600
    },
    {
      isin: "INE02RE01045",
      name: "BRAINBEES SOLUTIONS LIMITED - EQ NEW FV Rs.2/-",
      beneficiary: "Beneficiary",
      quantity: 32,
      value: 18796.8
    },
    {
      isin: "INE0CU601026",
      name: "GMR POWER AND URBAN INFRA LIMITED - EQ NEW FV Rs.5/-",
      beneficiary: "Beneficiary",
      quantity: 92,
      value: 10444.76
    },
    {
      isin: "IN0020200377",
      name: "GOVERNMENT OF INDIA - SGB 05JN29 S IX 2.50 FV RS 5000",
      beneficiary: "Beneficiary",
      quantity: 5,
      value: 40644.4
    },
    {
      isin: "INE528G01035",
      name: "YES BANK LIMITED - EQ NEW FV RS. 2/-",
      beneficiary: "Beneficiary",
      quantity: 1000,
      value: 21600
    },
    {
      isin: "INE02RE01045",
      name: "BRAINBEES SOLUTIONS LIMITED - EQ NEW FV Rs.2/-",
      beneficiary: "Beneficiary",
      quantity: 32,
      value: 18796.8
    },
    {
      isin: "INE0CU601026",
      name: "GMR POWER AND URBAN INFRA LIMITED - EQ NEW FV Rs.5/-",
      beneficiary: "Beneficiary",
      quantity: 92,
      value: 10444.76
    },
    {
      isin: "IN0020200377",
      name: "GOVERNMENT OF INDIA - SGB 05JN29 S IX 2.50 FV RS 5000",
      beneficiary: "Beneficiary",
      quantity: 5,
      value: 40644.4
    },
    {
      isin: "INE528G01035",
      name: "YES BANK LIMITED - EQ NEW FV RS. 2/-",
      beneficiary: "Beneficiary",
      quantity: 1000,
      value: 21600
    },
    {
      isin: "INE02RE01045",
      name: "BRAINBEES SOLUTIONS LIMITED - EQ NEW FV Rs.2/-",
      beneficiary: "Beneficiary",
      quantity: 32,
      value: 18796.8
    },
    {
      isin: "INE0CU601026",
      name: "GMR POWER AND URBAN INFRA LIMITED - EQ NEW FV Rs.5/-",
      beneficiary: "Beneficiary",
      quantity: 92,
      value: 10444.76
    },
    {
      isin: "IN0020200377",
      name: "GOVERNMENT OF INDIA - SGB 05JN29 S IX 2.50 FV RS 5000",
      beneficiary: "Beneficiary",
      quantity: 5,
      value: 40644.4
    },
    {
      isin: "INE528G01035",
      name: "YES BANK LIMITED - EQ NEW FV RS. 2/-",
      beneficiary: "Beneficiary",
      quantity: 1000,
      value: 21600
    },
    {
      isin: "INE02RE01045",
      name: "BRAINBEES SOLUTIONS LIMITED - EQ NEW FV Rs.2/-",
      beneficiary: "Beneficiary",
      quantity: 32,
      value: 18796.8
    },
    {
      isin: "INE0CU601026",
      name: "GMR POWER AND URBAN INFRA LIMITED - EQ NEW FV Rs.5/-",
      beneficiary: "Beneficiary",
      quantity: 92,
      value: 10444.76
    },
    {
      isin: "IN0020200377",
      name: "GOVERNMENT OF INDIA - SGB 05JN29 S IX 2.50 FV RS 5000",
      beneficiary: "Beneficiary",
      quantity: 5,
      value: 40644.4
    },
    {
      isin: "INE528G01035",
      name: "YES BANK LIMITED - EQ NEW FV RS. 2/-",
      beneficiary: "Beneficiary",
      quantity: 1000,
      value: 21600
    },
    {
      isin: "INE02RE01045",
      name: "BRAINBEES SOLUTIONS LIMITED - EQ NEW FV Rs.2/-",
      beneficiary: "Beneficiary",
      quantity: 32,
      value: 18796.8
    },
    {
      isin: "INE0CU601026",
      name: "GMR POWER AND URBAN INFRA LIMITED - EQ NEW FV Rs.5/-",
      beneficiary: "Beneficiary",
      quantity: 92,
      value: 10444.76
    },
    {
      isin: "IN0020200377",
      name: "GOVERNMENT OF INDIA - SGB 05JN29 S IX 2.50 FV RS 5000",
      beneficiary: "Beneficiary",
      quantity: 5,
      value: 40644.4
    },
    {
      isin: "INE528G01035",
      name: "YES BANK LIMITED - EQ NEW FV RS. 2/-",
      beneficiary: "Beneficiary",
      quantity: 1000,
      value: 21600
    },
    {
      isin: "INE02RE01045",
      name: "BRAINBEES SOLUTIONS LIMITED - EQ NEW FV Rs.2/-",
      beneficiary: "Beneficiary",
      quantity: 32,
      value: 18796.8
    },
    {
      isin: "INE0CU601026",
      name: "GMR POWER AND URBAN INFRA LIMITED - EQ NEW FV Rs.5/-",
      beneficiary: "Beneficiary",
      quantity: 92,
      value: 10444.76
    },
    {
      isin: "IN0020200377",
      name: "GOVERNMENT OF INDIA - SGB 05JN29 S IX 2.50 FV RS 5000",
      beneficiary: "Beneficiary",
      quantity: 5,
      value: 40644.4
    },
    {
      isin: "INE528G01035",
      name: "YES BANK LIMITED - EQ NEW FV RS. 2/-",
      beneficiary: "Beneficiary",
      quantity: 1000,
      value: 21600
    }
  ],
  totalValueInfo: {
    date: "10-12-2024",
    totalValue: 1010749.26
  },
  lastCodDate: "16/03/2011 00:00:00",
  clientInfo: {
    dpmClientId: "10336632",
    name: "BELSON P KURIAN",
    address: [
      "PAZHAYAMPILLIL HOUSE",
      "SANTHIPURAM",
      "PERUVA P O",
      "KOTTAYAM, KERALA",
      "686610"
    ],
    clientStatus: "Active",
    bsdaFlag: "NO",
    rgessFlag: "NO",
    secondHolderName: "",
    thirdHolderName: "",
    clientType: "Resident",
    clientSubtype: "Ordinary"
  }
};
