import { useQuery } from "@tanstack/react-query"
import { useAxiosPublic } from "../hooks/useAxiosPublic"
import { useParams } from "react-router-dom"

export const GuideProfile = () => {
    const { id } = useParams()
    const axiosPublic = useAxiosPublic()
    const { data: guide } = useQuery({
        queryKey: ['guide'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/tourGuides/${id}`)
            return res.data
        }
    })


    return (
        <div className="pt-32 place-items-center">
            
            <div className="bg-ThirdColor rounded-lg shadow-lg  p-6 w-80 max-w-full text-gray-400 text-center relative">
               
                <img
                    className="w-24 h-24 mx-auto border-2 border-PrimaryColor   object-cover rounded-full p-1"
                    src={guide?.photo}
                    alt="user"
                />
                <h3 className="text-lg text-white font-medium mt-4">{guide?.name}</h3>
                <h6 className="text-sm text-gray-400 capitalize">Experience : {guide?.experience} +</h6>
                <p className="text-sm mt-2 leading-2">
                Expertise: {guide?.expertise}
                </p>
               
                <div className="bg-gray-700 text-left p-4 mt-3 rounded-md">

                    <h6 className="text-PrimaryColor text-sm underline underline-offset-4 mb-2">About Me </h6>
                    <div>
                        {guide?.bio}
                    </div>

                    <h6 className="text-PrimaryColor underline underline-offset-4 text-sm  mb-2">Language Proficiency</h6>
                    <ul className="flex flex-wrap gap-2">
                        {guide?.languages.map(
                            (skill, index) => (
                                <li
                                    key={index}
                                    className="border border-white rounded-md text-xs px-3 py-1"
                                >
                                    {skill}
                                </li>
                            )
                        )}
                    </ul>
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
