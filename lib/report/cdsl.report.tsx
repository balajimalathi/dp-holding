import React from "react";
const { renderToString } = await import("react-dom/server");
import { DocumentData, UserData } from "../../components/template/DocumentTemplate";
import DocumentTemplate from "../../components/template/DocumentTemplate";


export const renderPdf = async (documentData: DocumentData,
  userData: UserData) => {
  return renderToString(<DocumentTemplate documentData={ documentData } userData = { userData } />);
};