import React from 'react'
import { FaRegCopyright } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";


const Footer = () => {
    return (
        <div className='w-[100%] py-4'>
            <div className='w-[80%] max-w-[1400px] mx-auto flex justify-between items-center '>
                <div className='font-[Preahvihear] text-sm flex items-center gap-2'>
                    <FaRegCopyright />
                    <p>2024 miniURL . Checkout on <span> <a className='hover:text-lg duration-700 transition-all underline' href='https://github.com/adeeb-123/miniURL' target='_blank'>GitHub</a> </span></p>
                </div>
                <div className='flex gap-2 text-2xl cursor-pointer'>
                    <a href='https://github.com/adeeb-123'><FaGithub className='' /></a>
                    <a href='https://www.linkedin.com/in/adeeb-ahmad-b148951b9/'><FaLinkedin className='' /></a>
                    <a href='https://twitter.com/adeebsid12345'><FaSquareXTwitter className='' /></a>
                </div>
            </div>
        </div>
    )
}

export default Footer
