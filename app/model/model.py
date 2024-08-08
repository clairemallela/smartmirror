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
    
    result = "race: Asian"
    return result

# from PIL import Image
# import numpy as np
# from model.deepfaceLiteDetection import Race_Detection

# class Model():
#     def __init__(self):
#         self.raceDetection = Race_Detection()

#     def run_model(self, image_path):
#         # Load the uploaded img
#         allRaces, faceLocation, frame = self.raceDetection.findFrameWithFace(image_path)
        
#         # TODO modify accordingly when introducing support for multiple races.
#         result = "Race Detected:" + str(allRaces[0]) + ", Location: " + str(faceLocation[0]) if allRaces else "race: Unknown"
#         return result
