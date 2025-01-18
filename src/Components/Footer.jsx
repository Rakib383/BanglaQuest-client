import logo from "../assets/Images/BanglaQuest.png"
import { FaTwitterSquare } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
export const Footer = () => {
    return (
        <div className="pb-5 bg-gradient-to-t from-SecondaryColor to-white text-center ">
            <footer className="gap-5 flex flex-col sm:flex-row  sm:justify-center sm:gap-12 footer-center 
              p-10 mt-20 max-w-7xl mx-auto  ">
                <aside>
                    <img src={logo} className="w-12" alt="" />
                    <div>
                        <p className=" text-3xl font-fresh text-[#FFB116] "><span className="text-[#0F1325] text-2xl">Bangla</span>Quest</p>
                        <span className="font-oswald text-base"> Unveiling Bangladesh&apos;s Wonders</span>
                        <div className="flex gap-2 items-center justify-center ">Follow Us On: <a href="https://www.facebook.com/rakibhossen.sarkar/"><FaFacebook className="hover:text-PrimaryColor cursor-pointer text-lg md:text-xl"  /></a> <a href="https://www.linkedin.com/in/md-rakib-hossen-sarkar-81b126201/">
                        <FaLinkedin  href="https://www.linkedin.com/in/md-rakib-hossen-sarkar-81b126201/" className="hover:text-PrimaryColor cursor-pointer text-lg md:text-xl" /></a> <a href="https://x.com/Rakibhossensar1"><FaTwitterSquare href="" className="hover:text-PrimaryColor cursor-pointer text-lg md:text-xl" /></a>  </div>
                    </div>

                </aside>
                <nav className="flex justify-around gap-8  sm:w-3/5">
                    <div className="flex flex-col">
                        <h6 className="footer-title">Services</h6>
                        <a className="link link-hover">Tour Packages</a>
                        <a className="link link-hover">Tour Guide</a>
                        <a className="link link-hover">Travel Planning</a>
                        <a className="link link-hover">Customer Support</a>
                    </div>
                    <div className="flex flex-col">
                        <h6 className="footer-title">Company</h6>
                        <a className="link link-hover">About us</a>
                        <a className="link link-hover">Contact</a>
                        <a className="link link-hover">Our Team</a>
                        <a className="link link-hover">FAQs</a>
                    </div>
                </nav>

            </footer>
            <p className="text-white">Copyright © {new Date().getFullYear()} - All rights reserved</p>
        </div>
    )
}
