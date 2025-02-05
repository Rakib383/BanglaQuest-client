import { Link, NavLink } from "react-router-dom"
import { HiOutlineMenu } from "react-icons/hi";
import logo from "../assets/Images/BanglaQuest.png"
import { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { useAxiosPublic } from "../hooks/useAxiosPublic";
export const Navbar = () => {
  const { user, logOut } = useContext(AuthContext)

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const axiosPublic = useAxiosPublic()
  const { data: currentUser } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/role/${user.email}`)
      return res.data
    },
    enabled: !!user,
  })

  
  const navOptions = <>
    <li><NavLink to="/">Home</NavLink></li>
    <li><NavLink to="/allTrips">Trips</NavLink></li>
    <li><NavLink to="/community">Community</NavLink></li>
    <li className="text-nowrap"><NavLink to="/about">About Us</NavLink></li>
  </>

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
   
  };
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
          {
            user ?
              <div className="relative" >
                <button
                  id="dropdownAvatarNameButton"
                  onClick={() =>toggleDropdown()}
                  className="flex items-center text-sm pe-1 font-medium text-gray-900 rounded-full   md:me-0   dark:text-white"
                  type="button"
                >

                  <img
                    className="w-10 h-10  text-ThirdColor rounded-full   "
                    src={user.photoURL}
                    alt="user photo"
                  />

                </button>

                {/* Dropdown menu */}
                <div
                  id="dropdownAvatarName"
                  className={`z-10 absolute ${isDropdownOpen ? "block" : "hidden"} bg-ThirdColor divide-y divide-gray-100 rounded-lg shadow w-36 md:w-48  dark:divide-gray-600 right-2 `}
                >
                  <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                    <div className="font-medium truncate">{user.displayName}</div>
                    <div className="truncate">{user.email}</div>
                  </div>
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownAvatarNameButton"
                  >
                    <li>
                      <Link to={`/dashboard/${currentUser?.Role == "Admin" ? "adminProfile" : "profile"}`}
                        href="#"

                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/offerAnnouncements"

                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Offer Announcements
                      </Link>
                    </li>

                  </ul>
                  <div className="py-2">
                    <button

                      onClick={() => {
                        logOut()

                      }}
                      className="block w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
              : <Link to="/login" className="btn bg-SecondaryColor px-3 h-10 min-h-10 text-white hover:bg-green-900">LogIn</Link>}

        </div>
      </div>
    </div>
  )
}
