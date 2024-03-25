import React, { useState } from 'react'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import { GiHamburgerMenu } from "react-icons/gi";
import { GiCancel } from "react-icons/gi";
import { FaB, FaBarsStaggered } from "react-icons/fa6";


const Navbar = () => {
    // hadnling the mobile navbar state
    const [mobileNavbarView, setMobileNavbarView] = useState("hidden");

    return (
        <div className='bg-[#e1d2f4] w-[100%] font-[Preahvihear] font-semibold py-3'>
            <div className='w-[80%] max-w-[1400px] mx-auto flex flex-row items-center justify-between gap-16'>
                <Link to={'/'}>
                    <div className='max-w-[100px] min-w-[50px] w-[20%] lg:min-w-[100px] cursor-pointer'>
                        <img src={logo} className='' />
                    </div>
                </Link>
                <div className='gap-12 cursor-pointer w-full justify-end md:flex hidden'>
                    <Link to={'/'}>
                        <p className='transition-all duration-200 hover:bg-[#ebe2f8] py-4 px-2 rounded-2xl min-w-fit'>Home</p>
                    </Link>
                    <Link to={'/analytics'}>
                        <p className='transition-all duration-200 hover:bg-[#ebe2f8] py-4 px-2 rounded-2xl min-w-fit'>View Analytics</p>
                    </Link>
                </div>
                <div className="max-md:block hidden text-white bg-[#4f228d] p-2 rounded-full">
                    {mobileNavbarView === "block" ? (
                        <GiCancel
                            className=" text-lg"
                            onClick={() => setMobileNavbarView("hidden")}
                        />
                    ) : (
                        <FaBarsStaggered
                            className=" text-lg"
                            onClick={() => setMobileNavbarView("block")}
                        />
                    )}
                </div>
            </div>

            {/* Mobile View Navbar */}
        </div>
    )
}

export default Navbar
