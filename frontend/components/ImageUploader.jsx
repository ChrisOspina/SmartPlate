"use client";

import { ImageIcon, Camera, Upload, X } from "lucide-react";
import React, { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "./ui/button";
import Image from "next/image";
import { RingLoader } from "react-spinners";

const ImageUploader = ({ onImageSelect, loading }) => {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) return;

      const reader = new FileReader();

      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);

      onImageSelect(file);
    },
    [onImageSelect],
  );
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

  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onDrop([file]);
    }
  };

  const clearImage = () => {
    setPreview(null);
    onImageSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  //For Preview Mode
  if (preview) {
    return (
      <div
        className="relative w-full aspect-video bg-stone-100 rounded-2xl overflow-hidden border-2
    border-stone-200"
      >
        <Image
          src={preview}
          alt="pantry preview"
          fill
          className="object-cover"
        />
        {!loading && (
          <button
            onClick={clearImage}
            className="absolute top-4 right-4 bg-white/9p hover:bg-white p-2 rounded-full shadows-lg
                transition-all"
          >
            <X className="w-5 h-5 text-stone-700" />
          </button>
        )}
        {loading && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <RingLoader color="white" />
          </div>
        )}
      </div>
    );
  }

  return (
    <>
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
              <Button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="gap-2"
                variant="primary"
              >
                <Camera className="w-4 h-4" />
                Take Photo
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  open();
                }}
                className={
                  " border-green-200 text-green-700 hover:bg-green-50 gap-2"
                }
              >
                <Upload className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/*Helper Text*/}
          <p className="text-xs text-stone-400">
            Supports JPG, PNG, WebP Max 10MB
          </p>
        </div>
      </div>

      {/*Hidden file input with capture attribute for mobile devices*/}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileInputChange}
        className="hidden"
      />
    </>
  );
};

export default ImageUploader;
