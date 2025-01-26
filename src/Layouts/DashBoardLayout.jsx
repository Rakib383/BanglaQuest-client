import { useContext } from "react"
import { CgProfile } from "react-icons/cg"
import { FaClipboardList, FaPen, FaPenNib, FaUserPlus, FaUserTie } from "react-icons/fa"
import { IoHomeOutline } from "react-icons/io5"
import { NavLink, Outlet } from "react-router-dom"
import { AuthContext } from "../provider/AuthProvider"
import { useQuery } from "@tanstack/react-query"
import { useAxiosSecure } from "../hooks/useAxiosSecure"
import { AiOutlinePlusSquare } from "react-icons/ai"
import { FiUsers } from "react-icons/fi"
import { HiOutlineMenu } from "react-icons/hi"

export const DashBoardLayout = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useContext(AuthContext);
    const { data: currentUser, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`)
            return res.data

        },
        enabled: !!user

    })

    if (isLoading || !user) {
        return <p>Loading...</p>;
    }

    const navOptions = <>
        <li className="lg:text-lg"><NavLink to="/"><IoHomeOutline size={20} className="text-SecondaryColor" /><span className="hover:text-PrimaryColor ">Home</span></NavLink></li>
        {
            currentUser.Role === "Tourist" && <>

                <li className="lg:text-lg"><NavLink to="/dashboard/profile"><CgProfile size={20} className="text-SecondaryColor" /><span className="hover:text-PrimaryColor ">Manage Profile</span></NavLink></li>

                <li className="lg:text-lg"><NavLink to="/dashboard/bookings"><FaClipboardList size={20} className="text-SecondaryColor" /><span className="hover:text-PrimaryColor ">My Bookings</span> </NavLink></li>

                <li className="lg:text-lg"><NavLink to="/dashboard/myStories"><FaPenNib size={20} className="text-SecondaryColor" /><span className="hover:text-PrimaryColor ">Manage Stories</span></NavLink></li>

                <li className="lg:text-lg"><NavLink to="/dashboard/addStories"><FaPen size={20} className="text-SecondaryColor" /><span className="hover:text-PrimaryColor ">Add Stories</span></NavLink></li>

                <li className="lg:text-lg"><NavLink to="/dashboard/apply"><FaUserPlus size={20} className="text-SecondaryColor" /><span className="hover:text-PrimaryColor ">Join as tour guide</span></NavLink></li>
            </>
        }
        {
            currentUser.Role === "Tour Guide" && <>

                <li className="lg:text-lg"><NavLink to="/dashboard/profile"><CgProfile size={20} className="text-SecondaryColor" /><span className="hover:text-PrimaryColor ">Manage Profile</span></NavLink></li>

                <li className="lg:text-lg"><NavLink to="/dashboard/assignedTours"><FaClipboardList size={20} className="text-SecondaryColor" /><span className="hover:text-PrimaryColor ">My Assigned Tours</span> </NavLink></li>

                <li className="lg:text-lg"><NavLink to="/dashboard/addStories"><FaPenNib size={20} className="text-SecondaryColor" /><span className="hover:text-PrimaryColor ">Add Stories</span></NavLink></li>

                <li className="lg:text-lg"><NavLink to="/dashboard/myStories"><FaPen size={20} className="text-SecondaryColor" /><span className="hover:text-PrimaryColor ">Manage Stories</span></NavLink></li>

            </>
        }
        {
            currentUser.Role === "Admin" && <>

                <li className="lg:text-lg"><NavLink to="/dashboard/adminProfile"><CgProfile size={20} className="text-SecondaryColor" /><span className="hover:text-PrimaryColor ">Manage Profile</span></NavLink></li>

                <li className="lg:text-lg"><NavLink to="/dashboard/addPackage"><AiOutlinePlusSquare size={20} className="text-SecondaryColor" /><span className="hover:text-PrimaryColor ">Add Package</span> </NavLink></li>

                <li className="lg:text-lg"><NavLink to="/dashboard/manageUsers"><FiUsers size={20} className="text-SecondaryColor" /><span className="hover:text-PrimaryColor ">Manage Users</span></NavLink></li>

                <li className="lg:text-lg"><NavLink to="/dashboard/candidates"><FaUserTie size={20} className="text-SecondaryColor" /><span className="hover:text-PrimaryColor ">Manage Candidates</span></NavLink></li>

            </>
        }

    </>

    return (
        <div className="flex flex-col md:flex-row  mb-10 ">
            {/* dashboard side bar */}
            
                <div className="w-64 min-h-screen
                 h-full bg-ThirdColor dashboard hidden md:block text-white">
                    <ul className="menu gap-2 pt-7">
                        {
                            navOptions
                        }
                    </ul>

                </div>
                <div className="dropdown  mt-4 ml-1">
                    <div tabIndex={0} role="button" className="btn btn-ghost md:hidden ">
                        <HiOutlineMenu className="text-2xl" />
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 gap-2 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {
                            navOptions
                        }


                    </ul>

                </div>
            
            {/* dashboard content */}
            <div className=" flex-1 p-2 md:p-8">
                <Outlet />
            </div>

        </div>
    )
}
