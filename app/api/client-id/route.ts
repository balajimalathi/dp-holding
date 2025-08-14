
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
import { z } from "zod";

const RequestSchema = z.object({
  data: z.string().min(1, "Encrypted data is required")
});

const UCICSchema = z.object({
  ucic: z.string().min(1, "Customer ID is required")
});

export async function POST(req: Request) {
  try {
    // Validate request body
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

    const baseUrl = env.FED_API_URL;
    const now = new Date(Date.now());
    const isoString = now.toISOString().replace('Z', '').replace(/\..+/, '');

    // Decode and validate UCIC
    const decoded = decode(body.data);
    const ucicValidation = UCICSchema.safeParse(decoded);

    if (!ucicValidation.success) {
      return NextResponse.json(
        {
          status: false,
          message: "Invalid UCIC format",
          errors: ucicValidation.error.issues
        },
        { status: 400 }
      );
    }

    const data = {
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
      CDSL_Response: {
        Depository: "CDSL",
        Response: "Y~000034~1308730000011320~1308730000011316"
      },
      NSDL_Response: {
        Depository: "NSDL",
        Response: "Y~000045~10674846~10674854~10678275~10678283~10731612"
      }
    }

    try {
      if (response.CDSL_Response) {
        const cdslClients = parseClientId(response.CDSL_Response?.Response);
        response.parsedCdsl = cdslClients;
      }

      if (response.NSDL_Response) {
        const nsdlClients = parseClientId(response.NSDL_Response?.Response);
        response.parsedNsdl = nsdlClients;
      }
    } catch (error: any) {
      return NextResponse.json(
        {
          status: false,
          message: "Server error",
          error: error.message
        },
        { status: 500 }
      );
    }

    return NextResponse.json(response);

  } catch (error: any) {
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
