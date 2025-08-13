import { env } from "@/env/server";
import { decode, encode } from "@/lib/crypto";
import { generatePdf } from "@/lib/generatePdf";
import { renderPdf } from "@/lib/report/cdsl.report";
import { cdslData } from "@/types/cdsl";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const documentId = searchParams.get('id') || 'default-id';
    
    const htmlContent = await renderPdf(cdslData);
    const pdfBuffer = await generatePdf(htmlContent, documentId);
    
    const buffer = Buffer.from(pdfBuffer);

    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=document-${documentId}.pdf`,
      },
    });
  } catch (error: any) {
    console.log(error)
    return NextResponse.json(
      { status: false, message: "Server error", statusCode: 500, error },
      { status: 500 }
    );
  }
}