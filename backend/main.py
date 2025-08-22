from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
import numpy as np
import io
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import tensorflow as tf

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for testing, allow all. Later restrict to ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# load model
model = tf.keras.models.load_model("models/nutrisnap1.h5")
IMG_SIZE = (256,256)  # replace with your training size

# preprocess function
def preprocess_image(image_bytes):
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    img = img.resize(IMG_SIZE)
    img_array = np.array(img) / 255.0
    return np.expand_dims(img_array, axis=0)

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image_bytes = await file.read()
    input_tensor = preprocess_image(image_bytes)
    preds = model.predict(input_tensor)
    predicted_class = int(np.argmax(preds, axis=1)[0])
    return JSONResponse({"prediction": predicted_class})
