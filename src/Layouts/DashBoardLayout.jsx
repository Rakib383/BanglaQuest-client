import { useContext, useState } from "react"
import { CgProfile } from "react-icons/cg"
import { FaClipboardList, FaPen, FaPenNib, FaUserPlus, FaUserTie } from "react-icons/fa"
import { IoHomeOutline } from "react-icons/io5"
import { NavLink, Outlet, ScrollRestoration, useLocation } from "react-router-dom"
import { AuthContext } from "../provider/AuthProvider"
import { useQuery } from "@tanstack/react-query"
import { useAxiosSecure } from "../hooks/useAxiosSecure"
import { AiOutlinePlusSquare } from "react-icons/ai"
import { FiUsers } from "react-icons/fi"
import { HiOutlineMenu } from "react-icons/hi"
import { Loading } from "../Components/Loding"
import { FcStatistics } from "react-icons/fc";
import { Dropdown, Space } from "antd"
import { RxCross1 } from "react-icons/rx"

export const DashBoardLayout = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useContext(AuthContext);
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { data: currentUser, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`)
            return res.data

        },
        enabled: !!user

    })

    if (isLoading || !user) {
        return <Loading />
    }

    const dropdownItems = [
        {
            key: "home",
            label: (
                <NavLink
                    to="/"
                    className={`${location.pathname === "/" ? "active" : ""} flex items-start  space-x-1`}
                >
                    <IoHomeOutline size={18} className="text-SecondaryColor" />
                    <span className="hover:text-PrimaryColor">Home</span>
                </NavLink>
            ),
        },
        ...(currentUser.Role === "Tourist"
            ? [
                {
                    key: "profile",
                    label: (
                        <NavLink
                            to="/dashboard/profile"
                            className={`${location.pathname === "/dashboard/profile" ? "active" : ""} flex items-start  space-x-1 `}
                        >
                            <CgProfile size={18} className="text-SecondaryColor" />
                            <span className="hover:text-PrimaryColor">Manage Profile</span>
                        </NavLink>
                    ),
                },
                {
                    key: "bookings",
                    label: (
                        <NavLink
                            to="/dashboard/bookings"
                            className={`${location.pathname === "/dashboard/bookings" ? "active" : ""} flex items-start  space-x-1`}
                        >
                            <FaClipboardList size={18} className="text-SecondaryColor" />
                            <span className="hover:text-PrimaryColor">My Bookings</span>
                        </NavLink>
                    ),
                },
                {
                    key: "manageStories",
                    label: (
                        <NavLink
                            to="/dashboard/myStories"
                            className={`${location.pathname === "/dashboard/myStories" ? "active" : ""} flex items-start  space-x-1`}
                        >
                            <FaPenNib size={18} className="text-SecondaryColor" />
                            <span className="hover:text-PrimaryColor">Manage Stories</span>
                        </NavLink>
                    ),
                },
                {
                    key: "addStories",
                    label: (
                        <NavLink
                            to="/dashboard/addStories"
                            className={`${location.pathname === "/dashboard/addStories" ? "active" : ""} flex items-start  space-x-1`}
                        >
                            <FaPen size={18} className="text-SecondaryColor" />
                            <span className="hover:text-PrimaryColor">Add Stories</span>
                        </NavLink>
                    ),
                },
                {
                    key: "joinTourGuide",
                    label: (
                        <NavLink
                            to="/dashboard/apply"
                            className={`${location.pathname === "/dashboard/apply" ? "active" : ""} flex items-start  space-x-1`}
                        >
                            <FaUserPlus size={18} className="text-SecondaryColor" />
                            <span className="hover:text-PrimaryColor">Join as Tour Guide</span>
                        </NavLink>
                    ),
                },
            ]
            : []),
        ...(currentUser.Role === "Tour Guide"
            ? [
                {
                    key: "profile",
                    label: (
                        <NavLink
                            to="/dashboard/profile"
                            className={`${location.pathname === "/dashboard/profile" ? "active" : ""} flex items-start  space-x-1`}
                        >
                            <CgProfile size={18} className="text-SecondaryColor" />
                            <span className="hover:text-PrimaryColor">Manage Profile</span>
                        </NavLink>
                    ),
                },
                {
                    key: "assignedTours",
                    label: (
                        <NavLink
                            to="/dashboard/assignedTours"
                            className={`${location.pathname === "/dashboard/assignedTours" ? "active" : ""} flex items-start  space-x-1`}
                        >
                            <FaClipboardList size={18} className="text-SecondaryColor" />
                            <span className="hover:text-PrimaryColor">My Assigned Tours</span>
                        </NavLink>
                    ),
                },
                {
                    key: "addStories",
                    label: (
                        <NavLink
                            to="/dashboard/addStories"
                            className={`${location.pathname === "/dashboard/addStories" ? "active" : ""} flex items-start  space-x-1`}
                        >
                            <FaPenNib size={18} className="text-SecondaryColor" />
                            <span className="hover:text-PrimaryColor">Add Stories</span>
                        </NavLink>
                    ),
                },
                {
                    key: "manageStories",
                    label: (
                        <NavLink
                            to="/dashboard/myStories"
                            className={`${location.pathname === "/dashboard/myStories" ? "active" : ""} flex items-start  space-x-1`}
                        >
                            <FaPen size={18} className="text-SecondaryColor" />
                            <span className="hover:text-PrimaryColor">Manage Stories</span>
                        </NavLink>
                    ),
                },
            ]
            : []),
        ...(currentUser.Role === "Admin"
            ? [
                {
                    key: "adminProfile",
                    label: (
                        <NavLink
                            to="/dashboard/adminProfile"
                            className={`${location.pathname === "/dashboard/adminProfile" ? "active" : ""} flex items-start  space-x-1`}
                        >
                            <CgProfile size={18} className="text-SecondaryColor" />
                            <span className="hover:text-PrimaryColor">Manage Profile</span>
                        </NavLink>
                    ),
                },
                {
                    key: "statistics",
                    label: (
                        <NavLink
                            to="/dashboard/statistics"
                            className={`${location.pathname === "/dashboard/statistics" ? "active" : ""} flex items-start  space-x-1`}
                        >
                            <FcStatistics size={18} className="text-SecondaryColor" />
                            <span className="hover:text-PrimaryColor">Statistics</span>
                        </NavLink>
                    ),
                },
                {
                    key: "addPackage",
                    label: (
                        <NavLink
                            to="/dashboard/addPackage"
                            className={`${location.pathname === "/dashboard/addPackage" ? "active" : ""} flex items-start  space-x-1`}
                        >
                            <AiOutlinePlusSquare size={18} className="text-SecondaryColor" />
                            <span className="hover:text-PrimaryColor">Add Package</span>
                        </NavLink>
                    ),
                },
                {
                    key: "addStories",
                    label: (
                        <NavLink
                            to="/dashboard/addStories"
                            className={`${location.pathname === "/dashboard/addStories" ? "active" : ""} flex items-start  space-x-1`}
                        >
                            <FaPen size={18} className="text-SecondaryColor" />
                            <span className="hover:text-PrimaryColor">Add Stories</span>
                        </NavLink>
                    ),
                },
                {
                    key: "manageUsers",
                    label: (
                        <NavLink
                            to="/dashboard/manageUsers"
                            className={`${location.pathname === "/dashboard/manageUsers" ? "active" : ""} flex items-start  space-x-1`}
                        >
                            <FiUsers size={18} className="text-SecondaryColor" />
                            <span className="hover:text-PrimaryColor">Manage Users</span>
                        </NavLink>
                    ),
                },
                {
                    key: "manageCandidates",
                    label: (
                        <NavLink
                            to="/dashboard/candidates"
                            className={`${location.pathname === "/dashboard/candidates" ? "active" : ""} flex items-start  space-x-1`}
                        >
                            <FaUserTie size={18} className="text-SecondaryColor" />
                            <span className="hover:text-PrimaryColor">Manage Candidates</span>
                        </NavLink>
                    ),
                },
            ]
            : []),
    ];

    const navOptions = <>
        <li className="lg:text-base"><NavLink to="/"><IoHomeOutline size={20} className="text-SecondaryColor" /><span className="hover:text-PrimaryColor ">Home</span></NavLink></li>
        {
            currentUser.Role === "Tourist" && <>

                <li className="lg:text-base"><NavLink to="/dashboard/profile"><CgProfile size={20} className="text-SecondaryColor" /><span className="hover:text-PrimaryColor ">Manage Profile</span></NavLink></li>

                <li className="lg:text-base"><NavLink to="/dashboard/bookings"><FaClipboardList size={20} className="text-SecondaryColor" /><span className="hover:text-PrimaryColor ">My Bookings</span> </NavLink></li>

                <li className="lg:text-base"><NavLink to="/dashboard/myStories"><FaPenNib size={20} className="text-SecondaryColor" /><span className="hover:text-PrimaryColor ">Manage Stories</span></NavLink></li>

                <li className="lg:text-base"><NavLink to="/dashboard/addStories"><FaPen size={20} className="text-SecondaryColor" /><span className="hover:text-PrimaryColor ">Add Stories</span></NavLink></li>

                <li className="lg:text-base"><NavLink to="/dashboard/apply"><FaUserPlus size={20} className="text-SecondaryColor" /><span className="hover:text-PrimaryColor ">Join as tour guide</span></NavLink></li>
            </>
        }
        {
            currentUser.Role === "Tour Guide" && <>

                <li className="lg:text-base"><NavLink to="/dashboard/profile"><CgProfile size={20} className="text-SecondaryColor" /><span className="hover:text-PrimaryColor ">Manage Profile</span></NavLink></li>

                <li className="lg:text-base"><NavLink to="/dashboard/assignedTours"><FaClipboardList size={20} className="text-SecondaryColor" /><span className="hover:text-PrimaryColor ">My Assigned Tours</span> </NavLink></li>

                <li className="lg:text-base"><NavLink to="/dashboard/addStories"><FaPenNib size={20} className="text-SecondaryColor" /><span className="hover:text-PrimaryColor ">Add Stories</span></NavLink></li>

                <li className="lg:text-base"><NavLink to="/dashboard/myStories"><FaPen size={20} className="text-SecondaryColor" /><span className="hover:text-PrimaryColor ">Manage Stories</span></NavLink></li>

            </>
        }
        {
            currentUser.Role === "Admin" && <>

                <li className="lg:text-base"><NavLink to="/dashboard/adminProfile"><CgProfile size={20} className="text-SecondaryColor" /><span className="hover:text-PrimaryColor ">Manage Profile</span></NavLink></li>

                <li className="lg:text-base"><NavLink to="/dashboard/statistics"><FcStatistics size={20} className="text-SecondaryColor" /><span className="hover:text-PrimaryColor ">Statistics</span></NavLink></li>

                <li className="lg:text-base"><NavLink to="/dashboard/addPackage"><AiOutlinePlusSquare size={20} className="text-SecondaryColor" /><span className="hover:text-PrimaryColor ">Add Package</span> </NavLink></li>

                <li className="lg:text-base"><NavLink to="/dashboard/addStories"><FaPen size={18} className="text-SecondaryColor" /><span className="hover:text-PrimaryColor ">Add Stories</span></NavLink></li>

                <li className="lg:text-base"><NavLink to="/dashboard/manageUsers"><FiUsers size={20} className="text-SecondaryColor" /><span className="hover:text-PrimaryColor ">Manage Users</span></NavLink></li>

                <li className="lg:text-base"><NavLink to="/dashboard/candidates"><FaUserTie size={20} className="text-SecondaryColor" /><span className="hover:text-PrimaryColor ">Manage Candidates</span></NavLink></li>

            </>
        }

    </>

    return (
        <div className="flex flex-col md:flex-row bg-white dark:bg-gray-800 ">
            <ScrollRestoration/>
            {/* dashboard side bar */}

            <div className="w-64 min-h-screen 
                 h-full bg-ThirdColor dashboard hidden md:block text-white fixed left-0 top-0 ">
                <ul className="menu gap-2 pt-7">
                    {
                        navOptions
                    }
                </ul>


            </div>
            {/* dropdown */}
           
            <div className="w-fit mt-2 ml-2 ">
                <Dropdown
                    menu={{
                        items: dropdownItems,
                    }}
                    trigger={['click']}
                    getPopupContainer={(triggerNode) => triggerNode.parentNode}
                    onOpenChange={(value) => setIsMenuOpen(value)}
                    overlayClassName="dashboardDropdown"
                   

                >
                    <a className="cursor-pointer" onClick={(e) => {
                        e.preventDefault()
                    }}>
                        <Space>
                            {
                                isMenuOpen ? <RxCross1 className="text-xl " /> : <HiOutlineMenu className="text-2xl " />
                            }
                        </Space>
                    </a>
                </Dropdown>
            </div>

            {/* dashboard content */}
            <div className=" flex-1 bg-white dark:bg-gray-800  p-2 md:p-8 md:ml-60 min-h-screen overflow-x-hidden ">
                <Outlet />
            </div>

        </div>
    )
}
