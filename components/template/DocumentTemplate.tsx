// components/DocumentTemplate.jsx
export interface DocumentData {
  title?: string;
  description?: string;
}

export interface UserData {
  name?: string;
  email?: string;
}

export default function DocumentTemplate({
  documentData,
  userData,
}: {
  documentData?: DocumentData;
  userData?: UserData;
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
        <p>CDSL DP ID : 87300</p>
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
            <td className="px-2 py-1">
              Bo Id:   1308730000000193
            </td>

            <td className="px-2 py-1">
              Status:  Active
            </td>

            <td className="px-2 py-1">
              BSDA:    No
            </td>
            <td className="px-2 py-1">
              RGESS:   No
            </td>
            <td className="px-2 py-1">
              Date:    12-Aug-2025
            </td>
          </tr>
        </tbody>
      </table>


      {/* Account Info Table */}
      <table className="w-full border-collapse mb-4">
        <tbody>
          <tr>
            <td className="px-2 py-1 w-3">
              <div className="flex flex-col">

                <p className="font-semibold">Name</p>
              </div>
            </td>
            <td>
              {/* Holder Info */}
              <div className="mb-4">
                <p>Liya Ann Varghese</p>
                <p>Kallarackal H</p>
                <p>NR Balabhavan Jn</p>
                <p>Puduppadi PO</p>
                <p>Kozhikode, Kerala, India - 673586</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {/* <p className="mb-4">
        <strong>Second Holder:</strong> —
      </p>
      <p className="mb-4">
        <strong>Third Holder:</strong> —
      </p> */}

      {/* Statement Period */}
      <div className="text-center font-semibold mb-2">
        Holding Statement For The Period 08-Aug-2025
      </div>

      {/* Holdings Table */}
      <table className="w-full border border-black border-collapse text-[12px]">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-black px-2 py-1 text-left">ISIN Name</th>
            <th className="border border-black px-2 py-1 text-left">ISIN Code</th>
            <th className="border border-black px-2 py-1 text-right">
              Free Balance
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-black px-2 py-1">
              Bharat Electronics
            </td>
            <td className="border border-black px-2 py-1">INE263A01024</td>
            <td className="border border-black px-2 py-1 text-right">—</td>
          </tr>
          <tr>
            <td className="border border-black px-2 py-1">
              Bharat Electronics Limited (Face Value ₹1, after sub division)
            </td>
            <td className="border border-black px-2 py-1">INE263A01024</td>
            <td className="border border-black px-2 py-1 text-right">—</td>
          </tr>
          <tr>
            <td className="border border-black px-2 py-1">Federal Bank Eq-2</td>
            <td className="border border-black px-2 py-1">INE171A01029</td>
            <td className="border border-black px-2 py-1 text-right">1596</td>
          </tr>
          <tr>
            <td className="border border-black px-2 py-1">
              The Federal Bank Limited (New Equity Shares of ₹2, after sub
              division)
            </td>
            <td className="border border-black px-2 py-1">—</td>
            <td className="border border-black px-2 py-1 text-right">—</td>
          </tr>
          <tr>
            <td className="border border-black px-2 py-1">
              Govt of India 8.95% 2022-23 Series I
            </td>
            <td className="border border-black px-2 py-1">31274</td>
            <td className="border border-black px-2 py-1 text-right">2000</td>
          </tr>
          <tr>
            <td className="border border-black px-2 py-1">
              GVK Power & Infrastructure Ltd (Equity Shares of ₹1, after split)
            </td>
            <td className="border border-black px-2 py-1">INE251H01024</td>
            <td className="border border-black px-2 py-1 text-right">94</td>
          </tr>
          <tr>
            <td className="border border-black px-2 py-1">
              GVK Power & Infrastructure Ltd (Equity Shares of ₹1, after split)
            </td>
            <td className="border border-black px-2 py-1">INE251H01024</td>
            <td className="border border-black px-2 py-1 text-right">20</td>
          </tr>
        </tbody>
      </table>
    </div>
    // <div className="p-8 bg-white text-black text-sm">
    //   {/* Title */}
    //   <h1 className="text-2xl font-bold mb-4">{documentData?.title || "Document Title"}</h1>

    //   {/* Paragraph */}
    //   <p className="mb-6 text-gray-700">
    //     {documentData?.description ||
    //       "This is a sample paragraph in the PDF document. You can replace this text with your own."}
    //   </p>

    //   {/* Table */}
    //   <table className="w-full border border-gray-300 mb-6">
    //     <thead className="bg-gray-100">
    //       <tr>
    //         <th className="border border-gray-300 px-4 py-2 text-left">Field</th>
    //         <th className="border border-gray-300 px-4 py-2 text-left">Value</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       <tr>
    //         <td className="border border-gray-300 px-4 py-2">Name</td>
    //         <td className="border border-gray-300 px-4 py-2">{userData?.name || "John Doe"}</td>
    //       </tr>
    //       <tr>
    //         <td className="border border-gray-300 px-4 py-2">Email</td>
    //         <td className="border border-gray-300 px-4 py-2">{userData?.email || "john@example.com"}</td>
    //       </tr>
    //     </tbody>
    //   </table>

    //   {/* Button */}
    //   <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
    //     Action Button
    //   </button>
    // </div>
  );
}
