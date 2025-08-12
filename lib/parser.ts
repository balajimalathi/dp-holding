import { Holding, ParsedData } from "@/types/cdsl";
import { Holding2, Account, Summary, ParsedData2 } from "@/types/nsdl";

export function parseCDSL(raw: string): ParsedData {
  // Normalize the string
  const cleaned = raw
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\r?\n/g, "")
    .trim();

  const parts = cleaned.split("~");

  const holdings: Holding[] = [];
  let totalValue = 0;
  let asOnDate = "";

  for (let i = 0; i < parts.length; i++) {
    if (parts[i] === "01") {
      // Holding entry
      const isin = parts[i + 1]?.trim();
      const name = parts[i + 2]?.trim();
      const quantity = parseFloat(parts[i + 3]?.replace(/,/g, "") || "0");
      const value = parseFloat(parts[i + 4]?.replace(/,/g, "") || "0");

      holdings.push({ isin, name, quantity, value });
      i += 4;
    } else if (parts[i] === "03") {
      // Total line
      const match = parts[i + 1]?.match(/Prices as on ([\d-]+)/i);
      if (match) {
        asOnDate = match[1];
      }
      const valMatch = parts[i + 1]?.match(/Rs\.([\d,.]+)/i);
      if (valMatch) {
        totalValue = parseFloat(valMatch[1].replace(/,/g, ""));
      }
    }
  }

  return { holdings, totalValue, asOnDate };
}

export function parseNSDL(raw: string): ParsedData2 {
  // Step 1: Normalize line breaks and split into lines
  const lines = raw.replace(/\r/g, "").split("\n").filter(Boolean);

  const holdings: Holding2[] = [];
  let summary: Summary | null = null;
  let account: Account | null = null;

  for (const line of lines) {
    const parts = line.split("~").map(p => p.trim());

    if (parts[0] === "01") {
      // Holding row
      holdings.push({
        code: parts[0],
        isin: parts[1],
        name: parts[2],
        holderType: parts[3],
        quantity: parseFloat(parts[4]),
        value: parseFloat(parts[5])
      });
    } else if (parts[0] === "03") {
      // Summary row
      const totalValue = parseFloat(parts[1].replace(/[^\d.]/g, ""));
      const dateMatch = parts[1].match(/on\s(\d{2}-\d{2}-\d{4})/);
      summary = {
        date: dateMatch ? dateMatch[1] : "",
        totalValue
      };
    } else if (parts[0] === "05") {
      // Account details
      account = {
        dpId: parts[1],
        name: parts[2],
        address: [parts[3], parts[4], parts[5], parts[6]],
        status: parts[7],
        nri: parts[8],
        freeze: parts[9],
        boCategory: parts[13]
      };
    }
  }

  return {
    holdings,
    summary: summary!,
    account: account!
  };
}