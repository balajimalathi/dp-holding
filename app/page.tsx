"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { Download, Printer } from "lucide-react"
import Image from "next/image"
import { Label } from "@/components/ui/label"

// Mock data for dropdowns
const dropdown1Options = [
  { value: "category1", label: "Electronics" },
  { value: "category2", label: "Clothing" },
  { value: "category3", label: "Books" },
  { value: "category4", label: "Home & Garden" },
]

const dropdown2Options = {
  category1: [
    { value: "electronics1", label: "Smartphones" },
    { value: "electronics2", label: "Laptops" },
    { value: "electronics3", label: "Tablets" },
  ],
  category2: [
    { value: "clothing1", label: "Men's Wear" },
    { value: "clothing2", label: "Women's Wear" },
    { value: "clothing3", label: "Kids' Wear" },
  ],
  category3: [
    { value: "books1", label: "Fiction" },
    { value: "books2", label: "Non-Fiction" },
    { value: "books3", label: "Educational" },
  ],
  category4: [
    { value: "home1", label: "Furniture" },
    { value: "home2", label: "Decor" },
    { value: "home3", label: "Garden Tools" },
  ],
}

// Mock API function
const fetchTableData = async (category: string, subcategory: string) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock data based on selections
  return [
    { id: 1, name: `${subcategory} Item 1`, price: "$99.99", stock: 25, status: "In Stock" },
    { id: 2, name: `${subcategory} Item 2`, price: "$149.99", stock: 12, status: "In Stock" },
    { id: 3, name: `${subcategory} Item 3`, price: "$79.99", stock: 0, status: "Out of Stock" },
    { id: 4, name: `${subcategory} Item 4`, price: "$199.99", stock: 8, status: "In Stock" },
    { id: 5, name: `${subcategory} Item 5`, price: "$299.99", stock: 15, status: "In Stock" },
  ]
}

const fetchDropdown1 = async (customerId: string) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock data based on selections
  return [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
  ]
}

export default function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("")
  const [tableData, setTableData] = useState<any[]>([])
  const [showSecondSection, setShowSecondSection] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
    setSelectedSubcategory("")
    setShowSecondSection(false)
    setTableData([])
  }

  // Expose to window for app to call
  useEffect(() => {
    (window as Window & typeof globalThis & { getDpHolding?: (customerId: string) => void }).getDpHolding = (customerId: string) => {
      // if (customerId === "dark" || customerId === "light") {
      //   setTheme(newTheme);
      // }

      fetchDropdown1(customerId);
    };
  }, []);

  const handleSubcategoryChange = async (value: string) => {
    setSelectedSubcategory(value)
    setLoading(true)

    try {
      const data = await fetchTableData(selectedCategory, value)
      setTableData(data)
      setShowSecondSection(true)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    // Mock download functionality
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "ID,Name,Price,Stock,Status\n" +
      tableData.map((row) => `${row.id},${row.name},${row.price},${row.stock},${row.status}`).join("\n")

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "table_data.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-center">
            {/* <Image src="/logo.png" alt="Company Logo" width={200} height={60} className="h-24 w-full   sm:hidden" /> */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* First Section */}
        <Card className="mb-8 py-4">
          <CardContent className="space-y-6 px-4">
            <>
              <Label className="text-xl font-bold mb-4">Depository Participant</Label>
              <Separator className="mb-4" />
            </>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Dropdown 1 */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Category</label>
                <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {dropdown1Options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Dropdown 2 */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Subcategory</label>
                <Select
                  value={selectedSubcategory}
                  onValueChange={handleSubcategoryChange}
                  disabled={!selectedCategory}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a subcategory" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedCategory &&
                      dropdown2Options[selectedCategory as keyof typeof dropdown2Options]?.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {loading && (
              <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Second Section */}
        {showSecondSection && (
          <Card>
            <CardHeader>
              <div className="flex flex-row justify-between items-start sm:items-center gap-4">
                <CardTitle className="text-xl font-bold">Statements</CardTitle>
                <div className="flex gap-2">
                  <Button onClick={handleDownload} variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tableData.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.id}</TableCell>
                        <TableCell className="font-medium">{row.name}</TableCell>
                        <TableCell>{row.price}</TableCell>
                        <TableCell>{row.stock}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${row.status === "In Stock" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                              }`}
                          >
                            {row.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-center">
            <Image src="/logo.png" alt="Footer Logo" width={150} height={40} className="h-8 w-auto" />
          </div>
        </div>
      </footer>
    </div>
  )
}
