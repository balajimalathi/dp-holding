# API Documentation

## Table of Contents

1. [Client ID API](#client-id-api)
2. [Holding API](#holding-api)  
3. [Redirect URL API](#redirect-url-api)
4. [Report API](#report-api)

---

## Client ID API

`POST /api/client-id`

Gets client IDs from CDSL and NSDL depositories for a given customer.

### Request

```json
{
  "data": "encrypted-string"  // Contains UCIC (Customer ID)
}
```

### Example Request Payload

```json
{
  "SenderCode": "FEDMB",
  "ReqRefNo": "07082025REF4664464",
  "Option": "01",
  "Cust_Id": "118877875",
  "ReqDateTime": "2025-08-07T15:01:30"
}
```

### Successful Response

```json
{
  "SenderCode": "FEDMB",
  "ReqRefNo": "07082025REF4664464",
  "Option": "01",
  "Cust_Id": "118877875",
  "DPRefNo": "070825151520476D1611",
  "ResponseDateTime": "2025-08-07T00:00:00+05:30",
  "Status": "S",
  "Description": "Success",
  "CDSL_Response": {
    "Depository": "CDSL",
    "Response": "Y~000034~1308730000011320~1308730000011316"
  },
  "NSDL_Response": {
    "Depository": "NSDL",
    "Response": "Y~000045~10674846~10674854~10678275~10678283~10731612"
  }
}
```

### Error Responses

- **400 Bad Request**: Invalid request format
- **500 Internal Server Error**: Server error

---

## Holding API

`POST /api/holding`

Gets holding details for a client from either CDSL or NSDL.

### Request

```json
{
  "depository": "CDSL" | "NSDL",
  "dpClientId": "string"  // DP Client ID
}
```

### Example CDSL Request

```json
{
  "SenderCode": "FEDMB",
  "ReqRefNo": "07082025RE986RD5099",
  "ReqDateTime": "2025-08-07T14:54:30",
  "Depository": "CDSL",
  "Option": "01",
  "Dpclient_Id": "11587875",
  "Ason_Date": "2025-08-07",
  "PrintValue": "Y"
}
```

### Example NSDL Request

```json
{
  "SenderCode": "FEDMB",
  "ReqRefNo": "07082025RE986R099099",
  "Depository": "NSDL",
  "Option": "01",
  "Dpclient_Id": "1974276287875",
  "Ason_Date": "2025-08-07",
  "PrintValue": "Y"
}
```

### Successful CDSL Response

```json
{
  "SenderCode": "FEDMB",
  "ReqRefNo": "07082025RE986RD5099",
  "Depository": "CDSL",
  "Option": "01",
  "Dpclient_Id": "11587875",
  "Ason_Date": "2025-08-07",
  "PrintValue": "Y",
  "DPRefNo": "07082516132012CE7D89",
  "ResponseDateTime": "2025-08-07T16:13:20.3961362+05:30",
  "Response": "Y~...",  // Truncated for brevity
  "Status": "S",
  "Description": "Success"
}
```

### Error Responses

- **400 Bad Request**: Invalid request format
- **500 Internal Server Error**: Server error

---

## Redirect URL API

`POST /api/redirect-url`

Generates an encrypted redirect URL with customer details.

### Request

```json
{
  "purchaseId": "string",
  "emailId": "string",
  "mobileNo": "string",
  "ucic": "string"
}
```

### Successful Response

```json
{
  "status": true,
  "message": "success",
  "redirectionURL": "https://app.url/dp?data=encrypted-data",
  "statusCode": 200
}
```

### PUT /api/redirect-url

Decodes the encrypted data.

### Request

```json
{
  "data": "encrypted-string"
}
```

### Successful Response

```json
{
  "purchaseId": "string",
  "emailId": "string",
  "mobileNo": "string",
  "ucic": "string"
}
```

### Error Responses

- **400 Bad Request**: Invalid request format
- **500 Internal Server Error**: Server error

---

## Report API

`POST /api/report?id=:id&holding=:type`

Generates a PDF report for holdings.

### Query Parameters

- `id`: Document ID
- `holding`: "cdsl" or "nsdl"

### Request Body

```json
{
  "data": "holding-data"
}
```

### Response

Returns a PDF file with Content-Type: application/pdf

### Error Responses

- **400 Bad Request**: Invalid holding type
- **500 Internal Server Error**: Server error
