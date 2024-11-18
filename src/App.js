import React, { useEffect, useState } from "react";
import "./App.css";
import ImageUpload from "./Components/ImageUpload";
import ImageGallery from "./Components/ImageGallery";
import axios from "axios";


function App() {
  const [images, setImages] = useState([]);

  // Fetch images from the API
  const fetchImages = async () => {
    try {
      const response = await axios.get(
        "https://ekufpje8v2.execute-api.us-east-1.amazonaws.com/image-gallery-get"
      );
      console.log("🙂 ~ fetchImages ~ response⇒", response?.data);
      setImages(response.data);
    } catch (error) {
      console.error("Error fetching images:", error);
      alert("Failed to fetch images. Please try again.");
    }
  };

  // Delete an image using the API
  const handleDelete = async (imageKey) => {
    try {
      const response = await axios.delete(
        "https://ekufpje8v2.execute-api.us-east-1.amazonaws.com/image-gallery-delete",
        {
          data: { imageKey },
        }
      );
      console.log("🙂 ~ handleDelete ~ response⇒", response.data);
      setImages(images.filter((img) => img.key !== imageKey));
    } catch (error) {
      console.error("Error deleting image:", error);
      alert("Failed to delete image. Please try again.");
    }
  };

  // Fetch images on initial load
  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="container">
      <h1>Serverless Image Gallery</h1>
      <ImageUpload onUpload={fetchImages} />
      <ImageGallery images={images} handleDelete={handleDelete} />
    </div>
  );
}

export default App;
