import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { User, MapPin, Calendar } from "lucide-react";

// CDSL Holdings Component
export const CDSLHoldings = ({ data }: { data: any }) => (
  <div className="space-y-4">
    {/* Account Info Card */}
    <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 p-0">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <User className="h-5 w-5 text-green-600 mt-1" />
          <div className="flex-1">
            <h3 className="font-semibold text-green-900">{data.account.name}</h3>
            <p className="text-sm text-green-700">DP ID: {data.account.dpId}</p>

          </div>
          <div className="text-right">
            <div className="flex gap-2 text-sm">
              <span
                className={`px-2 py-1 rounded-full ${data.account.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
              >
                {data.account.status}
              </span>
            </div>
            <p className="text-sm text-green-600 mt-1">{data.account.boCategory}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <MapPin className="h-5 w-5 text-green-600 mt-2" />
          <div className="flex-1">

            <div className="flex items-start gap-1 mt-2">
              <div className="text-sm text-green-600">
                {data.account.address.map((line: string, index: number) => (
                  <div key={index}>{line}</div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </CardContent>
    </Card>

    {/* Summary Card */}
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 p-0">
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-blue-800 ">Total Value</h3>
            <p className="text-2xl font-bold text-blue-900 ">₹{data.summary.totalValue.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-blue-900 flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              As on {data.summary.date}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>

    {/* Holdings List */}
    <div className="space-y-3">
      {data.holdings.map((holding: any, index: number) => (
        <Card key={`${holding.isin}-${index}`} className="border border-gray-200 hover:shadow-md transition-shadow p-0">
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 text-md leading-tight">{holding.name}</h4>
                <p className="text-sm text-gray-500 mt-1">ISIN: {holding.isin}</p>
              </div>
              <div className="text-right ml-4">
                <p className="font-bold text-green-600">₹{holding.value.toLocaleString()}</p>
                <p className="text-sm">{holding.quantity} units</p>
              </div>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <div className="flex flex-col">
                <p className="text-black text-md">{holding.holderType}</p>
                <Label className="text-xs">Type</Label>
              </div>
              <div className="flex flex-col">
                <p className="text-black text-md">₹{(holding.value / holding.quantity).toFixed(2)}</p>
                <Label className="text-xs">Value per unit</Label>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
)
