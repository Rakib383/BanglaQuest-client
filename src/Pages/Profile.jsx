
import { useQuery } from "@tanstack/react-query"
import { useContext, } from "react"
import { AuthContext } from "../provider/AuthProvider"
import { useAxiosSecure } from "../hooks/useAxiosSecure"
import { useForm } from "react-hook-form"
import Swal from "sweetalert2"
import { Link } from "react-router-dom"
import moment from "moment"
import { FaLocationDot } from "react-icons/fa6"
import { SlCalender } from "react-icons/sl"
import emptyIcon from "../assets/Images/emptyContent.png"


export const Profile = () => {

    const { user,updateUserProfile } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const { data: currentUser, isLoading,refetch } = useQuery({
        queryKey: ["userProfile", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            return res.data;
        },
        enabled: !!user,
    });
    const { data: stories } = useQuery({
        queryKey: ['myStories'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allStories/${user.email}`)
            return res.data
        },
        enabled: !!user

    })


    if (isLoading || !currentUser || !stories) {
        return <p>Loading...</p>;
    }

    const onSubmit = (data) => {

        document.getElementById('my_modal_1').close()
        updateUserProfile(data.name,data.photoURL)
        axiosSecure.patch(`/users/${currentUser._id}`, data)
            .then(() => {
                Swal.fire({
                    title: "Update successful!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1000
                })
                refetch()
            })



    }


    return (
        <div>
            <h2 className="text-xl text-center">
                <span>Hi,welcome </span>
                {
                    currentUser.name
                }
            </h2>
            <div className="pt-10 place-items-center">

                <div className="bg-ThirdColor rounded-lg shadow-lg  p-6 w-80 max-w-full text-gray-400 text-center relative">

                    <img
                        className="w-24 h-24 mx-auto border-2 border-PrimaryColor   object-cover rounded-full p-1"
                        src={currentUser.photoURL}
                        alt="currentUser"
                    />
                    <h3 className="text-lg text-white font-medium mt-4">{currentUser.name}</h3>
                    <h6 className="text-sm text-gray-400 capitalize">Email: {currentUser.email}</h6>
                    <p className="text-sm mt-2 leading-2">
                        Role:{currentUser.Role}
                    </p>

                    <div className="flex justify-center gap-4 mt-4">
                        <button onClick={() => document.getElementById('my_modal_1').showModal()} className="bg-PrimaryColor text-ThirdColor rounded-md font-medium px-4 py-2">
                            Edit
                        </button>
                        {
                            currentUser.Role === "Tourist" && <Link to="/dashboard/apply" className="bg-PrimaryColor text-ThirdColor rounded-md font-medium px-4 py-2">
                                Apply For Tour Guide
                            </Link>
                        }

                    </div>
                </div>


            </div>

            {/* modal box */}
            <dialog id="my_modal_1" className="modal ">
                <div className="modal-box w-10/12 pb-9 ">
                    <div>
                        <h2 className="font-black font-charm text-xl md:text-2xl text-primaryColor underline mb-3 sm:mb-4 text-center">Update Profile</h2>

                        <form onSubmit={handleSubmit(onSubmit)} className=" mx-auto pt-6 shadow-lg  px-6 py-8 rounded-xl bg-gradient-to-tl from-white to-SecondaryColor">

                            <div className="grid gap-6 mb-6 sm:grid-cols-2">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Name*
                                    </label>
                                    <input

                                        type="text"
                                        name="name"
                                        defaultValue={currentUser.name}
                                        {...register("name", { required: true })}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="name"
                                        required
                                    />

                                </div>

                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Email
                                    </label>
                                    <input
                                        {...register("email", { required: true })}
                                        type="email"
                                        value={currentUser.email}
                                        name="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="email"
                                        required
                                    />

                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Image*
                                    </label>
                                    <input
                                        {...register("photoURL", { required: true })}
                                        type="url"
                                        name="photoURL"
                                        defaultValue={currentUser.photoURL}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="ImageURL"
                                        required
                                    />


                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Role
                                    </label>
                                    <input
                                        {...register("Role", { required: true })}
                                        type="text"
                                        value={currentUser.Role}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Role"
                                        required
                                    />
                                </div>

                            </div>
                            <p className="text-blue-600 text-sm"><span className="text-2xl">*</span>Only these can be change.</p>

                            <div className="sm:flex">
                                <button
                                    type="submit"
                                    className="btn  bg-primaryColor   hover:text-white hover:bg-SecondaryColor sm:w-28 mx-auto w-full  mt-7 px-5 py-2.5 text-center"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>

            {/* stories  */}
            <div>
                <h2 className="text-center font-bold text-2xl mt-16 text-PrimaryColor underline">My  Stories</h2>

                {/* container */}
                <div className="mt-8 flex gap-6 flex-col  flex-wrap justify-center items-center ">

                    {
                        stories.length === 0 && <div className="flex flex-col items-center justify-center" >
                            <img className="w-28 md:w-36" src={emptyIcon} alt="" />
                            <h4 className="mt-4">You haven't  added any stories yet.</h4>
                             </div>
                    }

                    {
                        stories.map((story, idx) => <div className={`flex flex-col  my-4 gap-4 items-center justify-center ${idx % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"} `} key={idx}>
                            <div className="sm:flex-1 h-52 w-9/12 sm:w-auto  sm:h-auto md:h-64">
                                <img src={story.images[0]} className="h-full w-full" alt="" />
                            </div>
                            <div className="flex-1 flex flex-col items-center justify-center">
                                <p className="font-bold text-lg  hover:bg-gradient-to-r from-yellow-600  to-yellow-300 bg-clip-text hover:text-transparent hover:cursor-pointer">{story.title}</p>

                                <div className="flex gap-1 items-center justify-center "><SlCalender />{moment(new Date(story.sharedOn)).format("MMMM D, YYYY")}</div>
                                <div className="flex items-center gap-1">
                                    <FaLocationDot />{story.location}
                                </div>

                            </div>
                        </div>)
                    }

                </div>
            </div>


        </div>
    )
}
