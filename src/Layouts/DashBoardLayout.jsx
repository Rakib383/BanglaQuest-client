import { useContext } from "react"
import { CgProfile } from "react-icons/cg"
import { FaClipboardList, FaPen, FaPenNib, FaUserPlus } from "react-icons/fa"
import { IoHomeOutline } from "react-icons/io5"
import { NavLink, Outlet } from "react-router-dom"
import { AuthContext } from "../provider/AuthProvider"
import { useQuery } from "@tanstack/react-query"
import { useAxiosSecure } from "../hooks/useAxiosSecure"

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

    return (
        <div className="flex h-screen">
            {/* dashboard side bar */}
            <div className="w-64 h-full bg-ThirdColor dashboard text-white">
                <ul className="menu gap-2 mt-5">
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
                </ul>

            </div>
            {/* dashboard content */}
            <div className="flex-1 p-8">
                <Outlet />
            </div>

        </div>
    )
}
