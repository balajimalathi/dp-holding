
// {
//   "SenderCode":"FEDMB",
//    "ReqRefNo":"07082025REF4664464",
//    "Option":"01",
//   "Cust_Id":"118877875",
//   "ReqDateTime":"2025-08-07T15:01:30"
// }

// {
//    "SenderCode": "FEDMB",
//    "ReqRefNo": "07082025REF4664464",
//    "Option": "01",
//    "Cust_Id": "118877875",
//    "DPRefNo": "070825151520476D1611",
//    "ResponseDateTime": "2025-08-07T00:00:00+05:30",
//    "Status": "S",
//    "Description": "Success",
//    "CDSL_Response":    {
//       "Depository": "CDSL",
//       "Response": "Y~000034~1308730000011320~1308730000011316"
//    },
//    "NSDL_Response":    {
//       "Depository": "NSDL",
//       "Response": "Y~000045~10674846~10674854~10678275~10678283~10731612"
//    }
// }

import { env } from "@/env/server";
import { decode } from "@/lib/crypto";
import { parseClientId } from "@/lib/parser";
import { ClientInfo } from "@/types/api/get-client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {

    const body = await req.json();
    const baseUrl = env.FED_API_URL;

    const now = new Date(Date.now());
    const isoString = now.toISOString().replace('Z', '').replace(/\..+/, '');

    const decoded = decode(body.data);

    var data = {
      "SenderCode": "FEDMB",
      "ReqRefNo": "07082025REF4664464",
      "Option": "01",
      "Cust_Id": decoded.ucic,
      "ReqDateTime": isoString
    }

    // // External API
    // const userResponse = await fetch(`${baseUrl}/HoldingDetailsAPI/GetDPMClientId`, {
    //   headers: {
    //     // Authorization: `Bearer ${tokenData.access_token}`,
    //   },
    // })

    let response: ClientInfo = {
      SenderCode: "FEDMB",
      ReqRefNo: "07082025REF4664464",
      Option: "01",
      Cust_Id: "118877875",
      DPRefNo: "070825151520476D1611",
      ResponseDateTime: "2025-08-07T00:00:00+05:30",
      Status: "S",
      Description: "Success",
      CDSL_Response: null,
      NSDL_Response: null
      // CDSL_Response: {
      //   Depository: "CDSL",
      //   Response: "Y~000034~1308730000011320~1308730000011316"
      // },
      // NSDL_Response: {
      //   Depository: "NSDL",
      //   Response: "Y~000045~10674846~10674854~10678275~10678283~10731612"
      // }
    }

    if (response.CDSL_Response) {
      const cdslClients = parseClientId(response.CDSL_Response?.Response);
      response.parsedCdsl = cdslClients;
    }

    if (response.NSDL_Response) {
      const nsdlClients = parseClientId(response.NSDL_Response?.Response);
      response.parsedNsdl = nsdlClients;
    }

    return NextResponse.json(response);

  } catch (error: any) {
    return NextResponse.json({ status: 500, error });
  }
}
