from PIL import Image
import numpy as np
from model.deepfaceLiteDetection import Race_Detection

class Model():
    def __init__(self):
        self.raceDetection = Race_Detection()

    def run_model(self, image_path):
        # Load the uploaded img
        allRaces, faceLocation, frame = self.raceDetection.findFrameWithFace(image_path)
        
        # TODO modify accordingly when introducing support for multiple races.
        # result = "Race Detected: " + str.title(str(allRaces[0])) + ", Location: " + str(faceLocation[0]) if allRaces else "Race Detected: Unknown"
        result = "Race Detected: " + str.title(str(allRaces[0])) if allRaces else "Race Detected: Unknown"
        return result
