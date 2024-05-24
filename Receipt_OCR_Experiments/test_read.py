import argparse
import pytesseract
from PIL import Image

def extract_fields(image_path):
    # Load the image
    image = Image.open(image_path)

    # Perform OCR on the image
    text = pytesseract.image_to_string(image, config="-l eng --psm 3")

    return text

def main():
    # Create argument parser
    parser = argparse.ArgumentParser(description='Extract fields from a receipt image.')
    parser.add_argument('image_path', type=str, help='Path to the receipt image')

    # Parse command-line arguments
    args = parser.parse_args()

    # Extract fields from the receipt image
    fields = extract_fields(args.image_path)

    print(fields)

if __name__ == "__main__":
    main()

"""
Demo with ReceiptSwiss:

Run Receipt to get OCR:
Ber ghote |

Grosse Scheidegg
3818 Grindelwald

Familie R. Muller

Rech. Nr. 4572 30, OY. 2007/13: 25317
Bar Tisch - 770)

exLatte Macchiato 4.50 - CHP 9.00

1xG loki S00) One 5. 00
IxSchweinschnitze | 2c. OO 2c. 00
IxChasspatz | 4 18, 50

Tota sone

incl, (Oe Mwet So.00eChE: «3.85

Entspricht in Euro 36.33 EUR
Es bediente Sie: Ursula

MwSt Nr.: 480 234
jel: 033 soe 16
Pax. : 083 bee oF a
E-mail: grossescheidegg@b luewin. ch

Fed to GPT asking for the total and store yielding

GPT Response:
https://chat.openai.com/share/db74ce3c-448d-4425-afc9-c84319b3875b

Refined:
https://chat.openai.com/share/3db08b5a-9300-4519-9ec7-497c6ceb54a7

With Target Example: https://chat.openai.com/share/a43add9e-d6e0-4b56-880f-b98b655019ae
"""
