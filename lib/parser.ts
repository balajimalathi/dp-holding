import { ClientIds } from "@/types/api/get-client";
import { Holding, Cdsl } from "@/types/cdsl";
import { Nsdl, TotalValueInfo, ClientInfo, Holding2 } from "@/types/nsdl";

export function parseCDSL(input: string, dpClientId: string): Cdsl {
  const lines = input.split("\r\n").filter(Boolean);

  const status = lines[0].split("~")[0];
  const holdings: Holding[] = [];

  let totalValue: number | undefined;
  let asOnDate: string | undefined;

  for (const line of lines.slice(1)) {
    const parts = line.split("~");

    if (parts[0] === "01") {
      holdings.push({
        type: parts[0],
        isin: parts[1],
        name: parts[2],
        quantity: Number(parts[3].replace(/,/g, "")),
        value: Number(parts[4].replace(/,/g, "")),
      });
    } else if (parts[0] === "03") {
      // Example: "03~Total Value of Holding(Prices as on 09-DEC-2024) Rs.571893.98"
      const amountVal = parts[1].match(/Rs\.([\d.]+)/);
      if (amountVal) totalValue = Number(amountVal[1]);

      const dateVal = parts[1].match(/Prices as on (\d{1,2}-[A-Z]{3}-\d{4})/);
      if (dateVal) asOnDate = dateVal[1];
    }
  }

  return {
    dpClientId,
    status,
    holdings,
    asOnDate,
    totalValue,
  };
}

export function parseNSDL(raw: string, dpClientId: string): Nsdl {
    // Normalize line endings
  let data = raw.replace(/\r\n/g, "\n");

  // Merge broken lines: if a line does not start with record type, join it to previous line
  const recordStartPattern = /^(Y|01|03|04|05)~/;
  const mergedLines: string[] = [];

  for (const line of data.split("\n")) {
    if (recordStartPattern.test(line)) {
      mergedLines.push(line.trim());
    } else if (mergedLines.length > 0) {
      // continuation of previous line (e.g., company name)
      mergedLines[mergedLines.length - 1] += " " + line.trim();
    }
  }

  const status = mergedLines[0].split("~")[0];
  const holdings: any[] = [];
  let totalValueInfo;
  let lastCodDate;
  let clientInfo;

  for (const line of mergedLines.slice(1)) {
    const parts = line.split("~");

    console.log(parts)

    switch (parts[0]) {
      case "01": {
        const isin = parts[1];
        const name = parts[2].trim();
        const beneficiary = parts[3];
        const quantity = Number(parts[4]?.replace(/,/g, ""));
        const value = Number(parts[5]?.replace(/,/g, ""));
        holdings.push({ isin, name, beneficiary, quantity, value });
        break;
      }

      case "03": {
        // Example: "03~Total Value of Holding(Prices as on 10-12-2024) Rs.1010749.26"
        const match = parts[1].match(
          /Prices as on ([0-9-]+)\) Rs\.?([\d,]+(\.\d+)?)/i
        );
        if (match) {
          totalValueInfo = {
            date: match[1],
            totalValue: Number(match[2].replace(/,/g, "")),
          };
        }
        break;
      }

      case "04": {
        // Example: "04~Last COD Date : 16/03/2011 00:00:00"
        const datePart = parts[1]?.split(":")[1]?.trim();
        if (datePart) lastCodDate = datePart;
        break;
      }

      case "05": {
        clientInfo = {
          dpmClientId: parts[1],
          name: parts[2],
          address: [parts[3], parts[4], parts[5], parts[6], parts[7]],
          clientStatus: parts[8],
          bsdaFlag: parts[9],
          rgessFlag: parts[10],
          secondHolderName: parts[11] || "",
          thirdHolderName: parts[12] || "",
          clientType: parts[13],
          clientSubtype: parts[14],
        };
        break;
      }
    }
  }

  return {
    dpClientId,
    status,
    holdings,
    totalValueInfo,
    lastCodDate,
    clientInfo,
  };
}


export function parseClientId(input: string): ClientIds {
  const parts = input.split("~");

  return {
    status: parts[0],
    length: parts[1],
    clientId: parts.slice(2),
  };
}