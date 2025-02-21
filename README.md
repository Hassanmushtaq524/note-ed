# NotiNotes

NotiNotes is a note storage application designed specifically for students at Ohio Wesleyan University. The app allows students to securely store their notes, upload PDF files for easy access, and share them with other students. Notes are stored in a PostgreSQL database, while PDF files are stored in AWS S3 and made publicly accessible.

## Features

- **Secure Note Storage:** Students can securely store their notes in a database, accessible only to them.
- **PDF Uploads:** Users can upload and store PDF files, which are publicly accessible even to non-authenticated users.
- **Google OAuth Authentication:** Users sign in with their Google accounts, storing only essential information such as name, email, and role (admin/user).
- **Public PDF Access:** Uploaded PDFs are publicly accessible via a direct URL, even without authentication.

## Installation
```bash
   cd notinotes
   docker compose up --build
```

### Prerequisites

1. **Node.js** (v16 or higher)
2. **Python 3.8+**
3. **Docker** (for local deployment)
4. **AWS S3** account (for storing PDFs)
5. **DigitalOcean account** (for PostgreSQL database)

   
