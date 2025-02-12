import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import backArrow from "../assets/images/back-arrow.svg";
import Note from './Note';

const types = [
    {btnText: "Lecture Notes", idText: "lecture_note"},
    {btnText: "Assignments", idText: "assignment"},
    {btnText: "Exams", idText: "exam"},
];


function Course({ mobileView, ...rest }) {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [filData, setFilData] = useState(null);
    const [selectedType, setSelectedType] = useState(0);
    const [loading, setLoading] = useState(true);    
    const navigate = useNavigate();


    /**
     * Fetch information
     */
    const fetchNoteInfo = async () => {
        try {     
            const url = `${process.env.REACT_APP_BACKEND_URL}/course/${id}`;
            setLoading(true);
            const response = await fetch(url, {
                method: "GET"
            })
            if (!response.ok) {
                throw Error("Error fetching course information")
            }
            const data = await response.json();
            setData(
                {
                    course: data.course,
                    notes: data.notes
                }
            );

        } catch (error) {
            console.error("Failed to fetch notes:", error);
            setData(null);
            alert("Failed to fetch notes. Please try again later.");
        } finally {
            setLoading(false);
        }
    }



    /**
     * On mount, we will fetch all notes, and keep that data and filter on selection
     */
    useEffect(() => {
        fetchNoteInfo();
    }, [])



    /**
     * Get note information
     * 
     */
    useEffect(() => {
        if (!data) return;
        setFilData({
            course: data.course,
            notes: data.notes.filter((note, i) => (note.type == types[selectedType].idText))
        })
    }, [selectedType, data])



    return (
        <div id="course" className="w-full h-dvh flex items-center justify-center p-[24px]">
            {
                loading ?
                <h3 className="text-light-gray">Fetching Notes . . .</h3>
                : 
                <>
                <div className="size-fit flex flex-row gap-32">
                    <button onClick={() => navigate("/")} className="px-4 py-2 rounded-xl bg-primary text-white h-fit">
                        <img src={backArrow} />
                    </button>
                    {/* Left container */}
                    <div className="left-container flex flex-col gap-24 min-w-fit min-h-fit">
                        {/* course info */}
                        <div className='relative w-full h-[10rem]'>
                            <h1 className="absolute top-0 left-0">{data?.course.course_code}</h1>
                            <h6 className="absolute bottom-0 left-0"> <span className="font-black">{data?.notes.length}</span> Total Items</h6>
                        </div>
                        {/* selection */}
                        <div className="w-full h-fit flex flex-col gap-6 items-end">
                            {types.map((t, i) => (
                                <button className={`p-2 rounded-xl font-regular w-[10rem] min-w-fit transition-all duration-500 border-[0.5px]
                                        ${ selectedType == i ? 'bg-primary text-white border-primary' : 'bg-white text-black border-light-gray'}`}
                                        onClick={() => setSelectedType(i)}
                                        >
                                    {t.btnText}
                                </button>
                            ))}
                        </div>
                        {/* add notes */}
                        <div className="flex flex-col items-end justify-start w-full">
                            <button className="p-5 rounded-lg font-regular w-[10rem] min-w-fit transition-all duration-500 bg-primary text-white">
                                + ADD NOTES
                            </button>
                        </div>
                    </div>
                    {/* Right, Notes display */}
                    <div className="overflow-y-scroll w-[55dvw] rounded-xl border-[0.5px] border-light-gray flex flex-wrap gap-6 p-4">
                        {
                            !filData?.notes.length ? 
                            <h2 className="font-bold">No items found <br/> BE THE FIRST TO CONTRIBUTE!</h2>
                            :
                            filData.notes.map((note, i) => (
                                <Note 
                                    key={i}
                                    _id = {note._id}
                                    name = {note.name}
                                    user_id = {note.user._id}
                                    username = {note.user.username}
                                    date = {note.created_at.slice(0, 10)}
                                />
                            ))
                        }
                    </div>
                </div>
                </>
            }
        </div>
    )
}

export default Course;