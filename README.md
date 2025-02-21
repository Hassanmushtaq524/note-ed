# NotiNote

NotiNote is a note storage application designed specifically for students at Ohio Wesleyan University. The app allows students to securely store their notes, upload PDF files for easy access, and manage their data efficiently. Notes are stored in a PostgreSQL database, while PDF files are stored in AWS S3 and made publicly accessible.

## Features

- **Secure Note Storage:** Students can securely store their notes in a database, accessible only to them.
- **PDF Uploads:** Users can upload and store PDF files, which are made publicly accessible even to non-authenticated users.
- **Google OAuth Authentication:** Users sign in with their Google accounts, storing only essential information such as name, email, and role (admin/user).
- **AI-Powered Suggestions:** Although no content analysis is performed on the notes, AI-powered suggestions for note improvements may be available.
- **Public PDF Access:** Uploaded PDFs are publicly accessible via a direct URL, even without authentication.

## Installation

### Prerequisites

1. **Node.js** (v16 or higher)
2. **Python 3.8+**
3. **Docker** (for local deployment)
4. **AWS S3** account (for storing PDFs)
5. **DigitalOcean account** (for PostgreSQL database)

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/notinotes.git
   cd notinotes/backend
