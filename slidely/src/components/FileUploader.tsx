import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

type FileUploaderProps = {
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
};

export default function FileUploader({ file, setFile }: FileUploaderProps) {
  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  }

  return (
    <div>
      <input type="file" onChange={handleFileChange}></input>
      {file && (
        <div className="fileInfo">
          <p>File name: {file.name}</p>
          <p>Size: {(file.size / 1024).toFixed(2)} KB</p>
          <p>Type: {file.type}</p>
        </div>
      )}
    </div>
  );
}
