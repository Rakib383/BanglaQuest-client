import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { AuthContext } from "../provider/AuthProvider"
import { useAxiosSecure } from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export const EditStories = () => {

    const { user } = useContext(AuthContext)
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    const [photo, setPhoto] = useState("")

    const { id } = useParams()

    const { data: story, refetch, isLoading } = useQuery({
        queryKey: ['story'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allStories/edit/${id}`)
            return res.data
        }
    })

    const handleAddPhoto = (e) => {
        e.preventDefault()

        axiosSecure.patch(`allStories/${id}/photos`, { newPhoto:photo })
            .then(res => {
                Swal.fire({
                    title: "image Successfully Added!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 900
                })
                setPhoto("")
                refetch()

            })


    }

    const handleDeletePhoto = (e) => {
        e.preventDefault()
        axiosSecure.patch(`allStories/${id}/photos`, {removePhoto: photo })
        .then(res => {
            Swal.fire({
                title: "Deleted!",
                icon: "success",
                showConfirmButton: false,
                timer: 900
            })
            refetch()

        })
    }

    const onSubmit = (data) => {
      console.log(data)
      
      
        axiosSecure.patch(`/allStories/${id}`, data)
            .then((res) => {
                Swal.fire({
                    title: "Story updated Successfully !",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1000
                })
                console.log(res.data)
                navigate("/dashboard/myStories")
            })
    }

    if (isLoading) {
        return <span className="spinner">Loading</span>
    }

    return (
        <div className="max-w-2xl mx-auto pt-28">
            <h2 className="font-black font-charm text-xl md:text-2xl text-primaryColor underline mb-3 sm:mb-4 text-center">Edit Stories</h2>

            <form onSubmit={handleSubmit(onSubmit)}  className=" mx-auto pt-6 shadow-lg  px-6 py-8 rounded-xl bg-gradient-to-tl from-white to-SecondaryColor">

                <div className="grid gap-6 mb-3 sm:grid-cols-2">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Title*
                        </label>
                        <input

                            type="text"
                            {...register("title")}
                            defaultValue={story.title}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Story Title"
                            required
                        />

                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Location*
                        </label>
                        <input

                            type="text"
                            defaultValue={story.location}
                            {...register("location")}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Location"
                            required
                        />

                    </div>

                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Images
                    </label>
                    <textarea value={story.images.join('\n')} readOnly type="text"

                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder=" "
                        ></textarea>

                </div>
                <div>

                    <label className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white">
                        ImageURL*
                    </label>
                    <textarea value={photo} onChange={(e) => setPhoto(e.target.value)} rows={1} type="url"

                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder=" Enter image you want to add/delete."
                        ></textarea>
                    {/* add & delete btns */}
                    <div className="flex space-x-4 mt-3">
                        {/* Add Button */}
                        <button disabled={!photo} onClick={handleAddPhoto} className="bg-green-500 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 active:scale-95 transition-transform">
                            Add Photo
                        </button>

                        {/* Delete Button */}
                        <button disabled={!photo} onClick={handleDeletePhoto} className="bg-red-500 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 active:scale-95 transition-transform">
                            Delete Photo
                        </button>
                    </div>

                </div>
                <div>
                    <label className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white">
                        Description*
                    </label>
                    <textarea defaultValue={story.description} rows={3} type="text"


                        {...register("description")}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Tell about the Story"
                        required></textarea>

                        <p>*these fields can be changed</p>

                </div>

                <div className="sm:flex">
                    <button
                        type="submit"
                        className="btn  bg-primaryColor   hover:text-white hover:bg-SecondaryColor sm:w-28 mx-auto w-full  mt-7 px-5 py-2.5 text-center"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}
