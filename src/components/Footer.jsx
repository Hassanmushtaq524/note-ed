import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
function Footer() {
  return (
    <div id="footer" className="w-full h-fit bg-primary p-[24px]">
        {/* Container */}
        <div className="flex flex-col md:flex-row gap-6 justify-between">
          {/* Legal */}
          <div className="size-fit flex flex-col gap-2">
            <h6 className="font-black text-white">LEGAL</h6>
            <Link className="font-regular text-white" to={"/privacy"}>Privacy Policy</Link>
            <Link className="font-regular text-white" to={"/privacy#terms"}>Terms and Conditions</Link>
          </div>
          {/* Info */}
          <div className="size-fit flex flex-col gap-2">
            <h6 className="font-black text-white">CONTACT</h6>
            <p className="font-regular text-white">hhmushtaq@owu.edu</p>
            <a className="font-regular text-white" target="__blank" href="https://www.instagram.com/hassanmushtaq_">Instagram</a>
            <a className="font-regular text-white" target="__blank" href="https://hassanmushtaq.netlify.app/">Website</a>
          </div>
          <p className='font-regular text-white self-end'>© 2025 NOTE-ed. All Rights Reserved.</p>
        </div>
    </div>
  )
}

export default Footer