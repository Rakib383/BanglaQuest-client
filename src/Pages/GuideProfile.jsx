import { useQuery } from "@tanstack/react-query"
import { useAxiosPublic } from "../hooks/useAxiosPublic"
import { useParams } from "react-router-dom"

export const GuideProfile = () => {
    const { id } = useParams()
    const axiosPublic = useAxiosPublic()
    const { data: guide, isLoading } = useQuery({
        queryKey: ['guide'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/tourGuides/${id}`)
            return res.data
        }
    })

    if (isLoading) {
        return <span className="loading">Loading</span>
    }

    return (
        <div className="pt-32 place-items-center">

            <div className="bg-ThirdColor rounded-lg shadow-lg  p-6 w-80 max-w-full text-gray-400 text-center relative">

                <img
                    className="w-24 h-24 mx-auto border-2 border-PrimaryColor   object-cover rounded-full p-1"
                    src={guide?.photoURL}
                    alt="user"
                />
                <h3 className="text-lg text-white font-medium mt-4">{guide?.name}</h3>
                <h6 className="text-sm text-gray-400 capitalize">Experience : {guide?.experience} years+</h6>
                <p className="text-sm mt-2 leading-2">
                    Expertise: {guide?.expertise}
                </p>

                <div className="bg-gray-700 text-left p-4 mt-3 rounded-md">

                    <h6 className="text-PrimaryColor text-sm underline underline-offset-4 mb-2">Description: </h6>
                    <div>
                        {guide?.description}
                    </div>

                </div>
                <div className="flex justify-center gap-4 mt-4">
                    <button className="bg-PrimaryColor text-ThirdColor rounded-md font-medium px-4 py-2">
                        Update
                    </button>

                </div>
            </div>


        </div>
    )
}
