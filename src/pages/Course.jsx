import React, { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import backArrow from "../assets/images/back-arrow.svg";
import Note from '../components/Note';
import AddNote from '../components/AddNote';

const types = [
    { btnText: "Lecture Notes", idText: "lecture_note" },
    { btnText: "Assignments", idText: "assignment" },
    { btnText: "Exams", idText: "exam" },
];

function Course({ mobileView, ...rest }) {
    const { id } = useParams();
    const [selectedType, setSelectedType] = useState(0);
    const navigate = useNavigate();

    /**
     * Fetch course and notes data using React Query
     */
    const fetchCourseData = async () => {
        const url = `${process.env.REACT_APP_BACKEND_URL}/course/${id}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error fetching course information");
        }
        return (await response.json());
    };

    const { data, isLoading, isError } = useQuery({
        queryKey: ['course', id],
        queryFn: fetchCourseData,
        staleTime: 5 * 60 * 1000, 
        retry: 2, 
    });

    /**
     * Filter notes based on selected type
     */
    const filteredNotes = useMemo(() => {
        if (!data) return [];
        return data.notes.filter(note => note.type === types[selectedType].idText);
    }, [data, selectedType]);



    if (isLoading) {
        return <h3 className="text-light-gray">Fetching Notes . . .</h3>;
    }

    if (isError) {
        return <h3 className="text-red-500">Failed to fetch notes. Please try again later.</h3>;
    }

    return (
        <div id="course" className="w-full h-dvh flex items-center justify-center p-[24px]">
            <div className="size-fit flex flex-row gap-32">
                <button onClick={() => navigate("/")} className="px-4 py-2 rounded-xl bg-primary text-white h-fit">
                    <img src={backArrow} />
                </button>
                
                {/* Left container */}
                <div className="left-container flex flex-col gap-24 min-w-fit min-h-fit">
                    {/* Course Info */}
                    <div className='relative w-full h-[10rem]'>
                        <h1 className="absolute top-0 left-0">{data?.course.course_code}</h1>
                        <h6 className="absolute bottom-0 left-0">
                            <span className="font-black">{data?.notes.length}</span> Total Items
                        </h6>
                    </div>

                    {/* Type Selection */}
                    <div className="w-full h-fit flex flex-col gap-6 items-end">
                        {types.map((t, i) => (
                            <button key={t.idText}
                                className={`p-2 rounded-xl font-regular w-[10rem] min-w-fit transition-all duration-500 border-[0.5px]
                                        ${selectedType === i ? 'bg-primary text-white border-primary' : 'bg-white text-black border-light-gray'}`}
                                onClick={() => setSelectedType(i)}>
                                {t.btnText}
                            </button>
                        ))}
                    </div>

                    {/* Add Notes */}
                    <AddNote courseId={id} noteTypes={types} />
                </div>

                {/* Notes Display */}
                <div className="overflow-y-scroll w-[55dvw] rounded-xl border-[0.5px] border-light-gray flex flex-wrap gap-6 p-4">
                    {filteredNotes.length === 0 ? (
                        <h2 className="font-bold">No items found <br /> BE THE FIRST TO CONTRIBUTE!</h2>
                    ) : (
                        filteredNotes.map((note) => (
                            <Note 
                                key={note._id}
                                _id={note._id}
                                name={note.name}
                                user_id={note.user._id}
                                username={note.user.username}
                                date={note.created_at.slice(0, 10)}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Course;
