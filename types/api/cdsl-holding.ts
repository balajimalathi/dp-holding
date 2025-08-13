import { Cdsl } from "../cdsl"

export interface CdslHolding {
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
  parsed?: Cdsl
  Status: string
  Description: string
}
