import { decode, encode } from "@/lib/crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    let baseUrl = process.env.NEXT_PUBLIC_APP_URL;
    
    const body = await req.json();
    
    // Validate required fields
    if (!body.purchaseId || !body.emailId || !body.mobileNo || !body.ucic) {
      return NextResponse.json(
        { status: false, message: "Missing required fields", statusCode: 400 },
        { status: 400 }
      );
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.emailId)) {
      return NextResponse.json(
        { status: false, message: "Invalid email format", statusCode: 400 },
        { status: 400 }
      );
    }
    
    const encrypted = encode({
      purchaseId: body.purchaseId,
      emailId: body.emailId,
      mobileNo: body.mobileNo,
      ucic: body.ucic
    });

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
    const { data } = await req.json();
    
    if (!data) {
      return NextResponse.json(
        { status: false, message: "Missing data parameter", statusCode: 400 },
        { status: 400 }
      );
    }
    
    try {
      const decoded = decode(data);
      return NextResponse.json(decoded);
    } catch (error) {
      return NextResponse.json(
        { status: false, message: "Invalid encoded data", statusCode: 400 },
        { status: 400 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { status: false, message: "Server error", statusCode: 500, error },
      { status: 500 }
    );
  }
}