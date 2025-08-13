import { Nsdl } from "../nsdl"

export interface NsdlHolding {
  SenderCode: string
  ReqRefNo: string
  Depository: string
  Option: string
  Dpclient_Id: string
  Ason_Date: string
  PrintValue: string
  DPRefNo: string
  ResponseDateTime: string
  Response: string
  parsed?: Nsdl
  Status: string
  Description: string
}
