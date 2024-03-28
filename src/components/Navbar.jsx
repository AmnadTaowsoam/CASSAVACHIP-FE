import React from "react";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";
import btglogoA from "../assets/btglogoA.png";
import { FaRegUserCircle } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { IoDocumentsOutline } from "react-icons/io5";
import { MdOutlineContactSupport } from "react-icons/md";

const Navbar = () => {
    const [click, setClick] = React.useState(false);

    const handleClick = () => {
    setClick(!click);
    };

    return (
        <nav className="bg-teal-900">
            <div className="h-10vh flex justify-between z-50 text-white lg:py-5 px-20 py-4">
                <div className="flex items-center flex-1">
                    <img src={btglogoA} alt="Logo" className="w-30 h-10" />
                    </div>
                        <div className="lg:flex md:flex flex-1 items center justify-end font-normal hidden">
                            <div className="flex-10">
                                <ul className="flex gap-8 mr-16 text-[18px] font-custom">
                                    {/* ใช้ Link จาก react-router-dom เพื่อสร้างการเชื่อมโยงไปยังเส้นทางที่คุณต้องการ */}
                                    <Link to="/"><IoHomeOutline className="inline-block mr-1" />Home</Link>
                                    {/* <Link to="/docs"><IoDocumentsOutline className="inline-block mr-1" />Docs</Link>
                                    <Link to="/tutorial"><IoDocumentsOutline className="inline-block mr-1" />Tutorial</Link>
                                    <Link to="/faq"><MdOutlineContactSupport className="inline-block mr-1" />FAQ</Link> */}
                                    <Link to="/login"><FaRegUserCircle className="inline-block mr-1" />Sing in</Link>
                                </ul>
                            </div>
                        </div>
                <div>{click && content}</div>
                <button className="block sm:hidden transition" onClick={handleClick}>
                {click ? <FaTimes /> : <CiMenuFries />}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;










