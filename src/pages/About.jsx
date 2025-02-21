import React from 'react'
import DefaultDisplay from '../components/DefaultDisplay'

const About = () => {
  return (
    <DefaultDisplay>
        <div className='w-[80dvw] flex flex-col gap-6'>
            <h1>About</h1>
            <h2 className='font-bold'>What is NotiNotes?</h2>
            <p className='w-[60%]'>NotiNotes is a simple yet powerful platform designed for OWU students to store, organize, and share notes with eachother. The goal is to allow all OWU students to study and prepare better! NotiNotes makes knowledge more accessible.</p>
            <h2 className='font-bold'>How does it work?</h2>
            <p className='w-[60%]'><strong>Secure Login:</strong> Authenticate with Google OAuth for a seamless experience.</p>
            <p className='w-[60%]'><strong>Upload & Organize:</strong> Upload PDFs and categorize them efficiently.</p>
            <p className='w-[60%]'><strong>Public & Private Access:</strong> All notes are publicy shared with other OWU students!</p>
            <p className='w-[60%]'><strong>Daily Upload Limit:</strong> Users can upload up to 10 notes per day to ensure quality content</p>
            <h2 className='font-bold'>Why use NotiNote?</h2>
            <p className='w-[60%]'><strong>Easy Access:</strong> Keep all your notes in one place, accessible anytime.</p>
            <p className='w-[60%]'><strong>Public Sharing:</strong> Help fellow students by making study materials available.</p>
            <h2 className='font-bold'>Who is it for?</h2>
            <p className='w-[60%]'><strong>OWU Students:</strong> Store lecture notes, study guides, and exam prep materials.</p>
        </div>
    </DefaultDisplay>
  )
}

export default About