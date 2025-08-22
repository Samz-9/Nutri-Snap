'use client';

import React, { useRef } from 'react'; 

export default function ImageUpload({ onImageSelect, selectedImage }) {
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file.');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Please select an image smaller than 5MB.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        onImageSelect({
          file: file,
          preview: e.target.result,
          type: 'upload',
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleRemoveImage = () => {
    onImageSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="image-upload">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="file-input"
        hidden
      />
      
      <button
        onClick={handleUploadClick}
        className="upload-button"
      >
        📁 Choose Photo from Device
      </button>
      
      {selectedImage && selectedImage.type === 'upload' && (
        <div className="image-preview-container">
          <img
            src={selectedImage.preview}
            alt="Selected food"
            className="image-preview"
          />
          <p className="upload-success-text">
            Photo uploaded successfully! 📸
          </p>
          <button
            onClick={handleRemoveImage}
            className="remove-button"
          >
            🗑️ Remove Photo
          </button>
        </div>
      )}
    </div>
  );
}
