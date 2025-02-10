import React, { useEffect, useState } from 'react'
import Dropdown from '../components/Dropdown';
import { useNavigate } from 'react-router-dom';

function Home() {
    // TODO: make courseOptions into setCourse and a context
    const [courseOptions, setCourseOptions] = useState([])
    const [courseCode, setCourseCode] = useState(null);
    const navigate = useNavigate();


    /**
     * Get all the course information from db
     */
    const getCourseOptions = async () => {
        const url = `${process.env.REACT_APP_BACKEND_URL}/course/`;
        const response = await fetch(url, {
            method: "GET"
        })
        if (!response.ok) {
            throw Error("Error fetching course information")
        }
        const data = await response.json();
        setCourseOptions(data.courses);
    }
    

    /**
     * Search the course options and get the course
     */
    const getCourseId = async () => {
        if (!courseCode) {
            alert("Please select the course")
        } else {
            let found = false;
            for (let i = 0; i < courseOptions.length; i++) {
                if (
                    courseOptions[i].course_code == courseCode
                ) {
                    found = true;
                    navigate(`/course/${courseOptions[i]._id}`)
                }
            }
            if (!found) { alert("No course information found") }
            setCourseCode(null);
        }
    }



    /**
     * On mount
     */
    useEffect(() => {
        try {
            getCourseOptions();
        } catch (error) {
            console.log(error);
        }
    }, [])


    return (
        <div id="home" className="w-full h-screen flex items-center justify-center ">

            <div className="container w-[80%] h-fit grid grid-cols-2 grid-rows-2 col-span-1 gap-8">
                <div>
                    <h1>ALL YOUR NOTES FOR <span className="text-primary">OWU</span> CLASSES IN ONE PLACE</h1>
                </div>
                <div className="row-start-2 flex flex-col items-start justify-end gap-6">
                    <Dropdown name="COURSE CODE" 
                              options={courseOptions.map(item => item.course_code)} 
                              value={courseCode} 
                              setValue={setCourseCode}
                    />
                    <btn className="p-2 bg-primary rounded-xl text-white font-black w-fit" onClick={getCourseId}>
                        FIND NOTES
                    </btn>
                </div>
                <div className="row-start-2 flex flex-col items-end justify-end">
                    <h4>CONTRIBUTE TO NOTES</h4>
                    <h4>& VIEW OTHER NOTES</h4>
                    <p className="font-thin">MADE BY HASSAN MUSHTAQ</p>
                    <p className="font-thin">hhmushtaq@owu.edu</p>
                </div>
            </div>
        </div>
    )
}

export default Home;