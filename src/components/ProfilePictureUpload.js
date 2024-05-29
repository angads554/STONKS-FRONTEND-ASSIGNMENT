import React, { useState, useRef, useCallback } from "react";
import Cropper from "react-easy-crop";
import imageCompression from "browser-image-compression";
import { getCroppedImg } from "./cropImage";

const ProfilePictureUpload = () => {
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState("");

  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = async () => {
    if (!croppedAreaPixels || !image) {
      console.error("Crop area or image not set.");
      return;
    }

    const croppedImage = await getCroppedImg(image, croppedAreaPixels);
    const compressedImage = await imageCompression(croppedImage, {
      maxSizeMB: 0.55,
      maxWidthOrHeight: 1024,
      useWebWorker: true,
    });

    const reader = new FileReader();
    reader.readAsDataURL(compressedImage);
    reader.onloadend = function () {
      setCroppedImageUrl(reader.result);
    };

    uploadImage(compressedImage);
  };

  const uploadImage = async (imageBlob) => {
    const formData = new FormData();
    formData.append("file", imageBlob, "profile-picture.png");

    try {
      const response = await fetch("/upload-endpoint", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Upload failed");
      }
      alert("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-3xl shadow-xl">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={inputRef}
      />
      {image && (
        <>
          <div className="crop-container relative w-full h-64">
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape="round"
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
          <button
            onClick={handleSave}
            className="p-3 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition duration-300 mt-4"
          >
            Save and Upload
          </button>
        </>
      )}
      {croppedImageUrl && (
        <div className="mt-4">
          <h3>Cropped Image Preview:</h3>
          <img
            src={croppedImageUrl}
            alt="Cropped Preview"
            className="mt-2 rounded-full shadow-lg"
          />
        </div>
      )}
    </div>
  );
};

export default ProfilePictureUpload;
