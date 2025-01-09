from fastapi import File, UploadFile
import boto3
import hashlib
from botocore.exceptions import NoCredentialsError
from dotenv import load_dotenv
import os
load_dotenv()



# AWS configuration
AWS_ACCESS_KEY = os.getenv("ACCESS_KEY")
AWS_SECRET_KEY = os.getenv("SECRET_ACCESS_KEY")
BUCKET_NAME = os.getenv("BUCKET_NAME")
BUCKET_REGION = os.getenv("BUCKET_REGION")



def generate_unique_key(filename: str, file_content: bytes) -> str:
    """
    Generate a unique S3 key using SHA-256 hash of the file content and its name.
    """
    # Combine file content and filename for hashing
    hash_input = f"{filename}-{hashlib.sha256(file_content).hexdigest()}"
    unique_hash = hashlib.sha256(hash_input.encode()).hexdigest()
    # Use the hash as part of the S3 key
    return f"uploads/{unique_hash}.pdf"



# Function to upload a file
async def upload_to_s3(file: UploadFile):
    """
    Upload a file to an S3 bucket.

    :param file_name: File to upload
    :param bucket_name: S3 bucket name
    :param object_name: S3 object name. If not specified, file_name is used.
    :return: True if file was uploaded, else False
    """

    # Create S3 client
    s3_client = boto3.client(
        "s3",
        aws_access_key_id=AWS_ACCESS_KEY,
        aws_secret_access_key=AWS_SECRET_KEY,
    )

    try:
        # Read file content for hashing
        file_content = await file.read()
        # Generate unique S3 key
        s3_key = generate_unique_key(file.filename, file_content)
        # Upload the file
        file.file.seek(0)
        s3_client.upload_fileobj(file.file, BUCKET_NAME, s3_key)
        # generate url
        pdf_url = f"https://{BUCKET_NAME}.s3.{BUCKET_REGION}.amazonaws.com/{s3_key}"
        return pdf_url
    except FileNotFoundError:
        return None
    except NoCredentialsError:
        return None
