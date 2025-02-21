import React, { useEffect, useState } from 'react'
import Dropdown from '../components/Dropdown';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { useQuery } from '@tanstack/react-query';
import DefaultDisplay from '../components/DefaultDisplay';



function Home() {
    const [courseCode, setCourseCode] = useState(null);
    const navigate = useNavigate();


    /**
     * Get all the course information from db
     */
    const getCourseOptions = async () => {
        const url = `${process.env.REACT_APP_BACKEND_URL}/course/`;
        const response = await fetch(url, {
            method: "GET"
        });
        if (!response.ok) {
            throw new Error("Error fetching course information");
        }
        return (await response.json());
        
    }



    /**
     * Cache
     */
    const { data, isLoading, isError } = useQuery({
        queryKey: ['home'],
        queryFn: getCourseOptions,
        staleTime: 5 * 60 * 1000, 
        retry: 2, 
    });
    


    /**
     * Search the course options and get the course
     */
    const getCourseId = async () => {
        if (!courseCode) {
            alert("Please select the course")
            return;
        } 
        let found = false;
        for (let i = 0; i < data.courses.length; i++) {
            if (
                data.courses[i].course_code == courseCode
            ) {
                found = true;
                navigate(`/course/${data.courses[i]._id}`)
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
        <DefaultDisplay>
            <div className="container w-[80%] h-fit flex flex-col md:grid md:grid-cols-2 md:grid-rows-2 md:col-span-1 gap-24">
                <div>
                    <h1>ALL YOUR NOTES FOR <span className="text-primary">OWU</span> CLASSES IN ONE PLACE</h1>
                </div>
                <div className="row-start-2 flex flex-col items-start justify-end gap-6">
                    {
                        isLoading ? 
                        <>
                            <h3 className="text-dark-gray">Fetching course information . . .</h3>
                        </>
                        :
                        <>
                            <Dropdown name="COURSE CODE" 
                                    options={data.courses.map(item => item.course_code)} 
                                    value={courseCode} 
                                    setValue={setCourseCode}
                            />
                            <Button text={"FIND NOTES"} onClick={getCourseId} />
                        </>
                    }
                </div>
                <div className="row-start-2 flex flex-col items-end justify-end">
                    <h4>CONTRIBUTE TO NOTES</h4>
                    <h4>& VIEW OTHER NOTES</h4>
                    <p className="font-thin">MADE BY HASSAN MUSHTAQ</p>
                    <a className="font-thin" href="mailto:hhmushtaq@owu.edu">hhmushtaq@owu.edu</a>
                </div>
            </div>
        </DefaultDisplay>
    )
}

export default Home;