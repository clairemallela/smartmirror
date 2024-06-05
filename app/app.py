from flask import Flask, request, render_template, jsonify
import base64
from PIL import Image
from io import BytesIO
import os
from model.model import run_model

app = Flask(__name__, template_folder="./html")
app.config['UPLOAD_FOLDER'] = '../data/input_data'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    data = request.json
    if 'image' not in data:
        return "No image data", 400
    
    image_data = data['image'].split(',')[1]
    image = Image.open(BytesIO(base64.b64decode(image_data)))
    
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], 'captured_image.png')
    image.save(filepath)

    result = run_model(filepath)  # Run your model on the image
    return result  # Return the result

if __name__ == '__main__':
    app.run(debug=True)
