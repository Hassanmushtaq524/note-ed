import React from 'react'
import { useParams } from 'react-router-dom'
function Course() {
    const { id } = useParams()
    
    return (
        <div>Course {id}</div>
    )
}

export default Course