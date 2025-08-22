'use client';
import React, { useState } from 'react';
import ImageUpload from '../components/ImageUpload';
import CameraCapture from '../components/CameraCapture';
import ResultCard from '../components/ResultCard';

export default function Home() {
  const [activeTab, setActiveTab] = useState('upload');
  const [selectedImage, setSelectedImage] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [prediction, setPrediction] = useState(null);

  const Result = {
    food: prediction,
    nutrition: {
      carbs: "High",
      protein: "Medium",
      fat: "High"
    }
  };

  const handleImageSelect = (imageData) => {
    setSelectedImage(imageData);
    setShowResult(false);
  };

  const handleCheckNutrition = async () => {
    const formData = new FormData();
    if (selectedImage) {
      setShowResult(true);
    
    formData.append("file", selectedImage.file);

    const res = await fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setPrediction(foodItems[data.prediction] || "Unknown Food");
  }
  };

  // const handleCheckNutrition = () => {
  //   if (selectedImage) {
  //     setShowResult(true);
  //   }
  // };

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setSelectedImage(null);
    setShowResult(false);
  };

  const foodItems = ['burger',
 'butter_naan',
 'chai',
 'chapati',
 'chole_bhature',
 'dal_makhani',
 'dhokla',
 'fried_rice',
 'idli',
 'jalebi',
 'kaathi_rolls',
 'kadai_paneer',
 'kulfi',
 'masala_dosa',
 'momos',
 'paani_puri',
 'pakode',
 'pav_bhaji',
 'pizza',
 'samosa'];

  const hasImage = selectedImage &&
    ((activeTab === 'upload' && selectedImage.type === 'upload') ||
      (activeTab === 'camera' && selectedImage.type === 'camera'));

  return (
    <div className="app flex flex-col md:flex-row">
      <div className="container rounded-xl max-h-[95vh] bg-gradient-to-br from-blue-50 to-indigo-100 mx-auto">
        {/* Title for the food list section */}
        <h1 className="text-xl font-extrabold text-center mb-4 text-slate-800 tracking-tight">
          Indian Delicacies
        </h1>

        {/* This is the main grid container for the food items.
            It's responsive, showing 1 column on mobile, 2 on sm screens,
            3 on md. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {/* Map over the foodItems array to create a card for each item. */}
          {foodItems.map((item, index) => (
            <div
              key={index}
              className="bg-white p-3 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
            >
              {/* Display the food item name.
                  The first letter is capitalized for better presentation. */}
              <h2 className="text-sm font-semibold text-slate-700 capitalize text-center">
                {item.replace(/_/g, ' ')}
              </h2>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full mx-5 bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] overflow-hidden">
        {/* Header */}
        <div className="app-header">
          <h1 className="app-title">NutriSnap 🍽️</h1>
          <p className="app-subtitle">What's On My Plate?</p>
        </div>

        {/* Tab Navigation */}
        <div className="tab-navigation">
          <button
            onClick={() => handleTabSwitch('upload')}
            className={`tab-button ${activeTab === 'upload' ? 'active' : ''}`}
          >
            📁 Upload Photo
          </button>
          <button
            onClick={() => handleTabSwitch('camera')}
            className={`tab-button ${activeTab === 'camera' ? 'active' : ''}`}
          >
            📱 Take Photo
          </button>
        </div> 
        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'upload' && (
            <ImageUpload
              onImageSelect={handleImageSelect}
              selectedImage={selectedImage}
            />
          )}

          {activeTab === 'camera' && (
            <CameraCapture
              onImageCapture={handleImageSelect}
              capturedImage={selectedImage}
            />
          )}

          {/* Check Nutrition Button */}
          <div className="nutrition-button-container">
            <button
              onClick={handleCheckNutrition}
              disabled={!hasImage}
              className={`nutrition-button ${hasImage ? 'enabled' : 'disabled'}`}
            >
              {hasImage ? '🔍 Check Nutrition' : '🔍 Select Image First'}
            </button>
          </div>

          {/* Result Card */}
          <ResultCard result={Result} isVisible={showResult} />
        </div> 
      </div>
    </div>
  );
}
