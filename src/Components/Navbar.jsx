import { Link, NavLink } from "react-router-dom"
import { HiOutlineMenu } from "react-icons/hi";
import logo from "../assets/Images/BanglaQuest.png"
export const Navbar = () => {
    const navOptions = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/trips">Trips</NavLink></li>
        <li><NavLink to="/community">Community</NavLink></li>
        <li><NavLink to="/about">About Us</NavLink></li>
    </>
    return (
        <div className=" fixed w-full z-50 ">
            <div className="navbar px-4 md:px-6  bg-gray-300/30 py-3  backdrop-blur-lg max-w-6xl mx-auto rounded-md">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost md:hidden ">
                            <HiOutlineMenu className="text-xl" />
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {
                                navOptions
                            }


                        </ul>

                    </div>
                    <Link className="hidden md:block" to="/" >
                        <div className="flex items-end">
                            <img src={logo} className="w-16" alt="" />
                            <p className=" text-3xl font-fresh text-[#FFB116] "><span className="text-[#0F1325] text-2xl">Bangla</span>Quest</p>
                        </div>
                    </Link>
                </div>

                <div className="navbar-center   md:hidden">
                    <Link to="/" >
                        <div className="flex items-end">
                            <img src={logo} className="w-12" alt="" />
                            <p className=" text-3xl font-fresh text-[#FFB116] "><span className="text-[#0F1325] text-2xl">Bangla</span>Quest</p>
                        </div>
                    </Link>
                </div>

                <div className="navbar-end   gap-16 lg:gap-32">
                    <ul className=" md:flex px-1 gap-5 hidden ">
                        {
                            navOptions
                        }
                    </ul>
                    <a className="btn h-10 font-normal  min-h-10 px-3 py-2 rounded-md  bg-[#59815B] hover:bg-[#466948] text-white w- h">Login</a>
                </div>
            </div>
        </div>
    )
}
