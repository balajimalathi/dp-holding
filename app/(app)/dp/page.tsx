
"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Download, Building2, User, MapPin, Calendar } from "lucide-react"
import Image from "next/image"
import { CSDLHoldings } from "./_component/csdl.component"
import { NSDLHoldings } from "./_component/nsdl.component"

// Mock data for dropdowns
const holdingOptions = [
  { value: "nsdl", label: "NSDL" },
  { value: "csdl", label: "CSDL" },
]

const accountOptions = {
  nsdl: [
    { value: "IN301774123456789", label: "IN301774123456789" },
    { value: "IN301774987654321", label: "IN301774987654321" },
    { value: "IN301774555666777", label: "IN301774555666777" },
  ],
  csdl: [
    { value: "10336632001234", label: "10336632001234" },
    { value: "10336632005678", label: "10336632005678" },
    { value: "10336632009876", label: "10336632009876" },
  ],
}

// Zod validation schema
const formSchema = z.object({
  holdings: z.string().min(1, "Please select holdings type"),
  accountNumber: z.string().min(1, "Please select account number"),
})

type FormData = z.infer<typeof formSchema>

// Mock API function
const fetchHoldingsData = async (holdings: string, accountNumber: string) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  if (holdings === "nsdl") {
    return {
      type: "nsdl",
      data: {
        holdings: [
          {
            isin: "INE263A01024",
            name: "BHARAT ELECTRONIC- EQ",
            quantity: 6,
            value: 1887,
          },
          {
            isin: "INE171A01029",
            name: "FEDERAL BANK EQ 2/-",
            quantity: 1996,
            value: 426645,
          },
          {
            isin: "IN0020220045",
            name: "GOI SGB 31724 2030",
            quantity: 1,
            value: 8178,
          },
          {
            isin: "INE251H01024",
            name: "GVK POWER - EQ RE 1",
            quantity: 94,
            value: 474,
          },
          {
            isin: "INE335Y01020",
            name: "IRCTCL-EQ2/-",
            quantity: 35,
            value: 29162,
          },
          {
            isin: "INE146L01010",
            name: "KIRLOSKAR OIL ENG- EQ",
            quantity: 70,
            value: 82408,
          },
          {
            isin: "INE683A01023",
            name: "SOUTH INDIAN-EQ 1/-",
            quantity: 182,
            value: 4778,
          },
          {
            isin: "INE398A01010",
            name: "VENKY'(INDIA) EQTY",
            quantity: 10,
            value: 18145,
          },
          {
            isin: "INE528G01035",
            name: "YES BANK LTD-EQ2/-",
            quantity: 10,
            value: 218,
          },
        ],
        totalValue: 571893.98,
        asOnDate: "09-DEC-2024",
      },
    }
  } else {
    return {
      type: "csdl",
      data: {
        holdings: [
          {
            code: "01",
            isin: "INE208A01029",
            name: "ASHOK LEYLAND LIMITED - EQ NEW FV RE.1/-",
            holderType: "Beneficiary",
            quantity: 35,
            value: 8013.6,
          },
          {
            code: "01",
            isin: "INE02RE01045",
            name: "BRAINBEES SOLUTIONS LIMITED - EQ NEW FV Rs.2/-",
            holderType: "Beneficiary",
            quantity: 32,
            value: 18796.8,
          },
        ],
        summary: {
          date: "10-12-2024",
          totalValue: 1010749.26,
        },
        account: {
          dpId: "10336632",
          name: "BELSON P KURIAN",
          address: ["PAZHAYAMPILLIL HOUSE", "SANTHIPURAM", "PERUVA P O", "KOTTAYAM, KERALA"],
          status: "Active",
          nri: "NO",
          freeze: "NO",
          boCategory: "Resident",
        },
      },
    }
  }
}

export default function Dp() {
  const [results, setResults] = useState<any>(null)
  const [showResults, setShowResults] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      holdings: "",
      accountNumber: "",
    },
  })

  // Watch holdings to reset account number when holdings type changes
  const selectedHoldings = form.watch("holdings")

  // Reset account number when holdings type changes
  const handleHoldingsChange = (value: string) => {
    form.setValue("holdings", value)
    form.setValue("accountNumber", "")
    setShowResults(false)
    setResults(null)
  }

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetchHoldingsData(data.holdings, data.accountNumber)
      setResults(response)
      setShowResults(true)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  const handleDownload = () => {
    if (!results) return

    let csvContent = ""
    if (results.type === "nsdl") {
      csvContent =
        "data:text/csv;charset=utf-8," +
        "ISIN,Name,Quantity,Value\n" +
        results.data.holdings.map((row: any) => `${row.isin},${row.name},${row.quantity},${row.value}`).join("\n")
    } else {
      csvContent =
        "data:text/csv;charset=utf-8," +
        "Code,ISIN,Name,Holder Type,Quantity,Value\n" +
        results.data.holdings
          .map((row: any) => `${row.code},${row.isin},${row.name},${row.holderType},${row.quantity},${row.value}`)
          .join("\n")
    }

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `${results.type}_holdings.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handlePrint = () => {
    if (!results) return

    const printContent = `
      <html>
        <head><title>${results.type.toUpperCase()} Holdings Report</title></head>
        <body>
          <h1>${results.type.toUpperCase()} Holdings Report</h1>
          ${results.type === "nsdl"
        ? `
            <p><strong>Total Value:</strong> ₹${results.data.totalValue.toLocaleString()}</p>
            <p><strong>As on Date:</strong> ${results.data.asOnDate}</p>
            <table border="1" style="border-collapse: collapse; width: 100%;">
              <thead>
                <tr><th>ISIN</th><th>Name</th><th>Quantity</th><th>Value</th></tr>
              </thead>
              <tbody>
                ${results.data.holdings
          .map(
            (row: any) => `
                  <tr>
                    <td>${row.isin}</td>
                    <td>${row.name}</td>
                    <td>${row.quantity}</td>
                    <td>₹${row.value}</td>
                  </tr>
                `,
          )
          .join("")}
              </tbody>
            </table>
          `
        : `
            <p><strong>Account:</strong> ${results.data.account.name} (${results.data.account.dpId})</p>
            <p><strong>Total Value:</strong> ₹${results.data.summary.totalValue.toLocaleString()}</p>
            <p><strong>Date:</strong> ${results.data.summary.date}</p>
            <table border="1" style="border-collapse: collapse; width: 100%;">
              <thead>
                <tr><th>Code</th><th>ISIN</th><th>Name</th><th>Type</th><th>Quantity</th><th>Value</th></tr>
              </thead>
              <tbody>
                ${results.data.holdings
          .map(
            (row: any) => `
                  <tr>
                    <td>${row.code}</td>
                    <td>${row.isin}</td>
                    <td>${row.name}</td>
                    <td>${row.holderType}</td>
                    <td>${row.quantity}</td>
                    <td>₹${row.value}</td>
                  </tr>
                `,
          )
          .join("")}
              </tbody>
            </table>
          `
      }
        </body>
      </html>
    `

    const printWindow = window.open("", "_blank")
    if (printWindow) {
      printWindow.document.write(printContent)
      printWindow.document.close()
      printWindow.print()
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-center">
            <Image src="/generic-company-logo.png" alt="Company Logo" width={200} height={60} className="h-12 w-auto" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* First Section */}
        <Card className="mb-8">
          <CardHeader className="px-4">
            <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
              <Building2 className="h-6 w-6" />
              Holdings Dashboard
            </CardTitle>
            <Separator className="mt-4" />
          </CardHeader>
          <CardContent className="px-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  {/* Holdings Type Dropdown */}
                  <FormField
                    control={form.control}
                    name="holdings"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Holdings Type</FormLabel>
                        <Select value={field.value} onValueChange={handleHoldingsChange}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Choose holdings type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {holdingOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Account Number Dropdown */}
                  <FormField
                    control={form.control}
                    name="accountNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account Number</FormLabel>
                        <Select value={field.value} onValueChange={field.onChange} disabled={!selectedHoldings}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Choose account number" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {selectedHoldings &&
                              accountOptions[selectedHoldings as keyof typeof accountOptions]?.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* CTA Button */}
                  <div className="justify-center">
                    <Button type="submit" disabled={form.formState.isSubmitting} className="w-full px-8 py-2">
                      {form.formState.isSubmitting ? "Loading..." : "Get Holdings"}
                    </Button>
                  </div>
                </div>

              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Second Section */}
        {showResults && results && (
          <Card>
            <CardHeader className="px-4">
              <div className="flex flex-row sm:flex-row justify-between items-start sm:items-center gap-4">
                <CardTitle className="text-xl font-bold">{results.type.toUpperCase()} Holdings</CardTitle>
                <div className="flex gap-2">
                  <Button onClick={handleDownload} variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  {/* <Button onClick={handlePrint} variant="outline" size="sm">
                    <Printer className="h-4 w-4 mr-2" />
                    Print
                  </Button> */}
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-4">
              {results.type === "nsdl" ? <NSDLHoldings data={results.data} /> : <CSDLHoldings data={results.data} />}
            </CardContent>
          </Card>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-center">
            <Image src="/footer-logo.png" alt="Footer Logo" width={150} height={40} className="h-8 w-auto opacity-60" />
          </div>
        </div>
      </footer>
    </div>
  )
}
