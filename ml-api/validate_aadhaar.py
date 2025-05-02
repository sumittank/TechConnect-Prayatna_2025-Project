import sys
import cv2
import pytesseract
import re

import sys
sys.stdout.reconfigure(encoding='utf-8')

pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"


verhoeff_table_d = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
    [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
    [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
    [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
    [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
    [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
    [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
    [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
    [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
]


verhoeff_table_p = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
    [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
    [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
    [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
    [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
    [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
    [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]
]


verhoeff_table_inv = [0, 4, 3, 2, 1, 5, 6, 7, 8, 9]

def verhoeff_validate(aadhaar_number):
    """Validate Aadhaar number using Verhoeff Algorithm."""
    aadhaar_number = aadhaar_number.replace(" ", "")  

    if len(aadhaar_number) != 12 or not aadhaar_number.isdigit():
        return False 

    c = 0
    num_digits = list(map(int, aadhaar_number[::-1]))  
    for i, digit in enumerate(num_digits):
        c = verhoeff_table_d[c][verhoeff_table_p[i % 8][digit]]

    return c == 0  

def extract_text(image_path):
    """Extract text from Aadhaar image using OCR."""
    image = cv2.imread(image_path)

    if image is None:
        print("❌ Error: Unable to read the image. Check the file path.")
        sys.exit(1)

    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    processed_image = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]
    extracted_text = pytesseract.image_to_string(processed_image)
    return extracted_text.strip()

def extract_details(text):
    """Extract Aadhaar details (Number, DOB, Gender) from OCR text."""
    aadhaar_pattern = r"\b\d{4}\s\d{4}\s\d{4}\b"
    dob_pattern = r"\b\d{2}/\d{2}/\d{4}\b"
    gender_pattern = r"\b(MALE|FEMALE|TRANSGENDER)\b"

    aadhaar_match = re.search(aadhaar_pattern, text)
    dob_match = re.search(dob_pattern, text)
    gender_match = re.search(gender_pattern, text, re.IGNORECASE)

    return {
        "aadhaar_number": aadhaar_match.group() if aadhaar_match else None,
        "dob": dob_match.group() if dob_match else None,
        "gender": gender_match.group().capitalize() if gender_match else None
    }

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python validate_aadhaar.py <image_path>")
        sys.exit(1)

    image_path = sys.argv[1]

    print("\n🔄 Processing Aadhaar image...")


    extracted_text = extract_text(image_path)


    details = extract_details(extracted_text)

    print("\n✅ Aadhaar Verification Summary:")
    print("-----------------------------------")

    if details["aadhaar_number"]:
        print(f"📌 Aadhaar Number: {details['aadhaar_number']}")


        if verhoeff_validate(details["aadhaar_number"]):
            print("✅ Aadhaar Number is **VALID** ✅")
        else:
            print("❌ Aadhaar Number is **INVALID** ❌")
    else:
        print("❌ Aadhaar Number Not Found")

    if details["dob"]:
        print(f"📌 DOB: {details['dob']}")
    else:
        print("❌ Date of Birth Not Found")

    if details["gender"]:
        print(f"📌 Gender: {details['gender']}")
    else:
        print("❌ Gender Not Found")

 
    if "Unique Identification Authority of India" not in extracted_text:
        print("⚠ Possible Fake Aadhaar (Missing: Unique Identification Authority of India)")
    else:
        print("✅ Aadhaar Document Verified Successfully.")

    print("\n✅ Aadhaar Document Verification Completed.")
