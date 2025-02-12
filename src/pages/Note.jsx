import React, { useEffect, useState } from 'react'
import downloadIcon from "../assets/images/downloadicon.svg";
import Spinner from './Spinner';



function Note({ _id, name, username, date, user_id, ...rest }) {
    const [loading, setLoading] = useState(false);
    const [URL, setURL] = useState(null);

    /**
     * Download the note_id from a presigned url
     * 
     * @param {*} note_id 
     */
    const createURL = async (note_id) => {
        setLoading(true);
        try {
            const url = `${process.env.REACT_APP_BACKEND_URL}/note/${note_id}`;
            const response = await fetch(url, { method: "GET" });

            if (!response.ok) {
                throw new Error("Failed to get download URL");
            }

            const data = await response.json();
            return data.url;
        } catch (error) {
            console.error("Failed to create URL:", error);
            alert("Failed to create download URL. Please try again later.");
            return null;
        } finally {
            setLoading(false);
        }
    };

    /**
     * On mount
     */
    useEffect(() => {
        const fetchURL = async () => {
            const signedURL = await createURL(_id);
            if (signedURL) {
                setURL(signedURL);
            }
        };
        fetchURL();
    }, []);


    return (
        <div className="p-2 border-[0.5px] border-primary rounded-xl flex flex-col size-fit">
            {
                loading ?
                <>
                    <Spinner/>
                </>
                :
                <>
                    <div className="flex flex-row gap-2">
                        <a 
                            target='_blank'
                            href={URL}
                            className="w-[2rem] bg-primary text-white rounded-lg hover:bg-opacity-90 transition-all"
                        >
                            <img src={downloadIcon} className="w-full fill-white" />
                        </a>
                        <h5 className="text-lg font-bold">{name}</h5>
                    </div>
                    <h6 className="font-regular text-light-gray self-end">by {username}</h6>
                    <h6 className="font-regular text-light-gray self-end">created at {date}</h6>
                </>
            }
        </div>
    )
}

export default Note