import { env } from "@/env/server";
import { decode, encode } from "@/lib/crypto";
import { NextResponse } from "next/server";
import z from "zod";

const RequestSchema = z.object({
  purchaseId: z.string().min(1, "Purchase ID is required"),
  emailId: z.string().email("Email ID is required").min(1),
  mobileNo: z.string().min(1, "Mobile Number is required"),
  ucic: z.string().min(1, "Customer ID is required")
});

export async function POST(req: Request) {
  try {
    const baseUrl = env.APP_URL;

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