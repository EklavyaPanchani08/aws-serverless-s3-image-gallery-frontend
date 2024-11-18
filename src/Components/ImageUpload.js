import React, { useState } from "react";
import axios from "axios";

const ImageUpload = ({ onUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  console.log("🙂 ~ file: ImageUpload.js:6 ~ ImageUpload ~ selectedFile⇒", selectedFile)
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file to upload");
      return;
    }

    setIsUploading(true);

    try {
      const response = await axios.post(
        "https://ekufpje8v2.execute-api.us-east-1.amazonaws.com/image-gallery-upload",
        {
          fileName: `${selectedFile?.name}.${Date.now()}.${selectedFile?.type
            ?.split("/")
            .pop()}`,
          contentType: selectedFile?.type,
        }
      );

      console.log("🙂 ~ Upload Response:", response);

      const { url } = response.data;
      await axios.put(url, selectedFile, {
        headers: {
          "Content-Type": selectedFile.type,
        },
      });

      onUpload();
      setSelectedFile(null);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="upload-section">
      <label htmlFor="file-upload" className="upload-label">
        Choose Image
      </label>
      <input id="file-upload" type="file" onChange={handleFileChange} />
      <button
        className="upload-button"
        onClick={handleUpload}
        disabled={isUploading}
      >
        {isUploading ? "Uploading..." : "Upload Image"}
      </button>
    </div>
  );
};

export default ImageUpload;
