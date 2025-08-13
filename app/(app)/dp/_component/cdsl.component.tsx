import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Cdsl } from "@/types/cdsl";
import { User, MapPin, Calendar } from "lucide-react";

// CDSL Holdings Component
export const CDSLHoldings = ({ data }: { data: Cdsl }) => (
  <div className="space-y-4">
    {/* Summary Card */}
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 p-0 ">
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-blue-800">Total Value</h3>
            <p className="text-2xl font-bold text-blue-900">₹{data.totalValue.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-blue-900 flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              As on {data.asOnDate}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>

    {/* Holdings List > index: number */}
    <div className="space-y-3">
      {data.holdings.map((holding: any) => (
        <Card key={holding.isin} className="border border-gray-200 hover:shadow-md transition-shadow p-0">
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 text-md leading-tight">{holding.name}</h4>
                <p className="text-sm text-gray-500 mt-1">ISIN: {holding.isin}</p>
              </div>
              <div className="text-right ml-4">
                <p className="font-bold text-green-600">₹{holding.value.toLocaleString()}</p>
                <p className="text-sm text-gray-500">{holding.quantity} units</p>
              </div>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <div className="flex flex-col">
                <p className="text-black text-md">{holding.quantity}</p>
                <Label className="text-xs">Quantity</Label>
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
