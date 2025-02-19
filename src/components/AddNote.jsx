import React, { useRef, useState } from 'react';
import Button from './Button';
import Spinner from '../pages/Spinner';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';



const AddNote = ({ courseId, noteTypes, onSuccess, ...rest }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const fileRef = useRef(null);
    const typeRef = useRef(null);
    const { user } = useAuth();
    const navigate = useNavigate();

    /**
     * Send request to backend to add note
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            if (!typeRef.current || !fileRef.current || !fileRef.current.files[0]) {
                throw Error("Please select a file and note type");
            }

            const formData = new FormData();
            formData.append('file', fileRef.current.files[0]);
            const selectedIndex = typeRef.current.selectedIndex - 1;
            const url = `${process.env.REACT_APP_BACKEND_URL}/course/${courseId}/${noteTypes[selectedIndex].idText}`;
            
            const response = await fetch(url, {
                method: 'POST',
                credentials: "include", 
                body: formData,
            });

            if (!response.ok) {
                throw Error("Failed to upload file");
            }
            
            onSuccess();
        } catch (error) {
            console.error("An error occurred:", error);
        } finally {
            setLoading(false);
            setOpen(false);
        }
    }


    return (
        <>
            {open &&
                <div
                    onClick={() => setOpen(false)} 
                    className="absolute top-0 left-0 z-50 size-full bg-transparent backdrop-blur-lg flex items-center justify-center"
                >
                        <form 
                            onSubmit={handleSubmit}
                            onClick={(e) => e.stopPropagation()} 
                            className="size-fit z-[60] bg-white border-[0.5px] border-light-gray rounded-xl p-6 flex flex-col items-start gap-6" action=""
                        >
                            <input ref={fileRef} type='file' className="border-[0.5px] border-primary rounded-xl p-4"/>
                            <select ref={typeRef} className="border-[0.5px] border-primary rounded-xl p-4">
                                <option>Please select item type</option>
                                {noteTypes.map((type, i) => (
                                    <option key={i}>{type.btnText}</option>
                                ))}
                            </select>
                            {
                                loading ? 
                                <Spinner />
                                :
                                <Button type={"submit"} text={"SUBMIT"}/>
                            }
                        </form>

                    
                </div>
            }
            <div className="flex flex-col items-end justify-start w-full">
                { 
                    user ? 
                    <>
                        <button 
                            onClick={() => setOpen(true)}
                            className="p-5 rounded-lg font-black w-[10rem] min-w-fit transition-all duration-500 bg-primary text-white">
                            + ADD NOTES
                        </button>
                    </>
                    :
                    <>
                        <button 
                            onClick={() => navigate("/signin")}
                            className="p-5 rounded-lg font-black w-[10rem] min-w-fit transition-all duration-500 bg-primary text-white">
                            LOGIN TO CONTRIBUTE
                        </button>
                    </>
                }
            </div>
        </>
    );
}

export default AddNote;