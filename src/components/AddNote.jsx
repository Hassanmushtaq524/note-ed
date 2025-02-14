import React, { useRef, useState } from 'react';
import Button from './Button';



const AddNote = ({ courseId, noteTypes, ...rest }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const fileRef = useRef(null);
    const typeRef = useRef(null);


    /**
     * Send request to backend to add note
     */
    const handleSubmit = async () => {
        try {
            setLoading(true);
            if (!typeRef.current || !fileRef.current) {
                throw Error("An error occurred adding note")
            }
            const url = `${process.env.REACT_APP_BACKEND_URL}/course/${courseId}/${typeRef.current.value}`;
        } catch (error) {
            console.error("An error occured:", error);
        } finally {
            setLoading(false);
        }
    } 


    return (
        <>
            {open ?
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
                            <Button type={"submit"} text={"SUBMIT"}/>
                        </form>

                    
                </div>
            :
                <div className="flex flex-col items-end justify-start w-full">
                    <button 
                        onClick={() => setOpen(true)}
                        className="p-5 rounded-lg font-black w-[10rem] min-w-fit transition-all duration-500 bg-primary text-white">
                        + ADD NOTES
                    </button>
                </div>
            }
        </>
    );
}

export default AddNote;