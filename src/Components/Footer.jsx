import logo from "../assets/Images/BanglaQuest.png"
import { FaTwitterSquare } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
export const Footer = () => {
    const location = useLocation()
    return (
        <div className={`${location.pathname == "/about" ? "hidden" : "block"} pb-5 bg-gradient-to-t dark:to-black from-SecondaryColor to-white text-center `}>
            <footer className="gap-5 flex flex-col sm:flex-row  sm:justify-center sm:gap-12 footer-center 
              p-10 mt-20 max-w-7xl mx-auto dark:text-gray-300 ">
                <aside>
                    <img src={logo} className="w-12" alt="" />
                    <div>
                        <p className=" text-3xl font-fresh text-[#FFB116] "><span className="text-[#0F1325] dark:text-white text-2xl">Bangla</span>Quest</p>
                        <span className="font-oswald text-base"> Unveiling Bangladesh&apos;s Wonders</span>
                        <div className="flex gap-2 mt-1 items-center justify-center ">Follow Us On: <a href="https://www.facebook.com/rakibhossen.sarkar/"><FaFacebook className="hover:text-PrimaryColor cursor-pointer text-lg md:text-xl"  /></a> <a href="https://www.linkedin.com/in/md-rakib-hossen-sarkar-81b126201/">
                        <FaLinkedin  href="https://www.linkedin.com/in/md-rakib-hossen-sarkar-81b126201/" className="hover:text-PrimaryColor cursor-pointer text-lg md:text-xl" /></a> <a href="https://x.com/Rakibhossensar1"><FaTwitterSquare href="" className="hover:text-PrimaryColor cursor-pointer text-lg md:text-xl" /></a>  </div>
                    </div>

                </aside>
                <nav className="flex justify-around gap-8  sm:w-3/5">
                    <div className="flex flex-col ">
                        <h6 className="footer-title  dark:text-white  opacity-100">Quick Links</h6>
                        <Link to="/allTrips" className="link link-hover">All Packages</Link>
                        <Link to="/community" className="link link-hover">Community</Link>
                        <Link to="/hot-offers" className="link link-hover">Hot Offers</Link>
                        <Link to="/about" className="link link-hover">About Us</Link>
                    </div>
                    <div className="flex flex-col">
                        <h6 className="footer-title dark:text-white  opacity-100">Services</h6>
                        <Link to="/dashboard/bookings" className="link link-hover">My Bookings</Link>
                        <Link to="/dashboard/myStories" className="link link-hover">Manage Stories</Link>
                        <Link to="/dashboard/addStories" className="link link-hover">Add Stories</Link>
                        <Link to="/dashboard/apply" className="link link-hover">Join as Tour Guide</Link>
                    </div>
                </nav>

            </footer>
            <p className="text-white">Copyright © {new Date().getFullYear()} - All rights reserved</p>
        </div>
    )
}
