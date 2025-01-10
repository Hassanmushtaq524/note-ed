import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "../assets/images/Logo.svg";

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
  return (
    <div id="navbar" className="fixed w-full h-fit p-4 flex items-center justify-between font-regular">
        <div className="logo">
            <img src={Logo} alt="NotiNotes" />
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
            <btn className="rounded-xl bg-primary text-white p-2">
                <Link to={"/signin"}>Sign In</Link>
            </btn>
        </div>

    </div>
  )
}

export default Navbar