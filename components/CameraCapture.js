'use client';

import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam'; 

export default function CameraCapture({ onImageCapture, capturedImage }) {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const webcamRef = useRef(null);

  // Video constraints for better mobile support
  const videoConstraints = {
    width: 300,
    height: 200,
    facingMode: "environment" // Use back camera on mobile
  };

  const handleStartCamera = useCallback(() => {
    setCameraError(null);
    setIsCameraActive(true);
  }, []);

  const handleStopCamera = useCallback(() => {
    setIsCameraActive(false);
    setCameraError(null);
  }, []);

  const handleCapturePhoto = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    
    if (imageSrc) {
      // Convert base64 to blob
      fetch(imageSrc)
        .then(res => res.blob())
        .then(blob => {
          onImageCapture({
            file: blob,
            preview: imageSrc,
            type: 'camera'
          });
        })
        .catch(error => {
          console.error('Error converting image:', error);
          setCameraError('Failed to capture photo. Please try again.');
        });
    }
    
    setIsCameraActive(false);
  }, [onImageCapture]);

  const handleRemoveImage = () => {
    onImageCapture(null);
  };

  const handleCameraError = useCallback((error) => {
    console.error('Camera error:', error);
    setCameraError('Camera access denied or unavailable. Please check permissions.');
    setIsCameraActive(false);
  }, []);

  return (
    <div className="camera-capture">
      {!isCameraActive ? (
        <div className="camera-controls">
          <button
            onClick={handleStartCamera}
            className="camera-button start-button"
          >
            📱 Start Camera
          </button>
          
          {cameraError && (
            <div className="error-message">
              ⚠️ {cameraError}
            </div>
          )}
          
          {capturedImage && capturedImage.type === 'camera' && (
            <div className="image-preview-container">
              <img
                src={capturedImage.preview}
                alt="Captured food"
                className="image-preview"
              />
              <p className="capture-success-text">
                Photo captured! 📸
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
      ) : (
        <div className="camera-active">
          <div className="webcam-container">
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              onUserMediaError={handleCameraError}
              className="webcam"
            />
          </div>
          
          <div className="capture-controls">
            <button
              onClick={handleCapturePhoto}
              className="camera-button capture-button"
            >
              📸 Capture Photo
            </button>
            
            <button
              onClick={handleStopCamera}
              className="camera-button cancel-button"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
