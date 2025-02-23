import React, { useEffect, useState } from 'react'
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import DefaultDisplay from '../components/DefaultDisplay';


function Signin() {
    const { user, handleLoginSuccess, handleLoginFailure } = useAuth(); 
    const [ loading, setLoading ] = useState(false);
    const [ termsAccepted, setTermsAccepted ] = useState(false);
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
        <DefaultDisplay>
            <div className="size-fit max-w-[60dvw] flex flex-col gap-4 p-8 border-[0.5px] rounded-xl border-primary justify-center items-center text-center">
                {
                    loading ?
                    <>
                        <Spinner />
                    </>
                    :
                    <>  
                        <h1 className='text-primary'>SIGN IN</h1>
                        <p>Sign in and contribute towards note sharing & learning</p>
                        <label className='flex gap-2'>
                            <input 
                                type="checkbox"
                                checked={termsAccepted} 
                                onChange={() => setTermsAccepted(!termsAccepted)}
                            />
                            I accept the terms & conditions
                        </label>
                        {
                            !termsAccepted ?
                            <div className='font-thin text-xs p-4 flex justify-center items-center border-[0.5px] border-light-gray'>
                                YOU MUST ACCEPT <br/> TERMS & CONDITIONS
                            </div>
                            :
                            <GoogleLogin
                                onSuccess={credentialResponse => {
                                    responseGoogle(credentialResponse.credential);
                                }}
                                onError={() => {
                                    handleLoginFailure();
                                }}
                                size={200}
                            />
                        }
                        <p className='text-light-gray text-xs'>No sensitive information will be shared</p>
                    </>
                }
            </div>
        </DefaultDisplay>
    )
}

export default Signin;