import { generatePdf } from "@/lib/generatePdf";
import { renderNsdlPdf, renderCdslPdf } from "@/lib/report/cdsl.report";
// import { cdslData } from "@/types/cdsl";
// import { nsdlData } from "@/types/nsdl";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const documentId = searchParams.get('id') || 'default-id';
    const holding = searchParams.get('holding') || '';

    if (!['nsdl', 'cdsl'].includes(holding)) {
      return NextResponse.json(
        { status: false, message: "Invalid Holding Type", statusCode: 400 },
        { status: 400 }
      );
    }

    let htmlContent = "<div></div>";

    if (holding === 'nsdl') {
      // htmlContent = await renderNsdlPdf(nsdlData);
    }

    if (holding === 'cdsl') {
      // htmlContent = await renderCdslPdf(cdslData);
    }

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