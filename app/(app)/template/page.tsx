import CdslTemplate from "@/components/template/cdslTemplate";
import NsdlTemplate from "@/components/template/nsdlTemplate";
import { mockCdsl } from "@/types/cdsl";
import { mockNsdl } from "@/types/nsdl";

export default function Template() {
  return <>
    {/* <CdslTemplate data={mockCdsl} /> */}
    <NsdlTemplate data={mockNsdl} />
  </>
}