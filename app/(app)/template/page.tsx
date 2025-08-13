import CdslTemplate from "@/components/template/cdslTemplate";
import { Cdsl, cdslData } from "@/types/cdsl";

export default function Template() {
  return <>
    <CdslTemplate data={cdslData} />
    {/* <CdslTemplate documentData={documentData} userData={userData} /> */}
  </>
}