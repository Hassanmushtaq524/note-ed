import React, { useEffect, useState } from 'react'
import downloadIcon from "../assets/images/downloadicon.svg";
import Spinner from '../pages/Spinner';



function Note({ _id, name, username, date, user_id, ...rest }) {
    const [loading, setLoading] = useState(false);
    const [URL, setURL] = useState(null);


    
    /**
     * Download the note_id from a presigned url
     * 
     * @param {*} note_id 
     */
    const handleDownload = async (note_id) => {
        try {
            setLoading(true);
            const url = `${process.env.REACT_APP_BACKEND_URL}/note/${note_id}`;
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
            setLoading(false);
        }
    };



    return (
        <div className="p-2 border-[0.5px] border-primary rounded-xl flex flex-col size-fit">
                <>
                    <div className="flex flex-row gap-2">
                        {
                            loading ?
                            <>
                                <Spinner/>
                            </>
                            :
                            <>
                                <button 
                                    onClick={() => handleDownload(_id)}
                                    className="w-[2rem] bg-primary text-white rounded-lg hover:bg-opacity-90 transition-all"
                                >
                                    <img src={downloadIcon} className="w-full fill-white" />
                                </button>
                            </>
                        }
                        <h5 className="text-lg font-bold">{name}</h5>
                    </div>
                    <h6 className="font-regular text-light-gray self-end">by {username}</h6>
                    <h6 className="font-regular text-light-gray self-end">created at {date}</h6>
                </>
        </div>
    )
}

export default Note