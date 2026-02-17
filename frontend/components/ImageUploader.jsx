"use client";

import { ImageIcon, Camera } from "lucide-react";
import React, { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "./ui/button";

const ImageUploader = ({ onImageSelect, loading }) => {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        console.log(binaryStr);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    maxFiles: 1,
    maxSize: 10485760, //10MB
    noClick: true,
    noKeyboard: true,
  });

  //For Preview Mode
  if (preview) {
    return <div></div>;
  }

  return (
    <div
      {...getRootProps()}
      className={`relative w-full aspect-square border-2 border-dashed rounded-2xl
            transition-all cursor-pointer ${
              isDragActive
                ? "border-green-600 bg-green-50 scale-[1.02]"
                : "border-stone-300 bg-stone-50 hover:border-green-500 hover:bg-green-50/50"
            }`}
    >
      <input {...getInputProps()} />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
        <div
          className={`p-4 rounded-full transition-all ${
            isDragActive ? "bg-green-600 scale-110" : "bg-green-100"
          }`}
        >
          {isDragActive ? (
            <ImageIcon className="w-8 h-8 text-white" />
          ) : (
            <Camera className="w-8 h-8 text-green-600" />
          )}
        </div>

        {/*Text*/}
        <div>
          <h3 className="text-xl font-bold text-stone-900 mb-2">
            {isDragActive ? "Drop your image here" : "Scan Your Pantry"}
          </h3>
          <p className="text-stone-600 text-sm max-w-sm">
            {isDragActive
              ? "Release to upload"
              : "Take a photo or drag & drop an image of your fridge/pantry"}
          </p>
        </div>
        {!isDragActive && (
          <div className="flex flex-col sm:flex-row gap-3">
            <Button></Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
