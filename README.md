# NutriSnap 🥗 - Your Personal Food Classifier
Snap, Classify, and Know Your Food!
## 📸 About
NutriSnap is a lightweight and intuitive web application designed to help you quickly identify the food items in your pictures. Simply upload an image, and our custom-built machine learning model will instantly classify the food, providing you with a clear and accurate result.

Whether you're tracking your diet, exploring new foods, or just curious about what's on your plate, NutriSnap makes food classification as easy as taking a photo.

## ✨ Features
Custom Machine Learning Model: The app is powered by a custom-trained model built with TensorFlow and Keras, optimized for fast and accurate predictions.

20 Food Items Classified: Our model is trained to recognize and classify 20 distinct food items, with plans for expansion.

*Simple Web Interface: A clean and user-friendly web interface makes it easy for anyone to use, with no technical knowledge required.*

*Fast and Responsive: Built on Next.js frameworks to ensure a quick and smooth experience from upload to classification.*

## 🛠️ Technology Stack
Frontend: HTML, CSS, JavaScript, [Next.js]

Backend: Python (with Uvicorn for the web server)

Machine Learning: TensorFlow & Keras for the custom classification model

## 👥 Contributors
NutriSnap was a collaborative effort by three dedicated members. Below are the core contributions from each team member:

### **Samyak**

Led the project and & Built the backend server and API. Handled the integration of the ML model with the web application. Finding model data collection and performance tuning.

### **Vineeta**
Developed the machine learning model and responsible for model training, performance tuning.

###  **Jatin**

Designed and developed the user interface. Focused on creating a responsive, intuitive, and visually appealing user experience.

###  **Himanshu**

No Contribution

### 🚀 Getting Started
To get a local copy up and running, follow these simple steps. 

Installation

1. Clone the repository:
```
git clone https://github.com/Samz-9/Nutri-Snap

cd Nutri-Snap
```

2. Install the required Python packages:

```
pip install -r requirements.txt
```

3.Running the Web App

- Frontend

    ```
    npm run dev
    ```

- Start the Uvicorn server for Prediction
    ```
    uvicorn main:app --reload --host 0.0.0.0 --port 8000
    ```

### Open your web browser and navigate to http://localhost:3000 to access the application.

