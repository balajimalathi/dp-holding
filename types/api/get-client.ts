export interface ClientInfo {
  SenderCode: string
  ReqRefNo: string
  Option: string
  Cust_Id: string
  DPRefNo: string
  ResponseDateTime: string
  Status: string
  Description: string
  CDSL_Response: CdslResponse
  NSDL_Response: NsdlResponse
}

export interface CdslResponse {
  Depository: string
  Response: string
  parsed?: ClientIds
}

export interface NsdlResponse {
  Depository: string
  Response: string
  parsed?: ClientIds
}

export interface ClientIds {
  status: string,
  length: string,
  clientId: string[]
}