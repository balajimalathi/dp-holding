import { generatePdf } from "@/lib/generatePdf";
import { renderNsdlPdf, renderCdslPdf } from "@/lib/report/cdsl.report";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const documentId = searchParams.get('id') || 'default-id';
    const holding = searchParams.get('holding') || '';

    const body = await req.json();

    if (!['nsdl', 'cdsl'].includes(holding)) {
      return NextResponse.json(
        { status: false, message: "Invalid Holding Type", statusCode: 400 },
        { status: 400 }
      );
    }

    let htmlContent = "<div></div>";

    if (holding === 'nsdl') {
      htmlContent = await renderNsdlPdf(body.data);
    }

    if (holding === 'cdsl') {
      htmlContent = await renderCdslPdf(body.data);
    }

    const pdfBuffer = await generatePdf(htmlContent);

    const buffer = Buffer.from(pdfBuffer);

    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=document-${documentId}.pdf`,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { status: false, message: "Server error", statusCode: 500, error },
      { status: 500 }
    );
  }
}