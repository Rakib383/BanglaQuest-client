import { useContext } from "react"
import { useForm } from "react-hook-form"
import { AuthContext } from "../provider/AuthProvider"
import moment from "moment";
import { useAxiosSecure } from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const AddStories = () => {
    const { user } = useContext(AuthContext)
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()

    const onSubmit = (data) => {
        data.sharedBy = user.displayName
        data.email = user.email
        const urlsArray = data.images.split("\n").map((url) => url.trim());
        data.images = urlsArray
        data.sharedOn = moment().format("MMMMD,YYYY");
        axiosSecure.post("/allStories", data)
            .then((res) => {

                Swal.fire({
                    title: "Story Successfully Added!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1000
                })
                navigate("/dashboard/myStories")
            })
    }


    return (
        <div className="max-w-2xl mx-auto mt-5">
            <h2 className="font-black font-charm text-xl md:text-2xl text-primaryColor underline mb-3 sm:mb-4 text-center">Add Stories</h2>

            <form onSubmit={handleSubmit(onSubmit)} className=" mx-auto pt-6 shadow-lg  px-6 py-8 rounded-xl bg-gradient-to-tl from-white to-SecondaryColor">

                <div className="grid gap-6 mb-3 sm:grid-cols-2">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Title
                        </label>
                        <input

                            type="text"
                            {...register("title")}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Story Title"
                            required
                        />

                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                           Location
                        </label>
                        <input

                            type="text"
                            {...register("location")}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Location"
                            required
                        />

                    </div>

                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        ImageURL
                    </label>
                    <textarea rows={3} type="text"


                        {...register("images")}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="For multiple image put each image URL in Each line. "
                        required></textarea>

                </div>
                <div>
                    <label className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white">
                        Description
                    </label>
                    <textarea rows={4} type="text"


                        {...register("description")}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Tell about the Story"
                        required></textarea>

                </div>

                <div className="sm:flex">
                    <button
                        type="submit"
                        className="btn  bg-primaryColor   hover:text-white hover:bg-SecondaryColor sm:w-28 mx-auto w-full  mt-7 px-5 py-2.5 text-center"
                    >
                        Add Story
                    </button>
                </div>
            </form>
        </div>
    )
}
