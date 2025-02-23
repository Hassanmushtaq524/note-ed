import React, { useState } from 'react';
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



function Navbar({ mobileView, ...rest }) { 
    const { user, handleLogout } = useAuth();
    const [ burgerOpen, setBurgerOpen ] = useState();
    const navigate = useNavigate();

    
    const logoutClick = async () => {
        await handleLogout();
        navigate("/signin")
    }


    return (
        <>
            <div id="navbar" className="z-50 w-full h-fit flex items-center justify-between border-[0.5px] border-light-gray bg-white">
                <div className="logo m-[24px] cursor-pointer" onClick={() => navigate("/")}>
                    <img src={Logo} alt="NOTE-ed" className='max-w-[15rem]' />
                </div>
                {
                    !mobileView ? 
                    // DESKTOP
                        <div className="right-container
                                        flex items-center justify-around"
                        >
                            {links.map((item, i) => {
                                return (
                                    <div key={i} className="item p-8 hover:bg-primary hover:text-white cursor-pointer font-black duration-700 border-[0.5px] border-light-gray"
                                         onClick={() => navigate(item.href)}
                                    >
                                        {item.name}
                                    </div>
                                )
                            })}
                            {
                                user ? 
                                <button className=" bg-primary text-white p-8 cursor-pointer hover:text-primary hover:bg-white border-[0.5px] border-primary duration-700 font-black" onClick = {logoutClick}>
                                    Logout
                                </button>
                                :
                                <button className=" bg-primary text-white p-8 cursor-pointer hover:text-primary hover:bg-white border-[0.5px] border-primary duration-700 font-black" onClick = {() => navigate("/signin")}>
                                    Sign In
                                </button>
                            }
                        </div>
                    :
                    // MOBILE
                    <>
                        <div className="relative z-[60] me-[24px] flex flex-col gap-2 w-8 h-fit" onClick={() => setBurgerOpen(!burgerOpen)}>
                            <div className='bg-primary w-full h-[0.2rem]'/>
                            <div className={`bg-primary w-full h-[0.2rem] ease-[cubic-bezier(0.65, 0, 0.35, 1)] transition-all duration-700 ${burgerOpen ? "-translate-y-[300%]" : ""}`}/>
                            <div className={`bg-primary w-full h-[0.2rem] ease-[cubic-bezier(0.65, 0, 0.35, 1)] transition-all duration-700 ${burgerOpen ? "-translate-y-[600%]" : ""}`}/>
                        </div>
                        {
                            burgerOpen &&
                            <div
                                onClick={() => setBurgerOpen(false)} 
                                className="fixed top-0 left-0 z-50 size-full bg-transparent backdrop-blur-lg flex items-center justify-center overscroll-none"
                            >
                                <div className="flex flex-col gap-12 items-center justify-around">
                                    {links.map((item, i) => {
                                        return (
                                            <Link key={i} className="text-primary text-5xl font-black" to={item.href}>{item.name}</Link>
                                        )
                                    })}
                                    {
                                        user ? 
                                        <button className="rounded-lg bg-primary text-white p-2 text-5xl font-black" onClick={logoutClick}>
                                            Logout
                                        </button>
                                        :
                                        <button className="rounded-lg bg-primary text-white p-2 text-5xl font-black" onClick={() => navigate("/signin")}>
                                            Sign In
                                        </button>
                                    }
                                </div>
                            </div>
                        }
                    </>
                }
            </div>
        </>
    )
}

export default Navbar