import { ClientIds } from "@/types/api/get-client";
import { Holding, Cdsl } from "@/types/cdsl";
import { Nsdl } from "@/types/nsdl";

export function parseCDSL(response?: string, dpClientId?: string): Cdsl | null {

  if (!response) {
    return null;
  }

  // Normalize and split into records
  const records = response
    .replace(/\r/g, "")
    .split(/<BR>/i)
    .map(r => r.trim())
    .filter(Boolean);

  const result: Cdsl = {
    status: response.startsWith("Y~") ? "Y" : "N",
    dpClientId: dpClientId,
    holdings: []
  };

  for (const rec of records) {
    // Remove leading "Y~" if present in first record
    const normalized = rec.replace(/^Y~\s*/, "");
    const tokens = normalized.split("~").map(t => t.trim());

    switch (tokens[0]) {
      case "01": {
        // Example: 01~ISIN~NAME~QTY~VALUE
        const [, isin, name, qty, val] = tokens;
        result.holdings.push({
          type: "01",
          isin,
          name,
          quantity: Number(qty.replace(/,/g, "")),
          value: Number(val.replace(/,/g, ""))
        });
        break;
      }
      case "02": {
        // Example: 02~Account Desc~QTY
        const [, name, qty] = tokens;
        result.holdings.push({
          type: "02",
          isin: "",
          name,
          quantity: Number(qty.replace(/,/g, "")),
          value: 0
        });
        break;
      }
      case "03": {
        // Example: 03~Total Value of Holding(Prices as on 09-DEC-2024) Rs.571893.98
        const amountVal = tokens[1].match(/Rs\.([\d.]+)/);
        if (amountVal) result.totalValue = Number(amountVal[1]);

        const dateVal = tokens[1].match(/Prices as on (\d{1,2}-[A-Z]{3}-\d{4})/);
        if (dateVal) result.asOnDate = dateVal[1];
      }
    }
  }

  return result;
}

export function parseNSDL(response?: string, dpClientId?: string): Nsdl | null {

  if (!response) {
    return null;
  }

  // Normalize by removing carriage returns and collapsing spaces
  let clean = response.replace(/\r/g, "").replace(/\s+/g, " ");

  // Split into records by regex lookahead on type markers (01,02,03,04,05)
  const records = clean.split(/(?=(?:0[1-5])~)/).map(r => r.trim()).filter(Boolean);

  const result: Nsdl = {
    dpClientId: dpClientId,
    status: clean.startsWith("Y~") ? "Y" : "N",
    holdings: []
  };

  for (const rec of records) {
    const tokens = rec.replace(/<BR>/gi, " ").split("~").map(t => t.trim());

    switch (tokens[0]) {
      case "01": {
        // Example: 01~ISIN~NAME~Beneficiary~QTY~VALUE
        const [, isin, rawName, beneficiary, qty, val] = tokens;
        result.holdings.push({
          isin,
          name: rawName.replace(/\s+/g, " ").trim(),
          beneficiary,
          quantity: Number(qty),
          value: Number(val)
        });
        break;
      }
      case "02": {
        // Account desc + qty (not in your sample, can extend later)
        break;
      }
      case "03": {
        // Example: 03~Total Value of Holding(Prices as on 10-12-2024) Rs.1010749.26
        const text = tokens[1];
        const dateMatch = text.match(/as on ([\d-]+)/i);
        const date = dateMatch ? dateMatch[1] : "";
        const valueMatch = text.match(/Rs\.([\d.]+)/i);
        const totalValue = valueMatch ? Number(valueMatch[1]) : 0;

        result.totalValueInfo = {
          date,
          totalValue
        };
        break;
      }
      case "04": {
        // Example: 04~Last COD Date : 16/03/2011 00:00:00
        const lastCod = tokens[1].replace("Last COD Date :", "").trim();
        result.lastCodDate = lastCod;
        break;
      }
      case "05": {
        // Example: 05~clientId~name~addr1~...~status~bsda~rgess~secondHolder~thirdHolder~clientType~clientSubtype
        const [
          , dpmClientId,
          name,
          addr1, addr2, addr3, addr4, addr5,
          clientStatus, bsdaFlag, rgessFlag,
          secondHolderName, thirdHolderName,
          clientType, clientSubtype
        ] = tokens;

        const address = [addr1, addr2, addr3, addr4, addr5].filter(Boolean);

        result.clientInfo = {
          dpmClientId,
          name,
          address,
          clientStatus,
          bsdaFlag,
          rgessFlag,
          secondHolderName,
          thirdHolderName,
          clientType,
          clientSubtype
        };
        break;
      }
    }
  }
  return result;
}


export function parseClientId(input?: string): ClientIds | null {

  if (!input) {
    return null;
  }

  const parts = input.split("~");

  return {
    status: parts[0],
    length: parts[1],
    clientId: parts.slice(2),
  };
}