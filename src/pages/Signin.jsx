import React, { useEffect, useState } from 'react'
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';


function Signin() {
    const { user, handleLoginSuccess, handleLoginFailure } = useAuth(); 
    const [ loading, setLoading ] = useState(false);
    const navigate = useNavigate();



    /**
     * On mount + user change
     */
    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate])



    /**
     * Pass the credential to auth context
     * 
     * @param {*} credential 
     */
    const responseGoogle = async (credential) => { 
        try {    
            setLoading(true);
            if (!credential) {
                throw new Error("Login failed")
            }        
            await handleLoginSuccess(credential)
        } catch (error) {
            console.error("An error occurred signing in", error)
            alert("An error occurred signing in")
        } finally {
            setLoading(false);
        }

    } 


    return (
        <div id="sign-in" className="w-full h-screen flex items-center justify-center">
            <div className="w-[40%] flex flex-col gap-4 p-6 border-[1px] rounded-xl border-light-gray justify-center items-center">
                {
                    loading ?
                    <>
                        <Spinner />
                    </>
                    :
                    <>
                        <p>No sensitive information will be shared</p>
                        <GoogleLogin
                            onSuccess={credentialResponse => {
                                responseGoogle(credentialResponse.credential);
                            }}
                            onError={() => {
                                handleLoginFailure();
                            }}
                            width={200}
                            shape='pill'
                        />
                    </>
                }
            </div>
        </div>
    )
}

export default Signin;