import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { AuthContext } from "../provider/AuthProvider"
import { useAxiosSecure } from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import moment from "moment";


export const BecomeTourGuide = () => {
    const { user } = useContext(AuthContext)
    const [isDisable, setIsDisable] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors }, reset
    } = useForm()
    const axiosSecure = useAxiosSecure()

    const onSubmit = (data) => {
        data.appliedDate = moment().format("MMMMD,YYYY");
        data.email = user.email
        axiosSecure.get(`/users/${user.email}`)
            .then(res => {
                data.name = res.data.name
                data.Role = res.data.Role
                axiosSecure.post("/guideApplications", data)
                    .then((res) => {

                        Swal.fire({
                            title: "Application successful!",
                            icon: "success",
                            showConfirmButton: false,
                            timer: 1200
                        })
                        reset()
                        setIsDisable(true)
                    })
            })

    }

    return (
        <div className="max-w-2xl mx-auto mt-5">
            <h2 className="font-black font-charm text-xl md:text-2xl text-primaryColor underline mb-3 sm:mb-4 text-center">Apply For Tour Guide</h2>

            <form onSubmit={handleSubmit(onSubmit)} className=" mx-auto pt-6 shadow-lg  px-6 py-8 rounded-xl bg-gradient-to-tl from-white to-SecondaryColor">

                <div className="grid gap-6 mb-3 sm:grid-cols-2">

                </div>
                <div>
                    <label className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white">
                        Why You Want to become a Tour Guide?
                    </label>
                    <textarea rows={3} type="text"


                        {...register("description", { required: true })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Description"
                        required></textarea>

                </div>
                <div>
                    <label className="block mb-2 mt-3 text-sm font-medium text-gray-900 dark:text-white">
                        Expertise Field
                    </label>
                    <textarea rows={1} type="text"

                        {...register("expertise", { required: true })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Write Where You are Good At? "
                        required></textarea>

                </div>
                <div>
                    <label className="block mb-2 mt-3 text-sm font-medium text-gray-900 dark:text-white">
                        Experience(Years)
                    </label>
                    <input rows={1} type="number"

                        {...register("experience", { required: true })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder=""
                        required></input>

                </div>
                <div>
                    <label className="block mb-2 mt-3 text-sm font-medium text-gray-900 dark:text-white">
                        Drop Your CVLink
                    </label>
                    <textarea rows={1} type="url"

                        {...register("CV_Link", { required: true })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="CV Link "
                        required></textarea>

                </div>


                <div className="sm:flex">
                    <button disabled={isDisable}
                        type="submit"
                        className="btn  bg-primaryColor   hover:text-white hover:bg-SecondaryColor sm:w-28 mx-auto w-full  mt-7 px-5 py-2.5 text-center"
                    >
                        Apply
                    </button>
                </div>
            </form>
        </div>
    )
}
