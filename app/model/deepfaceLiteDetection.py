from fdlite import FaceDetection, FaceDetectionModel
from fdlite.render import Colors, detections_to_render_data
import tensorflow as tf
import numpy as np
import cv2
import sys


class Race_Detection():
    def __init__(self):        
        # Load fdlite TensorFlow Lite model
        self.detect_faces = FaceDetection(model_type=FaceDetectionModel.BACK_CAMERA)

        # Load race dection TensorFlow Lite model
        self.interpreter = tf.lite.Interpreter(model_path="models/fdlite_deepfaceLite/race_model_single_batch.tflite")
        self.interpreter.allocate_tensors()

        self.input_details = self.interpreter.get_input_details()
        self.output_details = self.interpreter.get_output_details()

        # race labels
        self.race_labels = ["asian", "indian", "black", "white", "middle eastern", "latino hispanic"]


    def runFairFace(self, face_roi):
        # Resize the face ROI to match the input shape of the model
        resized_face = cv2.resize(face_roi, (224, 224), interpolation=cv2.INTER_AREA)


        # Prepare the input for TensorFlow Lite
        input_tensor = np.array(resized_face, dtype=np.float32)
        input_tensor = np.expand_dims(input_tensor, 0)  # Add batch dimension

        # Set the tensor to point to the input data to be inferred
        self.interpreter.set_tensor(self.input_details[0]['index'], input_tensor)
        
        # Run inference
        self.interpreter.invoke()
        preds = self.interpreter.get_tensor(self.output_details[0]['index'])

        # Get the most confident race
        preds = preds[0]
        race = self.race_labels[np.argmax(preds)]

        # Get the top 4 races
        top_indices = np.argsort(preds)[-4:][::-1]
        top_races = [(self.race_labels[i], preds[i]) for i in top_indices]
        
        return race, top_races
        # print(preds)
            

    def findFrameWithFace(self, img_path = "captured_image.png"):
        # TODO ADD Count down before trying to find face
        try:
            frame = cv2.imread(img_path)
        except:
            print("Image Read Error")
            sys.exit("Image Read Error")
        faces = self.detect_faces(frame)


        allRaces = []   # stores detected races
        faceLocation = [] # respective location stored as (y, x, y2, x2)
        if faces:
            render_data = detections_to_render_data(faces, bounds_color=Colors.GREEN)
            for i in range(len(render_data[0].data)):
                item = render_data[0].data[i]
                x_norm, y_norm, x2_norm, y2_norm = item.left, item.top, item.right, item.bottom

                # Assuming the dimensions of your image
                image_width = frame.shape[1]
                image_height = frame.shape[0]

                # Convert normalized coordinates to pixel coordinates
                x = int(x_norm * image_width)
                y = int(y_norm * image_height)
                x2 = int(x2_norm * image_width)
                y2 = int(y2_norm * image_height)

                # Run race prediction
                face_roi = frame[y:y2, x:x2]
                # if 0xFF == ord('r'):
                race, top_races = self.runFairFace(face_roi)
                allRaces.append(race)
                faceLocation.append((y,x,y2,x2))


                # Draw the rectangle
                cv2.rectangle(frame, (x, y), (x2, y2), (0, 0, 255), 2)

                # Put the main race on top
                cv2.putText(frame, race, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 0, 255), 2)

                # put the top 4 on bottom
                start_y = y2 + 20
                for i, (label, score) in enumerate(top_races):
                    text = f"{label}: {score:.2e}"
                    cv2.putText(frame, text, (x, start_y + i * 20), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 0, 255), 1)


        # TODO if frontEnd team wants, add logic to return location along with allRaces
        return allRaces, faceLocation, frame


if __name__ == "__main__":
    raceDetection = Race_Detection()
    allRaces, faceLocation, frame = raceDetection.findFrameWithFace("data/input_data/captured_image.png")
    print("Detected races:", allRaces)
    print("Detected faces:", faceLocation)

    cv2.imshow('Image', frame)
    # Wait for a key press and close the image window
    cv2.waitKey(0)
    cv2.destroyAllWindows()