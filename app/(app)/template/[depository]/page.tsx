import CdslTemplate from "@/components/template/cdslTemplate";
import NsdlTemplate from "@/components/template/nsdlTemplate";
import { mockCdsl } from "@/types/cdsl";
import { mockNsdl } from "@/types/nsdl";

const CarrierForm = ({
  params
}: {
  params: { depository: string }
}) => {
  return <>
    {params.depository == 'cdsl' ?
      <CdslTemplate data={mockCdsl} /> :
      <NsdlTemplate data={mockNsdl} />
    }
  </>
}

export default CarrierForm;