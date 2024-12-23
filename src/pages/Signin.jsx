import React from 'react'
import { GoogleLogin } from '@react-oauth/google';


function Signin() {
    const responseGoogle = async (credential) => { 
        if (credential){ 
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, { 
                credentials: 'include', 
                headers: {
                    "content-type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({ token: credential })
            });
            
            const data = await response.json();
            // TODO: remove
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