import React from "react";
const { renderToString } = await import("react-dom/server");
import CdslTemplate from "../../components/template/cdslTemplate";
import { Cdsl } from "@/types/cdsl";

export const renderPdf = async (data: Cdsl) => {
  return renderToString(<CdslTemplate data={ data } />);
};