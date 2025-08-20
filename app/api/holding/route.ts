// {
//  "SenderCode":"FEDMB",
//  "ReqRefNo":"07082025RE986RD5099",
//  "ReqDateTime":"2025-08-07T14:54:30",
//  "Depository":"CDSL",
//  "Option":"01",
//  "Dpclient_Id":"11587875",
//  "Ason_Date":"2025-08-07",
//  "PrintValue":"Y"
// }


// {
//    "SenderCode": "FEDMB",
//    "ReqRefNo": "07082025RE986RD5099",
//    "Depository": "CDSL",
//    "Option": "01",
//    "Dpclient_Id": "11587875",
//    "Ason_Date": "2025-08-07",
//    "PrintValue": "Y",
//    "DPRefNo": "07082516132012CE7D89",
//    "ResponseDateTime": "2025-08-07T16:13:20.3961362+05:30",
//    "Response": "Y~<BR>01~INE263A01024~BHARAT ELECTRONIC-EQ~6~1,887<BR>01~INE171A01029~FEDERAL BANK EQ 2/-~1996~426,645<BR>01~IN0020220045~GOI SGB 31724 2030~1~8,178<BR>01~INE251H01024~GVK POWER - EQ RE 1~94~474<BR>01~INE335Y01020~IRCTCL-EQ2/-~35~29,162<BR>01~INE146L01010~KIRLOSKAR OIL ENG-EQ~70~82,408<BR>01~INE683A01023~SOUTH INDIAN-EQ 1/-~182~4,778<BR>01~INE398A01010~VENKY'S (INDIA) EQTY~10~18,145<BR>01~INE528G01035~YES BANK LTD-EQ2/-~10~218<BR>03~Total Value of Holding(Prices as on 09-DEC-2024) Rs.571893.98",
//    "Status": "S",
//    "Description": "Success"
// }

//////////

// {
//    "SenderCode": "FEDMB",
//    "ReqRefNo": "07082025RE986R099099",
//    "Depository": "NSDL",
//    "Option": "01",
//    "Dpclient_Id": "1974276287875",
//    "Ason_Date": "2025-08-07",
//    "PrintValue": "Y",
//    "DPRefNo": "0708251619297E74C4CA",
//    "ResponseDateTime": "2025-08-07T16:19:29.5535264+05:30",
//    "Response": "Y~<BR>01~INE208A01029~ASHOK LEYLAND LIMITED - EQ NEW FV RE.1/-<BR>~Beneficiary~35~8013.6<BR>01~INE02RE01045~BRAINBEES SOLUTIONS LIMITED - EQ NEW FV Rs.<BR>2/-~Beneficiary~32~18796.8<BR>01~INE0CU601026~GMR POWER AND URBAN INFRA LIMITED - EQ<BR>NEW FV Rs.5/-~Beneficiary~92~10444.76<BR>01~IN0020200377~GOVERNMENT OF INDIA - SGB 05JN29 S IX 2.50 FV<BR>RS 5000~Beneficiary~5~40644.4<BR>01~IN0020210145~GOVERNMENT OF INDIA - SGB 07SP29 S VI 2.50 FV<BR>RS 4732~Beneficiary~8~64816<BR>01~INE053F01010~INDIAN RAILWAY FINANCE CORPORATION<BR>LIMITED - EQ~Beneficiary~575~90188.75<BR>01~INE0J1Y01017~LIFE INSURANCE CORPORATION OF INDIA -<BR>EQ~Beneficiary~15~14223<BR>01~INE0BS701011~PREMIER ENERGIES LIMITED -<BR>EQ~Beneficiary~33~42282.9<BR>01~INE114A01011~STEEL AUTHORITY OF INDIA LIMITED -<BR>EQ~Beneficiary~40~5072.4<BR>01~INE155A01022~TATA MOTORS LIMITED - EQ NEW FV RS. 2/-<BR>~Beneficiary~100~79990<BR>01~INE081A01020~TATA STEEL LIMITED - EQ NEW FV RE.1/-<BR>~Beneficiary~100~15032<BR>01~INE171A01029~THE FEDERAL BANK LIMITED - EQ NEW FV RS.2/-<BR>~Beneficiary~2625~562642.5<BR>01~INE094J01016~UTI ASSET MANAGEMENT COMPANY LIMITED -<BR>EQ~Beneficiary~27~37002.15<BR>01~INE528G01035~YES BANK LIMITED - EQ NEW FV RS. 2/-<BR>~Beneficiary~1000~21600<BR>03~Total Value of Holding(Prices as on 10-12-2024) Rs.1010749.26<BR>05~10336632~BELSON P KURIAN~PAZHAYAMPILLIL<BR>HOUSE~SANTHIPURAM~PERUVA P O~KOTTAYAM,<BR>KERALA~686610~Active~NO~NO~~~Resident~Ordinary",
//    "Status": "S",
//    "Description": "Success"
// }

import { env } from "@/env/server";
import { parseCDSL, parseNSDL } from "@/lib/parser";
import { CdslHolding } from "@/types/api/cdsl-holding";
import { NsdlHolding } from "@/types/api/nsdl-holding";
import { NextResponse } from "next/server";
import { z } from "zod";

const RequestSchema = z.object({
  depository: z.enum(['CDSL', 'NSDL']),
  dpClientId: z.string().min(1, "DP Client ID is required")
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validation = RequestSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { 
          status: false, 
          message: "Validation failed",
          errors: validation.error.issues
        },
        { status: 400 }
      );
    }

    const { depository, dpClientId } = validation.data;

    const baseUrl = env.FED_API_URL;
    const now = new Date(Date.now());
    const isoString = now.toISOString().replace('Z', '').replace(/\..+/, '');

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    const dateString = `${year}-${month}-${day}`;

    const data = {
      SenderCode: "FEDMB",
      ReqRefNo: "07082025RE986RD5099",
      ReqDateTime: isoString,
      Depository: depository,
      Option: "01",
      Dpclient_Id: dpClientId,
      Ason_Date: dateString,
      PrintValue: "Y"
    }

    let response: CdslHolding | NsdlHolding | any;

    // // External API
    // const userResponse = await fetch(`${baseUrl}/HoldingDetailsAPI/GetDPMClientId`, {
    //   headers: {
    //     // Authorization: `Bearer ${tokenData.access_token}`,
    //   },
    // })

    if (depository == 'CDSL') {
      response = {
        SenderCode: "FEDMB",
        ReqRefNo: "07082025RE986RD5099",
        Depository: "CDSL",
        Option: "01",
        Dpclient_Id: dpClientId,
        Ason_Date: "2025-08-07",
        PrintValue: "Y",
        DPRefNo: "07082516132012CE7D89",
        ResponseDateTime: "2025-08-07T16:13:20.3961362+05:30",
        Response: "Y~<BR>01~INE263A01024~BHARAT ELECTRONIC-EQ~6~1,887<BR>01~INE171A01029~FEDERAL BANK EQ 2/-~1996~426,645<BR>01~IN0020220045~GOI SGB 31724 2030~1~8,178<BR>01~INE251H01024~GVK POWER - EQ RE 1~94~474<BR>01~INE335Y01020~IRCTCL-EQ2/-~35~29,162<BR>01~INE146L01010~KIRLOSKAR OIL ENG-EQ~70~82,408<BR>01~INE683A01023~SOUTH INDIAN-EQ 1/-~182~4,778<BR>01~INE398A01010~VENKY'S (INDIA) EQTY~10~18,145<BR>01~INE528G01035~YES BANK LTD-EQ2/-~10~218<BR>03~Total Value of Holding(Prices as on 09-DEC-2024) Rs.571893.98",
        Status: "S",
        Description: "Success"
      }

      const parsedResponse = parseCDSL(response.Response, dpClientId);
      response.parsed = parsedResponse;
    }

    if (depository == 'NSDL') {
      response = {
        SenderCode: "FEDMB",
        ReqRefNo: "07082025RE986R099099",
        Depository: "NSDL",
        Option: "01",
        Dpclient_Id: dpClientId,
        Ason_Date: "2025-08-07",
        PrintValue: "Y",
        DPRefNo: "0708251619297E74C4CA",
        ResponseDateTime: "2025-08-07T16:19:29.5535264+05:30",
        Response: "Y~<BR>01~INE208A01029~ASHOK LEYLAND LIMITED - EQ NEW FV RE.1/-<BR>~Beneficiary~35~8013.6<BR>01~INE02RE01045~BRAINBEES SOLUTIONS LIMITED - EQ NEW FV Rs.<BR>2/-~Beneficiary~32~18796.8<BR>01~INE0CU601026~GMR POWER AND URBAN INFRA LIMITED - EQ<BR>NEW FV Rs.5/-~Beneficiary~92~10444.76<BR>01~IN0020200377~GOVERNMENT OF INDIA - SGB 05JN29 S IX 2.50 FV<BR>RS 5000~Beneficiary~5~40644.4<BR>01~IN0020210145~GOVERNMENT OF INDIA - SGB 07SP29 S VI 2.50 FV<BR>RS 4732~Beneficiary~8~64816<BR>01~INE053F01010~INDIAN RAILWAY FINANCE CORPORATION<BR>LIMITED - EQ~Beneficiary~575~90188.75<BR>01~INE0J1Y01017~LIFE INSURANCE CORPORATION OF INDIA -<BR>EQ~Beneficiary~15~14223<BR>01~INE0BS701011~PREMIER ENERGIES LIMITED -<BR>EQ~Beneficiary~33~42282.9<BR>01~INE114A01011~STEEL AUTHORITY OF INDIA LIMITED -<BR>EQ~Beneficiary~40~5072.4<BR>01~INE155A01022~TATA MOTORS LIMITED - EQ NEW FV RS. 2/-<BR>~Beneficiary~100~79990<BR>01~INE081A01020~TATA STEEL LIMITED - EQ NEW FV RE.1/-<BR>~Beneficiary~100~15032<BR>01~INE171A01029~THE FEDERAL BANK LIMITED - EQ NEW FV RS.2/-<BR>~Beneficiary~2625~562642.5<BR>01~INE094J01016~UTI ASSET MANAGEMENT COMPANY LIMITED -<BR>EQ~Beneficiary~27~37002.15<BR>01~INE528G01035~YES BANK LIMITED - EQ NEW FV RS. 2/-<BR>~Beneficiary~1000~21600<BR>03~Total Value of Holding(Prices as on 10-12-2024) Rs.1010749.26<BR>05~10336632~BELSON P KURIAN~PAZHAYAMPILLIL<BR>HOUSE~SANTHIPURAM~PERUVA P O~KOTTAYAM,<BR>KERALA~686610~Active~NO~NO~~~Resident~Ordinary",
        Status: "S",
        Description: "Success"
      }

      const parsedResponse = parseNSDL(response.Response, dpClientId);
      response.parsed = parsedResponse;
    }

    return NextResponse.json(response);
  } catch (error: any) {
    console.error("Holding API Error:", error);
    return NextResponse.json(
      { 
        status: false, 
        message: "Server error",
        error: error.message 
      },
      { status: 500 }
    );
  }
}
