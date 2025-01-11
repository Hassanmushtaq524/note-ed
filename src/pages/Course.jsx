import React from 'react'
import { useParams } from 'react-router-dom'
function Course() {
    const { id } = useParams()
    
    return (
        <div id="course" className="w-full h-screen flex items-center justify-center ">
            Course {id}
        </div>
    )
}

export default Course;