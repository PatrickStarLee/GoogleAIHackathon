import vertexai
from vertexai.generative_models import GenerativeModel, Part, FinishReason
import vertexai.preview.generative_models as generative_models

generation_config = {
    "max_output_tokens": 8192,
    "temperature": 0.3,
    "top_p": 1,
}

safety_settings = {
    generative_models.HarmCategory.HARM_CATEGORY_HATE_SPEECH: generative_models.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    generative_models.HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: generative_models.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    generative_models.HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: generative_models.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    generative_models.HarmCategory.HARM_CATEGORY_HARASSMENT: generative_models.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
}

def generate(ocr_result):
  assert isinstance(ocr_result, str)
  vertexai.init(project="titanium-genre-420307", location="us-central1")
  model = GenerativeModel("gemini-1.0-pro-002")
  text1 = """This is a OCR of a receipt. Please extract in JSON form: the store name, total, address of store, along with the items their unit prices, total price, amount purchased, brand name, item name, item name full form (inferred). Any unknown item please write null instead of guessing"""
  text1 += "\n"+ocr_result
  responses = model.generate_content(
      [text1],
      generation_config=generation_config,
      safety_settings=safety_settings,
      stream=True,
  )
  out = []
  for response in responses:
    out.append(response.text)
  return "".join(out)
