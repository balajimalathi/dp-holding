import { NextResponse } from "next/server";
import { POST } from "../../app/api/report/route";
import { generatePdf } from "@/lib/generatePdf";
import { renderNsdlPdf, renderCdslPdf } from "@/lib/report/cdsl.report";
import { vi, describe, beforeEach, it, expect, Mock } from "vitest";
import { mockNsdl } from "@/types/nsdl";
import { mockCdsl } from "@/types/cdsl";

// Mock dependencies
vi.mock("@/lib/generatePdf");
vi.mock("@/lib/report/cdsl.report");

const mockGeneratePdf = generatePdf as Mock;
const mockRenderNsdlPdf = renderNsdlPdf as Mock;
const mockRenderCdslPdf = renderCdslPdf as Mock;

describe("POST /api/report", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGeneratePdf.mockResolvedValue(new Uint8Array());
    mockRenderNsdlPdf.mockResolvedValue("<div>NSDL</div>");
    mockRenderCdslPdf.mockResolvedValue("<div>CDSL</div>");
  });

  it("should return 400 for invalid holding type", async () => {
    const req = {
      url: "http://localhost/api/report?id=123",
      json: vi.fn().mockResolvedValue({ data: {} })
    } as unknown as Request;

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.message).toBe("Invalid Holding Type");
  });

  it("should use default id when not provided", async () => {
    const req = {
      url: "http://localhost/api/report?holding=nsdl",
      json: vi.fn().mockResolvedValue({ data: {} })
    } as unknown as Request;

    await POST(req);

    expect(mockGeneratePdf).toHaveBeenCalledWith(expect.any(String), "default-id");
  });

  it("should generate NSDL PDF with correct parameters", async () => {
    const testData = { foo: "bar" };
    const req = {
      url: "http://localhost/api/report?id=123&holding=nsdl",
      json: vi.fn().mockResolvedValue({ data: testData })
    } as unknown as Request;

    await POST(req);

    expect(mockRenderNsdlPdf).toHaveBeenCalledWith(testData);
    expect(mockGeneratePdf).toHaveBeenCalled();
  });

  it("should generate CDSL PDF with correct parameters", async () => {
    const testData = { foo: "bar" };
    const req = {
      url: "http://localhost/api/report?id=123&holding=cdsl",
      json: vi.fn().mockResolvedValue({ data: testData })
    } as unknown as Request;

    await POST(req);

    expect(mockRenderCdslPdf).toHaveBeenCalledWith(testData);
    expect(mockGeneratePdf).toHaveBeenCalled();
  });

  it("should return PDF with correct headers", async () => {
    const req = {
      url: "http://localhost/api/report?id=123&holding=nsdl",
      json: vi.fn().mockResolvedValue({ data: mockNsdl })
    } as unknown as Request;

    const response = await POST(req);

    expect(response.headers.get("Content-Type")).toBe("application/pdf");
    expect(response.headers.get("Content-Disposition")).toContain("document-123.pdf");
  });

  it("should handle errors and return 500", async () => {
    mockRenderNsdlPdf.mockRejectedValue(new Error("Test error"));
    const req = {
      url: "http://localhost/api/report?id=123&holding=nsdl",
      json: vi.fn().mockResolvedValue({ data: {} })
    } as unknown as Request;

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.message).toBe("Server error");
  });
});