import pdfplumber
from fastapi import UploadFile
import io
from pdf2image import convert_from_bytes

import pytesseract

async def extract_text_from_pdf(file: UploadFile):
    """
    Read text from a pdf
    """
    file_data = await file.read()
    file_like = io.BytesIO(file_data)

    with pdfplumber.open(file_like) as pdf:
        text = ""
        for page in pdf.pages:
            text += page.extract_text()
        return text


async def pdf_to_images(file):
    """
    Use the file object to get the images
    """
    file_data = await file.read()
    images = convert_from_bytes(file_data)
    return images



def extract_text_from_images(images):
    """
    Use extracted images from pdf to turn into text
    """
    text = ""
    for image in images:
        text += pytesseract.image_to_string(image)
    return text
