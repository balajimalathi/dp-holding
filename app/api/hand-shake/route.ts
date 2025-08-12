import { decode, encode } from "@/lib/crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {

    let baseUrl = process.env.NEXT_PUBLIC_APP_URL;

    const {
      purchaseId,
      emailId,
      mobileNo,
      ucic
    } = await req.json();

    const encrypted = encode({ purchaseId, emailId, mobileNo, ucic });

    return NextResponse.json(
      {
        status: true,
        message: "success",
        redirectionURL: `${baseUrl}/dp?data=${encrypted}`,
        statusCode: 200
      }
    );
  } catch (error: any) {
    return NextResponse.json({ status: 500, error });
  }
}


export async function PUT(req: Request) {
  try {

    let baseUrl = process.env.NEXT_PUBLIC_APP_URL;

    const {
      data
    } = await req.json();

    console.log(data)

    const encrypted = decode(data);

    return NextResponse.json(encrypted);
  } catch (error: any) {
    return NextResponse.json({ status: 500, error });
  }
}