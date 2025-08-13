"use client"

import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Download, Building2 } from "lucide-react"
import Image from "next/image"
import { CDSLHoldings } from "./_component/cdsl.component"
import { NSDLHoldings } from "./_component/nsdl.component"
import { cdslData } from "@/types/cdsl"
import { nsdlData } from "@/types/nsdl"

// Mock data for dropdowns
const holdingOptions = [
  { value: "nsdl", label: "NSDL" },
  { value: "cdsl", label: "CDSL" },
]

const accountOptions = {
  nsdl: [
    { value: "IN301774123456789", label: "IN301774123456789" },
    { value: "IN301774987654321", label: "IN301774987654321" },
    { value: "IN301774555666777", label: "IN301774555666777" },
  ],
  cdsl: [
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

  console.log(accountNumber)

  if (holdings === "nsdl") {
    return {
      type: "nsdl",
      data: nsdlData,
    }
  } else {
    return {
      type: "cdsl",
      data: cdslData,
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

  const handleDownload = async () => {
    if (!results) return

    try {
      const response = await fetch(`/api/report?holding=${selectedHoldings}&id=${results.type}-${Date.now()}`)
      if (!response.ok) throw new Error('Failed to generate report')

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `holdings-report-${results.type}-${new Date().toISOString().slice(0, 10)}.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download failed:', error)
      alert('Failed to download report. Please try again.')
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-center">
            <Image src="/logo.png" alt="Company Logo" width={200} height={60} className="h-12 w-auto" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-2 py-8">
        {/* First Section */}
        <Card className="mb-8">
          <CardHeader className="px-4">
            <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
              <Building2 className="h-6 w-6" />
              Demat Holdings
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
                      <FormItem className="flex flex-col">
                        <FormLabel>Depository</FormLabel>
                        <FormControl className="py-2">
                          <RadioGroup
                            onValueChange={handleHoldingsChange}
                            defaultValue={field.value}
                            className="flex flex-row space-x-2"
                          >
                            {holdingOptions.map((option) => (
                              <FormItem key={option.value} className="flex items-center space-x-1 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value={option.value} />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {option.label}
                                </FormLabel>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
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
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-4">
              {results.type === "nsdl" ? <NSDLHoldings data={results.data} /> : <CDSLHoldings data={results.data} />}
            </CardContent>
          </Card>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-center">
            <Image src="/logo.png" alt="Footer Logo" width={150} height={40} className="h-8 w-auto opacity-60" />
          </div>
        </div>
      </footer>
    </div>
  )
}
