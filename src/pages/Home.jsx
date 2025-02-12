import React, { useEffect, useState } from 'react'
import Dropdown from '../components/Dropdown';
import { useNavigate } from 'react-router-dom';

function Home() {
    // TODO: make courseOptions into setCourse and a context
    const [courseOptions, setCourseOptions] = useState([])
    const [courseCode, setCourseCode] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    /**
     * Get all the course information from db
     */
    const getCourseOptions = async () => {
        const url = `${process.env.REACT_APP_BACKEND_URL}/course/`;
        setLoading(true);
        try {
            const response = await fetch(url, {
                method: "GET"
            });
            if (!response.ok) {
                throw new Error("Error fetching course information");
            }
            const data = await response.json();
            setCourseOptions(data.courses);
        } catch (error) {
            console.error("Failed to fetch courses:", error);
            setCourseOptions([]);
            alert("Failed to load courses. Please try again later.");
        } finally {
            setLoading(false);
        }
    }
    

    /**
     * Search the course options and get the course
     */
    const getCourseId = async () => {
        if (!courseCode) {
            alert("Please select the course")
            return;
        } 
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



    /**
     * On mount
     */
    useEffect(() => {
        getCourseOptions();
    }, [])


    return (
        <div id="home" className="w-full h-dvh flex items-center justify-center ">

            <div className="container w-[80%] h-fit flex flex-col md:grid md:grid-cols-2 md:grid-rows-2 md:col-span-1 gap-24">
                <div>
                    <h1>ALL YOUR NOTES FOR <span className="text-primary">OWU</span> CLASSES IN ONE PLACE</h1>
                </div>
                <div className="row-start-2 flex flex-col items-start justify-end gap-6">
                    {
                        loading ? 
                        <>
                            <h3 className="text-dark-gray">Fetching course information . . .</h3>
                        </>
                        :
                        <>
                            <Dropdown name="COURSE CODE" 
                                    options={courseOptions.map(item => item.course_code)} 
                                    value={courseCode} 
                                    setValue={setCourseCode}
                            />
                            <btn className="p-2 bg-primary rounded-xl text-white font-black w-fit cursor-pointer" onClick={getCourseId}>
                                FIND NOTES
                            </btn>
                        </>
                    }
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