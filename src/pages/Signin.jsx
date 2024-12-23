import React from 'react'
import { GoogleLogin } from '@react-oauth/google';


function Signin() {
    const responseGoogle = async (credential) => { 
        if (credential){ 
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/callback?token=${credential}`, { 
                credentials: 'include', 
                // To cause browsers to send a request with credentials included on both same-origin and cross-origin calls,  
                // add credentials: 'include' to the init object you pass to the fetch() method. 
            });
            
            const data = await response.json();
            console.log(data)
        } 
    } 

    

    const temp = () =>{ 
        fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/checksession`,{ 
            credentials: 'include' 
        }) 
        .then((response) => { 
            return response.json(); 
        }) 
        .then((myJson) => { 
            alert(myJson) 
        }); 
    } 



    return (
        <div>
            <GoogleLogin
                onSuccess={credentialResponse => {
                    responseGoogle(credentialResponse.credential);
                }}
                onError={() => {
                    responseGoogle(null);
                }}
                width={200}
                shape='pill'
            />
            <br/> 
            <button onClick={temp}> Check session </button> 
        </div>
    )
}

export default Signin;