# Use official Python image
FROM python:3.12

# Set working directory inside container
WORKDIR /app

# Copy only requirements.txt first (to cache dependencies)
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend files
COPY . .

# Expose FastAPI port
EXPOSE 8000

# Run FastAPI app
CMD ["python", "main.py"]
