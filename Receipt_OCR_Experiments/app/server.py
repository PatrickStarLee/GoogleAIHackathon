from flask import Flask, request, jsonify
from PIL import Image
import io
import base64
from flask_cors import CORS, cross_origin
import pytesseract
import os
import a

import vertexai
from vertexai.generative_models import GenerativeModel, Part, FinishReason
import vertexai.preview.generative_models as generative_models

app = Flask(__name__)
CORS(app)

@app.route('/upload', methods=['POST'])
@cross_origin()
def upload_image():
    # Step 1: Receive the JSON data
    data = request.get_json()
    base64_image = data['image']
    base64_image=base64_image[base64_image.index(","):]
    image_data = base64.b64decode(base64_image)
    image = Image.open(io.BytesIO(image_data))
    text = pytesseract.image_to_string(image, config="-l eng --psm 3")
    llm_response = a.generate(text)
    return jsonify({'ocr': text, "llm": llm_response})

@app.route('/heartbeat', methods=['GET'])
@cross_origin()
def heartbeat():
    return jsonify({"Status": "Im a real boy"})

if __name__ == '__main__':
    app.run(host="0.0.0.0",debug=True)
