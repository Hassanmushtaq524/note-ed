import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import backArrow from "../assets/images/back-arrow.svg";
import Note from '../components/Note';
import AddNote from '../components/AddNote';
import DefaultDisplay from '../components/DefaultDisplay';

const types = [
    { btnText: "Lecture Notes", idText: "lecture_note" },
    { btnText: "Assignments", idText: "assignment" },
    { btnText: "Exams", idText: "exam" },
];

function Course({ mobileView, ...rest }) {
    const { id } = useParams();
    const [selectedType, setSelectedType] = useState(0);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    /**
     * Fetch course and notes data using React Query
     */
    const fetchCourseData = async () => {
        const url = `${process.env.REACT_APP_BACKEND_URL}/course/${id}?page=${page}&type=${types[selectedType].idText}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error fetching course information");
        }
        return (await response.json());
    };
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['course', id, page, selectedType],
        queryFn: fetchCourseData,
        staleTime: 5 * 60 * 1000, 
        retry: 2, 
    });




    if (isLoading) {
        return <h3 className="w-full h-dvh flex items-center justify-center text-light-gray">Fetching Notes . . .</h3>;
    }

    if (isError) {
        return <h3 className="w-full h-dvh flex items-center justify-center text-red-500">Failed to fetch notes. Please try again later.</h3>;
    }

    return (
        <DefaultDisplay>
            <div className="size-full md:size-fit flex flex-col md:flex-row gap-32">
                {
                    !mobileView &&
                    <button onClick={() => navigate("/")} className="px-4 py-2  bg-primary text-white h-fit">
                        <img src={backArrow} />
                    </button>
                }
                
                {/* Left container */}
                <div className="left-container flex flex-row flex-wrap w-full gap-6 md:w-fit md:justify-normal md:flex-col md:gap-24">
                    {/* Course Info */}
                    <div className='relative w-full h-[10rem]'>
                        <h1 className="absolute top-0 left-0">{data?.course.course_code}</h1>
                        <h6 className="absolute bottom-0 left-0">{data?.course.name}</h6>
                    </div>

                    {/* Type Selection */}
                    <div className="w-full h-fit flex flex-col gap-6 items-start">
                        {types.map((t, i) => (
                            <button key={t.idText}
                                className={`p-2  font-regular w-[10rem] min-w-fit transition-all duration-500 border-[0.5px]
                                        ${selectedType === i ? 'bg-primary text-white border-primary' : 'bg-white text-black border-light-gray'}`}
                                onClick={() => {
                                    setSelectedType(i);
                                    setPage(1);
                                }}
                            >
                                {t.btnText}
                            </button>
                        ))}
                    </div>

                    {/* Add Notes */}
                    <AddNote mobileView={mobileView} courseId={id} noteTypes={types} onSuccess={refetch}/>
                </div>

                {/* Notes Display */}
                <div className="flex flex-col gap-4 w-full">
                    {/* Notes */}
                    <div className="w-full overflow-y-scroll md:w-[40rem] h-[40rem]  border-[0.5px] border-light-gray flex flex-col gap-4 p-4">
                        {data.notes.length === 0 ? (
                            <h2 className="font-bold">No items found</h2>
                        ) : (
                            data.notes.map((note) => (
                                <Note 
                                    key={note._id}
                                    _id={note._id}
                                    name={note.name}
                                    user_id={note.user._id}
                                    username={note.user.username}
                                    date={note.created_at.slice(0, 10)}
                                    onDelete={refetch}
                                />
                            ))
                        )}
                    </div>
                    
                    {/* Pagination Controls */}
                    <div className="flex justify-between items-center px-4">
                        <button 
                            onClick={() => setPage(prev => Math.max(1, prev - 1))}
                            disabled={page === 1}
                            className={`px-4 py-2  ${page === 1 ? 'bg-gray-300' : 'bg-primary'} text-white`}
                        >
                            Previous
                        </button>
                        <span>Page {page}</span>
                        <button 
                            onClick={() => setPage(prev => prev + 1)}
                            disabled={data?.pagination.page >= data?.pagination.total_pages}
                            className={`px-4 py-2  ${data?.pagination.page >= data?.pagination.total_pages ? 'bg-gray-300' : 'bg-primary'} text-white`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </DefaultDisplay>
    );
}

export default Course;
