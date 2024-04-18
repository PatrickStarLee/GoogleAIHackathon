from flask import Flask, request, jsonify
from PIL import Image
import io
import base64
from flask_cors import CORS
import pytesseract
import os

import vertexai
from vertexai.generative_models import GenerativeModel, Part, FinishReason
import vertexai.preview.generative_models as generative_models

GOOGLE_API_KEY = os.environ['GOOGLE_API_KEY']
genai.configure(api_key=GOOGLE_API_KEY)

app = Flask(__name__)
cors = CORS(app)
@app.route('/upload', methods=['POST'])
def upload_image():
    # Step 1: Receive the JSON data
    data = request.get_json()
    base64_image = data['image']
    base64_image=base64_image[base64_image.index(","):]
    image_data = base64.b64decode(base64_image)
    image = Image.open(io.BytesIO(image_data))
    text = pytesseract.image_to_string(image, config="-l eng --psm 3")
    print(text)
    model = genai.GenerativeModel('gemini-pro')
    llm_response = model.generate_content(f"{text} This is a OCR of a receipt. Please extract in JSON form: the store name, total, address of store, along with the items their unit prices, total price, amount purchased, brand name, item name, item name full form (inferred). Any unknown item please write null instead of guessing
")
    return jsonify({'ocr': text, "llm": llm_response})

if __name__ == '__main__':
    app.run(debug=True)
