import { useEffect, useState } from "react";
import FileUploader from "./FileUploader";
import pdfToText from "react-pdftotext";
import FileConsumer from "./FileConsumer";

export default function FileHandler() {
  const [file, setFile] = useState<File | null>(null);
  const [fileText, setFileText] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
      pdfToText(file)
        .then((text) => setFileText(text))
        .catch(() => console.error("Failed to extract text from pdf"));
    }
  }, [file]);

  return (
    <div>
      <FileUploader file={file} setFile={setFile} />
      <FileConsumer fileText={fileText}></FileConsumer>
      {fileText && <p>{fileText}</p>}
    </div>
  );
}
