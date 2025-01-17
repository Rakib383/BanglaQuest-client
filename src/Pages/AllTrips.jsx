import { useQuery } from "@tanstack/react-query"
import { useAxiosPublic } from "../hooks/useAxiosPublic"
import { Link } from "react-router-dom"
import { FaLocationDot } from "react-icons/fa6"

export const AllTrips = () => {

    const axiosPublic = useAxiosPublic()
    const { data: packages = [] } = useQuery({
        queryKey: ['packages'],
        queryFn: async () => {
            const res = await axiosPublic.get('/allPackages')
            return res.data
        }
    })

    return (

        <div className="pt-32 text-center md:pb-5">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800 items-center">Trips for Every Traveler</h2>
            <p className='mt-2 px-4'>Explore all our trip options and embark on the journey of your dreams.</p>
            <div className='flex flex-col items-center md:flex-row flex-wrap justify-center gap-5 md:gap-8 md:mb-12 my-7'>
                {
                    packages?.map(pack => (
                        <div key={pack.location} className="card bg-base-100 w-80 shadow-xl relative py-3">
                            <figure className='relative h-[180px] w-full' >
                                <img
                                    src={pack.coverPhoto}
                                    alt="" className='h-full w-full' />
                                <div className='absolute left-0 bottom-2 flex items-center text-PrimaryColor bg-gray-300/40 rounded-sm px-1 backdrop-blur-sm'>
                                    <FaLocationDot className='text-green-900' />
                                    {pack.location}
                                </div>
                            </figure>
                            <div className="card-body pb-3 text-start px-4 gap-1.5 text-gray-600">
                                <h2 className="card-title text-ThirdColor">
                                    {pack.tripTitle}

                                </h2>
                                <p className=''>Tour-Type:{pack.tourType}</p>
                                <p className=''>Duration:{pack.duration}</p>
                                <p>Description:{pack.shortDescription}</p>
                                <div className="bg-SecondaryColor text-white px-3 py-1.5 -rotate-[37deg] absolute -right-5 top-40">From   {pack.price}৳</div>
                                <Link to={`allPackages/${pack._id}`} className='btn mt-3 text-start hover:cursor-pointer text-lg bg-SecondaryColor text-white font-semibold hover:bg-green-900 '>View Details....</Link>
                            </div>
                        </div>

                    ))
                }
            </div>
        </div>
    )
}
