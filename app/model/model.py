from PIL import Image
import numpy as np

def preprocess_image(image_path):
    image = Image.open(image_path)
    image = image.resize((224, 224))
    image = np.array(image) / 255.0
    image = np.expand_dims(image, axis=0)
    return image

def run_model(image_path):
    # Load the uploaded img
    image = preprocess_image(image_path)
    
    # TODO: FDlite model and preprocessig
    
    result = "race: Unknown"
    return result
