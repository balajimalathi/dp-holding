export interface ClientInfo {
  SenderCode: string
  ReqRefNo: string
  Option: string
  Cust_Id: string
  DPRefNo: string
  ResponseDateTime: string
  Status: string
  Description: string
  CDSL_Response?: CdslResponse | null
  parsedCdsl?: ClientIds | null
  NSDL_Response?: NsdlResponse | null
  parsedNsdl?: ClientIds | null
}

export interface CdslResponse {
  Depository: string
  Response: string
}

export interface NsdlResponse {
  Depository: string
  Response: string
}

export interface ClientIds {
  status: string,
  length: string,
  clientId: string[]
}