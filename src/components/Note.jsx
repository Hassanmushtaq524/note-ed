import React, { useEffect, useState } from 'react'
import downloadIcon from "../assets/images/downloadicon.svg";
import deleteIcon from "../assets/images/deleteicon.svg";
import Spinner from '../pages/Spinner';
import { useAuth } from '../context/AuthContext';
import Button from './Button';



function Note({ _id, name, username, date, user_id, onDelete, ...rest }) {
    const [ downloading, setDownloading ] = useState(false);
    const [ deleting, setDeleting ] = useState(false);
    const [ open, setOpen ] = useState();
    const { user } = useAuth();

    /**
     * Create sliced name
     */
    const shortenName = (name) => {
        return name.length > 20 ? `${name.slice(0, 20)}...` : name;
    }

    
    /**
     * Download the note_id from a presigned url
     * 
     * @param {*} note_id 
     */
    const handleDownload = async () => {
        try {
            setDownloading(true);
            const url = `${process.env.REACT_APP_BACKEND_URL}/note/${_id}`;
            const response = await fetch(url, { method: "GET" });

            if (!response.ok) {
                throw new Error(`Failed to get download URL: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            if (!data?.url) {
                throw new Error("Invalid response: missing download URL");
            }

            const link = document.createElement('a');
            link.href = data.url;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Download failed:", error);
            alert("Failed to download the file. Please try again later.");
        } finally {
            setDownloading(false);
        }
    };



    const handleDelete = async () => {
        try {
            setDeleting(true);
            const url = `${process.env.REACT_APP_BACKEND_URL}/note/${_id}`;
            const response = await fetch(url, { method: "DELETE", credentials: "include" });
            if (!response.ok) {
                throw new Error("Could not delete note")
            }
            onDelete();
        } catch (error) {
            alert(error);
        } finally {
            setDeleting(false);
            setOpen(false);
        }
    }   


    return (
        <div className="p-2 border-[0.5px] border-primary rounded-xl flex flex-col size-fit">
                <>
                    <div className="flex flex-row gap-2">
                        {
                            downloading ?
                            <>
                                <Spinner/>
                            </>
                            :
                            <>
                                <button 
                                    onClick={() => handleDownload()}
                                    className="w-[2rem] bg-primary text-white rounded-lg hover:bg-opacity-90 transition-all flex items-center justify-center"
                                >
                                    <img src={downloadIcon} className="min-w-[90%] fill-white" />
                                </button>
                            </>
                        }
                        <h5 onClick={() => handleDownload()}
                            className="hover:cursor-pointer text-lg font-bold"
                        >
                            {shortenName(name)}
                        </h5>
                    </div>
                    <h6 className="font-regular text-light-gray self-end">by {username}</h6>
                    <h6 className="font-regular text-light-gray self-end">created at {date}</h6>
                    {(user_id === user?._id) && 
                        <button 
                            onClick={() => {setOpen(true)}}
                            className="p-2 w-[2rem] bg-primary text-white rounded-lg hover:bg-opacity-90 transition-all flex items-center justify-center"
                        >
                            <img src={deleteIcon} className="min-w-[90%] fill-white" />
                        </button>
                    }
                    { open &&
                        <div 
                            onClick={() => {setOpen(false)}}
                            className="absolute top-0 left-0 z-50 size-full bg-transparent backdrop-blur-lg flex items-center justify-center"
                        >   
                            {
                                deleting ? 
                                <>
                                    <Spinner />
                                </>
                                :
                                <div 
                                    onClick={(e) => e.stopPropagation()}
                                    className="size-fit border-[0.5px] border-primary flex flex-col justify-center items-center p-4 gap-4 bg-white rounded-xl"
                                >
                                    <h5>Are you sure you want to delete?</h5>
                                    <div className="flex gap-4">
                                        <Button onClick={handleDelete} containerClass={"!bg-green-800"} text={"Yes"}/>
                                        <Button onClick={() => {setOpen(false)}} containerClass={"!bg-red"} text={"No"}/>
                                    </div>
                                </div>
                            }
                        </div>
                    }
                </>
        </div>
    )
}

export default Note;