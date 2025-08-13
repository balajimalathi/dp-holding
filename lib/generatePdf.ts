import puppeteer from "puppeteer";
import path from "path";
import fs from "fs";
  
export const generatePdf = async (htmlContent: string, documentId: string) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  
  const page = await browser.newPage();
  
  await page.setExtraHTTPHeaders({
    'Accept-Language': 'en-US,en;q=0.9'
  });
  
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');

  // Read logo and convert to base64
  const logoPath = path.join(process.cwd(), 'public', 'logo.png');
  const logoData = fs.readFileSync(logoPath);
  const logoBase64 = logoData.toString('base64');
  const logoDataUrl = `data:image/png;base64,${logoBase64}`;

  // Replace logo path with data URL
  const processedHtml = htmlContent.replace(
    'src="/logo.png"',
    `src="${logoDataUrl}"`
  );

  const styledHtmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Gabarito:wght@400;500;600;700&display=swap" rel="stylesheet">
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          body {
            background-color: #FFFFFF;
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            font-family: 'Gabarito', sans-serif;
          }
        </style>
      </head>
      <body>
        ${processedHtml}
      </body>
    </html>
  `;

  await page.setContent(styledHtmlContent, {
    waitUntil: "networkidle0",
    timeout: 60000
  });

  // Saves the PDF in the public folder for later use.: if its not for download
  // if (!isDownload) {
  //   const outputPath = path.join(process.cwd(), `public/documents/document-${documentId}.pdf`);
  //   await page.pdf({ path: outputPath, format: "A4", printBackground: true });
  //   await browser.close();
  //   return;
  // }

  const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });
  await browser.close();
  return pdfBuffer;
};