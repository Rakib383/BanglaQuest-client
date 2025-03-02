import { Link, NavLink, useLocation } from "react-router-dom"
import { HiOutlineMenu } from "react-icons/hi";
import logo from "../assets/Images/BanglaQuest.png"
import { useContext, useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { useAxiosPublic } from "../hooks/useAxiosPublic";
import { RxCross1 } from "react-icons/rx";
import { Tooltip } from 'react-tooltip'
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { Dropdown, Space } from 'antd';
export const Navbar = () => {
  const { user, logOut } = useContext(AuthContext)
  const [isLight, setIsLight] = useState(true)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const axiosPublic = useAxiosPublic()
  const location = useLocation();
  const { data: currentUser } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/role/${user.email}`)
      return res.data
    },
    enabled: !!user,
  })

  const navOptions = <>
    <li ><NavLink to="/">Home</NavLink></li>
    <li ><NavLink to="/allTrips">Trips</NavLink></li>
    <li ><NavLink to="/community">Community</NavLink></li>
    <li className="text-nowrap "><NavLink to="/hot-offers">Hot Offers</NavLink></li>
    <li className="text-nowrap"><NavLink to="/about">About Us</NavLink></li>
  </>

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);

  };

  const htmlTag = document.documentElement

  useEffect(() => {
    let getIsLight = sessionStorage.getItem("isLight")
    // console.log(isLight);
    if (getIsLight) {
      getIsLight = JSON.parse(getIsLight)
      setIsLight(getIsLight)
      if (!getIsLight) {
        sessionStorage.setItem("isLight", "false")
        return htmlTag.classList.add('dark')

      }

      sessionStorage.setItem("isLight", "true")
      return htmlTag.classList.remove('dark')

    }

  }, [])


  const handleDarkMode = () => {
    setIsLight(!isLight)

    if (!isLight) {
      sessionStorage.setItem("isLight", "true")
      return htmlTag.classList.remove('dark')
    }
    htmlTag.classList.add('dark')
    sessionStorage.setItem("isLight", "false")
  }

  const items = [
    {
      label: <NavLink className={location.pathname === "/" ? "active" : ""} to="/">Home</NavLink>
    },
    {
      label: <NavLink className={location.pathname === "/allTrips" ? "active" : ""} to="/allTrips">Trips</NavLink>
    },
    {
      label: <NavLink className={location.pathname === "/community" ? "active" : ""} to="/community">Community</NavLink>
    },
    {
      label: <NavLink className={location.pathname === "/hot-offers" ? "active" : ""} to="/hot-offers">Hot Offers</NavLink>
    },
    {
      label: <NavLink className={location.pathname === "/about" ? "active" : ""} to="/about">About Us</NavLink>
    },

  ];

  return (
    <div className=" fixed top-0  left-0 w-screen z-30  bg-gray-300/50 dark:bg-black/60 dark:border-b  border-b-slate-700  backdrop-blur-xl ">
        <div className="navbar w-full  px-4 md:px-6 py-2 md:max-w-7xl md:mx-auto rounded-md">
          <div className="navbar-start">
            <div className="md:hidden">
              <Dropdown
                menu={{
                  items,
                }}
                trigger={['click']}
                getPopupContainer={(triggerNode) => triggerNode.parentNode}
                onOpenChange={(value) => setIsMenuOpen(value)}
                overlayClassName="custom-dropdown"

              >
                <a className="cursor-pointer" onClick={(e) => {
                  e.preventDefault()
                }}>
                  <Space>
                    {
                      isMenuOpen ? <RxCross1 className="text-lg " /> : <HiOutlineMenu className="text-xl " />
                    }
                  </Space>
                </a>
              </Dropdown>
            </div>

            <Link className="hidden md:block" to="/" >
              <div className="flex items-end">
                <img src={logo} className="w-16" alt="" />
                <p className=" text-3xl font-fresh text-[#FFB116] "><span className="text-[#0F1325] dark:text-white text-2xl">Bangla</span>Quest</p>
              </div>
            </Link>
          </div>

          <div className="navbar-center   md:hidden">
            <Link to="/" >
              <div className="flex items-end">
                <img src={logo} className="w-10" alt="" />
                <p className=" text-3xl font-fresh text-[#FFB116] "><span className="text-[#0F1325] dark:text-white text-2xl">Bangla</span>Quest</p>
              </div>
            </Link>
          </div>

          <div className="navbar-end   md:gap-16 lg:gap-32">
            <ul className=" md:flex lg:text-lg md:text-[17px] px-1 md:gap-5 hidden">
              {
                navOptions
              }
            </ul>


            <div className="flex  items-center shrink-0">
              {
                isLight ? <div className="pl-3 pr-1"><a className="tooltip"><CiLight onClick={handleDarkMode} className="text-xl  sm:text-2xl shrink-0 mx-1 mr-2 sm:mr-6 hover:cursor-pointer" /></a>
                  <Tooltip globalCloseEvents={{ clickOutsideAnchor: true }}  className="z-50" anchorSelect=".tooltip" place="bottom" offset={20}>
                    Light
                  </Tooltip>
                </div> : <div className="pl-3 pr-1">
                  <a className="tooltip2">
                    <MdDarkMode onClick={handleDarkMode} className="text-xl hover:cursor-pointer sm:text-2xl shrink-0 mx-1 mr-2 sm:mr-6 " />
                  </a>
                  <Tooltip  globalCloseEvents={{ clickOutsideAnchor: true }}  className="z-50" anchorSelect=".tooltip2" place="bottom" offset={20}>
                    Dark
                  </Tooltip>
                </div>


              }

              {
                user ?
                  <div className="relative shrink-0 " >

                    <button

                      onClick={() => toggleDropdown()}
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

                      className={`z-40 mt-2 absolute ${isDropdownOpen ? "block" : "hidden"} bg-white dark:bg-ThirdColor divide-y divide-gray-100 rounded-lg shadow w-36 md:w-48  dark:divide-gray-600 right-2 `}
                    >
                      <div className="px-4 py-3 text-sm text-gray-900 dark:text-white relative">
                        <div className="font-medium truncate">{user.displayName}</div>
                        <div className="truncate mt-1">{user.email}</div>
                        <div onClick={toggleDropdown} className="absolute top-2 right-2 hover:cursor-pointer">
                          <RxCross1 className="text-lg" />
                        </div>
                      </div>
                      <ul
                        className="py-2 text-sm text-gray-700 dark:text-gray-200"

                      >
                        <li>
                          <Link to={`/dashboard/${currentUser?.Role == "Admin" ? "statistics" : "profile"}`}
                            href="#"

                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Dashboard
                          </Link>
                        </li>

                      </ul>
                      <div className="py-2">
                        <button

                          onClick={() => {
                            logOut()
                            setIsDropdownOpen(false)

                          }}
                          className="block w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          Sign out
                        </button>
                      </div>
                    </div>
                  </div>
                  : <Link to="/login" className="btn bg-SecondaryColor px-3 h-10 mr-1  min-h-10 text-white hover:bg-SecondaryColor/90 ">LogIn</Link>
              }
            </div>

          </div>
        </div>
      </div>
  )
}
