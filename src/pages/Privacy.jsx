import React from 'react'
import DefaultDisplay from '../components/DefaultDisplay'

const Privacy = () => {
  return (
    <DefaultDisplay>
      <div className='w-[80dvw] flex flex-col gap-6'>
        <h1>Privacy Policy</h1>
        <h2>1. Introduction</h2>
        <p>Welcome to NotiNote! Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our platform.</p>
        <p>By using NotiNote, you agree to the terms of this Privacy Policy. If you do not agree, please do not use our services.</p>

        <h2>2. Information We Collect</h2>
        <ul>
            <li><strong>Personal Information:</strong> We collect:
                <ul>
                    <li><strong>Google OAuth Data</strong>: Google ID (sub), name, email, and role (user/admin). No passwords are stored.</li>
                </ul>
            </li>
            <li><strong>Content Data:</strong>
                <ul>
                    <li><strong>Uploaded Notes</strong>: PDFs you upload are publicly accessible to all users.</li>
                </ul>
            </li>
            <li><strong>Storage & Analytics:</strong>
                <ul>
                    <li>PostgreSQL Database (DigitalOcean) stores user information and note metadata.</li>
                    <li>AWS S3 stores uploaded PDFs.</li>
                    <li>Basic analytics (e.g., Netlify) may be used for tracking usage trends (without individual tracking).</li>
                </ul>
            </li>
        </ul>

        <h2>3. How We Use Your Information</h2>
        <ul>
            <li>Authenticate users via Google OAuth.</li>
            <li>Store and display uploaded notes.</li>
            <li>Enforce a <strong>daily upload limit</strong> of <strong>10 notes per day</strong>.</li>
            <li>We do <strong>not</strong>:
                <ul>
                    <li>Sell or share data with third parties.</li>
                    <li>Perform content analysis on uploaded notes.</li>
                </ul>
            </li>
        </ul>

        <h2>4. Data Retention & Deletion</h2>
        <ul>
            <li>Users can delete their uploaded notes.</li>
            <li>Users cannot manually delete their accounts.</li>
            <li>Deleted notes are permanently removed from the system.</li>
        </ul>

        <h2>5. Security Measures</h2>
        <ul>
            <li>Secure storage for all data.</li>
            <li>Google OAuth authentication.</li>
            <li>No sensitive data is shared with third parties.</li>
        </ul>

        <h2>6. User Rights</h2>
        <ul>
            <li>Users can view, upload, and delete notes.</li>
            <li>Users can stop using NotiNote at any time.</li>
        </ul>

        <h2>7. Policy Changes</h2>
        <p>We may update this Privacy Policy. Continued use of NotiNote after updates means acceptance of the new policy.</p>
        <p>For questions, contact us at <strong>[your contact email]</strong>.</p>

        <hr/>

        <h1 id="terms">Terms and Conditions</h1>

        <h2>1. Introduction</h2>
        <p>Welcome to NotiNote! By using our platform, you agree to these Terms & Conditions.</p>

        <h2>2. User Responsibilities</h2>
        <ul>
            <li>Do not upload irrelevant, illegal, or inappropriate content.</li>
            <li>Do not upload copyrighted material unless you own the rights.</li>
            <li>Respect the <strong>10-note daily upload limit</strong>.</li>
            <li>Uploaded notes are public and accessible by anyone.</li>
        </ul>
        <p>Violations may result in account suspension or a permanent ban.</p>

        <h2>3. Service Limitations</h2>
        <ul>
            <li>No guarantee of continuous availability.</li>
            <li>Not responsible for data loss.</li>
            <li>No warranties on the security or accuracy of stored data.</li>
        </ul>

        <h2>4. Content Ownership</h2>
        <ul>
            <li>Users own their uploaded notes.</li>
            <li>By uploading, you grant NotiNote permission to store and display your notes publicly.</li>
        </ul>

        <h2>5. Account & Data Usage</h2>
        <ul>
            <li>Google OAuth is required for access.</li>
            <li>You can delete notes but not your account.</li>
        </ul>

        <h2>6. Liability Disclaimer</h2>
        <ul>
            <li>Not responsible for:
                <ul>
                    <li>Data loss, service outages, or security breaches.</li>
                    <li>Misuse of publicly available notes.</li>
                </ul>
            </li>
            <li>Use NotiNote at your own risk.</li>
        </ul>

        <h2>7. Termination of Service</h2>
        <p>We reserve the right to suspend or terminate accounts that violate our policies.</p>

        <h2>8. Governing Law</h2>
        <p>These Terms are governed by <strong>[your country/state’s law]</strong>.</p>
        <p>For questions, contact us at <strong>hhmushtaq@owu.edu</strong>.</p>

      </div>
    </DefaultDisplay>
  )
}

export default Privacy