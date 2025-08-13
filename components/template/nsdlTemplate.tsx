import { Nsdl } from "@/types/nsdl";

// components/DocumentTemplate.jsx
export default function NsdlTemplate({
  data
}: {
  data: Nsdl;
}) {
  return (
    <div className="p-8 bg-gray-50 min-h-screen text-sm">
      <div className="text-center mb-4">
        <img
          src="/logo.png"
          alt="Federal Bank"
          className="mx-auto h-12"
        />
      </div>

      {/* Bank Info */}
      <div className="text-center mb-6">
        <p className="font-bold">THE FEDERAL BANK LIMITED</p>
        <p>NSDL DP ID: {data.account?.dpId}</p>
        <p>Depository Services Division</p>
        <p>
          Operations Department, III Floor <br />
          Parackal Towers, Parur Junction, Thottakkattukara, Aluva
        </p>
      </div>

      {/* Account Info Table */}
      <table className="w-full border-collapse mb-4">
        <tbody>
          <tr>
            <td>
              Date: {data.asOnDate}
            </td>
            <td>
              Total Value: ₹{data.totalValue.toLocaleString()}
            </td>
          </tr>
        </tbody>
      </table>


      {/* Account Info Table */}
      <div className="mb-4">
        <p className="font-semibold">Holdings Summary</p>
        <p className="text-sm">Total Value: ₹{data.totalValue.toLocaleString()}</p>
        <p className="text-sm">As of Date: {data.asOnDate}</p>
      </div>

      {/* <p className="mb-4">
        <strong>Second Holder:</strong> —
      </p>
      <p className="mb-4">
        <strong>Third Holder:</strong> —
      </p> */}

      {/* Statement Period */}
      <div className="text-center font-semibold mb-2">
        Holding Statement For The Period {data.asOnDate}
      </div>

      {/* Holdings Table */}
      <table className="w-full border border-black border-collapse text-[12px]">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-black px-2 py-1 text-left">ISIN Code</th>
            <th className="border border-black px-2 py-1 text-left">ISIN Name</th>
            <th className="border border-black px-2 py-1 text-left">Account Description</th>
            <th className="border border-black px-2 py-1 text-right">Quantity</th>
            <th className="border border-black px-2 py-1 text-right">{`Value (Rs.)`}</th>
          </tr>
        </thead>
        <tbody>
          {data.holdings.map((holding, i) => (
            <tr key={i}>
              <td className="border border-black px-2 py-1">
                {holding.isin || '—'}
              </td>
              <td className="border border-black px-2 py-1">
                {holding.name}
              </td>
              <td className="border border-black px-2 py-1">
                {holding.holderType || '—'}
              </td>
              <td className="border border-black px-2 py-1 text-right">
                {holding.quantity || '—'}
              </td>
              <td className="border border-black px-2 py-1 text-right">
                ₹{holding.value.toLocaleString() || '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
