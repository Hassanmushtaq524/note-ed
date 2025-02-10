import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "../assets/images/Logo.svg";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const links = [
    {
        name: "Home",
        href: "/"
    },
    {
        name: "About",
        href: "/about"
    }
]



function Navbar() { 
    const { user, handleLogout } = useAuth();
    const navigate = useNavigate();

    
    const logoutClick = async () => {
        await handleLogout();
        navigate("/signin")
    }


    return (
        <div id="navbar" className="fixed w-full h-fit p-4 flex items-center justify-between font-regular">
            <div className="logo cursor-pointer" onClick={() => navigate("/")}>
                <img src={Logo} alt="NotiNotes"  />
            </div>
            <div className="right-container
                            flex gap-12 items-center justify-around">
                {links.map((item) => {
                    return (
                        <div className="item">
                            <Link className="" to={item.href}>{item.name}</Link>
                        </div>
                    )
                })}
                {
                    user ? 
                    <btn className="rounded-xl bg-primary text-white p-2 cursor-pointer" onClick = {logoutClick}>
                        Logout
                    </btn>
                    :
                    <btn className="rounded-xl bg-primary text-white p-2 cursor-pointer" onClick = {() => navigate("/signin")}>
                        Sign In
                    </btn>
                }
            </div>

        </div>
    )
}

export default Navbar