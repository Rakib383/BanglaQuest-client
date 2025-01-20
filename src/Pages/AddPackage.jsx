
import { useForm } from "react-hook-form"
import { useAxiosSecure } from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";

export const AddPackage = () => {
    const {
        register,
        handleSubmit,
         reset
    } = useForm()
    const axiosSecure = useAxiosSecure()


    const onSubmit = (data) => {

        data.photoGallery = data.photoGallery.split("\n").map((url) => url.trim());
        data.timeline = JSON.parse(data.timeline)

        axiosSecure.post("/allPackages", data)
            .then(() => {

                Swal.fire({
                    title: "Package Successfully Added!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1200
                })
                reset()
            })
            .catch(err => {
                console.log(err)
            })

    }
    return (
        <div>
            <h2 className="font-black font-charm text-xl md:text-2xl text-primaryColor underline mb-3 sm:mb-6 text-center">Add New Package</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="sm:max-w-xl max-w-sm mx-auto pt-5 shadow-lg  px-6 py-8 pb-5 rounded-xl bg-gradient-to-tl from-white to-SecondaryColor mb-20 md:mb-6">

                <div className="grid gap-6 mb-6 sm:grid-cols-2">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Trip Title
                        </label>
                        <input

                            type="text"
                            {...register("tripTitle", { required: true })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="title"
                            required
                        />

                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Tour Type
                        </label>
                        <input
                            {...register("tourType", { required: true })}
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="tourType"
                            required
                        />

                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Cover Photo
                        </label>
                        <input
                            {...register("coverPhoto", { required: true })}
                            type="url"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Enter Featured PhotoURL"
                            required
                        />


                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Price
                        </label>
                        <input
                            {...register("price", { required: true })}
                            type="number"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="price"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Location
                        </label>
                        <input
                            {...register("location", { required: true })}
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Location"
                            required
                        />

                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Duration
                        </label>
                        <input
                            {...register("duration", { required: true })}
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Enter Days,Nights"
                            required
                        />

                    </div>


                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        photoGallery
                    </label>
                    <textarea rows={3} type="text"

                        {...register("photoGallery", { required: true })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="For multiple image put each image URL in Each line. "
                        required></textarea>

                </div>
                <div>
                    <label className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white">
                        Short Description
                    </label>
                    <textarea rows={3} type="text"


                        {...register("shortDescription", { required: true })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Tell about the Trip"
                        required></textarea>

                </div>
                <div>
                    <label className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white">
                        TimeLine
                    </label>
                    <textarea rows={3} type="text"


                        {...register("timeline", { required: true })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder='Enter data in JSON format, e.g. [{"day":"1","title":"boat Ride","location":"City A"},{"day":"2","title":"horse Ride","location":"City B"}]'
                        required></textarea>

                </div>

                <div className="sm:flex">
                    <button
                        type="submit"
                        className="btn  bg-primaryColor   hover:text-white hover:bg-SecondaryColor sm:w-32 mx-auto w-full  mt-7 px-5 py-2.5 text-center"
                    >
                        Add Package
                    </button>
                </div>
            </form>
        </div>
    )
}
