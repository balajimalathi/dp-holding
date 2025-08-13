import DocumentTemplate from "@/components/template/DocumentTemplate";

export default function Template() {

  const documentData = {
    title: "Sample Document",
    description: "This is a sample document description"
  };

  const userData = {
    name: "John Doe",
    email: "john@example.com"
  };

  return <>
    <DocumentTemplate documentData={documentData} userData={userData} />
  </>

}