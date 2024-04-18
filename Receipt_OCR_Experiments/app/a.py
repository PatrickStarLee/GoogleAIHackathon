import base64
import vertexai
from vertexai.generative_models import GenerativeModel, Part, FinishReason
import vertexai.preview.generative_models as generative_models

def generate():
  vertexai.init(project="titanium-genre-420307", location="us-central1")
  model = GenerativeModel("gemini-1.0-pro-002")
  responses = model.generate_content(
      [text1],
      generation_config=generation_config,
      safety_settings=safety_settings,
      stream=True,
  )

  for response in responses:
    print(response.text, end="")

text1 = """This is a OCR of a receipt. Please extract in JSON form: the store name, total, address of store, along with the items their unit prices, total price, amount purchased, brand name, item name, item name full form (inferred). Any unknown item please write null instead of guessing

[\'0\', \'WQRGET\', \'EXPECT MORE PAY LESS:\', \'03/06/2016 05:25\', \'PM\', \'EXPIRES\', \'06/04/16\', \'CLEANING SUPPLIES\', \'003050132\', \'UPUP HOUSEH \', \'$1.94\', \'GROCERY\', \'071090012\', \'OREO COOKiE\', \'FC\', \'$5, 98\', \'2 0 $2.99\', \'ea\', \'071200113\', \'NATVAL ENER\', \'FC\', \'$5.89\', \'071201388\', \'MOTTS FRTSN\', \'FC\', \'51.50\', \'19273023\', \'Cartwheel_MfrCpn\', \'S0.50 -\', \'071201388\', \'MotTs FRTSN\', \'FC\', \'84,50\', \'3 0 $1\', \'50\', \'ea\', \'Saved $1,71 off_$6.21\', \'203140116\', \'V8\', \'FC\', \'84.19\', \'210110240\', \'OSCAR MAYER\', \'FC\', \'2.50\', \'210110375\', \'OSCAR MAYER\', \'FC\', \'83.07\', \'Cartwheel\', \'15% off $3.62\', \'211080156\', \'NAKED\', \'86\', \'50\', \'211124798\', \'TOMATO\', \'99\', \'211214061\', \'LETTUCE\', \'B\', \'2120804273\', \'MGRKESTERRS\', \'FC\', \'Hi\', \'212140031\', \'BC SDNLY\', \'SL\', \'FC\', \'Cartwheel\', \'10% off $1\', \'261011548\', \'PEPPERIDGE\', \'FC\', \'268ogo836\', \'SEUcKERS\', \'FC\', \'K3\', \'270020350\', \'LEAN CUISIN\', \'FC\', \'Cartwheel\', \'15% off $2.89\', \'270021296\', \'LEAN CUISIN\', \'Fc\', \'278821475\', \'EEeAN CUESIn\', \'FC\', \'BK\', \'Cartwhee]\', \'15% off $2.8\', \'270110029\', \'EVOL\', \'FC\', \'85,59\', \'Cartwheel\', \'30%\', \'off $7.99\', \'270110217\', \'BIRD SUBB H\', \'FC\', \'84.09\', \'284031157\', \'MP EGGS\', \'FC\', \'81.89\', \'Cartwheel\', \'5% off $1.99\', \'284050033\', \'REDDI WIP\', \'FC\', \'$3.72\', \'284062204\', \'MP H AND\', \'H\', \'FC\', \'81.41\', \'Cartwheel\', \'5%\', \'off $1.49\', \'284101094\', \'CHOBANI\', \'FC\', \'81\', \'284101095\', \'CHOBANI\', \'FC\', \'$\', \'88\', \'284101157\', \'CHoBan\', \'Fc\', \'$\', \'3\', \'1\', \'284101488\', \'S2\', \'00\', \'2\', \'0 $1.00\', \'ea\', \'288070759\', \'BREVERS\', \'FC\', \'$3.49\', \'Saved $0.60 off $4.09\', \'288070788\', \'BREYERS\', \'Fc\', \'83,49\', \"Saved $0.60 off $4.09\'\", \'HEALTH-BEAUTY-COSMETICS\', \'049090323\', \'AQUAF 2PK\', \'84.89\', \'049110079\', \'SONICARE\', \'T\', \'$21.99\', \'HOME\', \'072071302\', \'BISSELL\', \'[\', \'8129.99\', \'Saved $20 . 00\', \'$149, 99\', \'SUBTOTAL\', \'$246 , 00\', \'Your REDcard\', \'ngs\', \'55\', \'3\', \'MO TAX\', \'8 , 4750%\', \'on $151.37\', \'8i2;\', \'83\', \'Mo\', \'5 . 4750%\', \'on\', \'883 , 08\', \'84.55\', \'TOTAL\', \'$251 , 83\', \'off\', \'Sav\', \'TAX\']"""

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

generate()

