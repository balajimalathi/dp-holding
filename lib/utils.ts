import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type NSDLHolding = {
  isin: string
  name: string
  quantity: number
  value: number
}

export type CDSLHolding = {
  code: string
  isin: string
  name: string
  holderType: string
  quantity: number
  value: number
}

export type HoldingsData = {
  type: 'nsdl' | 'cdsl'
  data: {
    holdings: NSDLHolding[] | CDSLHolding[]
    totalValue?: number
    asOnDate?: string
    summary?: {
      date: string
      totalValue: number
    }
    account?: {
      dpId: string
      name: string
      address: string[]
      status: string
      nri: string
      freeze: string
      boCategory: string
    }
  }
}

export function downloadHoldings(data: HoldingsData) {
  let csvContent = ""
  if (data.type === "nsdl") {
    csvContent =
      "data:text/csv;charset=utf-8," +
      "ISIN,Name,Quantity,Value\n" +
      (data.data.holdings as NSDLHolding[]).map(row => `${row.isin},${row.name},${row.quantity},${row.value}`).join("\n")
  } else {
    csvContent =
      "data:text/csv;charset=utf-8," +
      "Code,ISIN,Name,Holder Type,Quantity,Value\n" +
      (data.data.holdings as CDSLHolding[])
        .map(row => `${row.code},${row.isin},${row.name},${row.holderType},${row.quantity},${row.value}`)
        .join("\n")
  }

  const encodedUri = encodeURI(csvContent)
  const link = document.createElement("a")
  link.setAttribute("href", encodedUri)
  link.setAttribute("download", `${data.type}_holdings.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
