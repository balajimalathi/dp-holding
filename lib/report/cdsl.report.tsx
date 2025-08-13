import React from "react";
const { renderToString } = await import("react-dom/server");
import CdslTemplate from "../../components/template/cdslTemplate";
import { Cdsl } from "@/types/cdsl";
import { Nsdl } from "@/types/nsdl";
import NsdlTemplate from "@/components/template/nsdlTemplate";

export const renderCdslPdf = async (data: Cdsl) => {
  return renderToString(<CdslTemplate data={ data } />);
};

export const renderNsdlPdf = async (data: Nsdl) => {
  return renderToString(<NsdlTemplate data={ data } />);
};