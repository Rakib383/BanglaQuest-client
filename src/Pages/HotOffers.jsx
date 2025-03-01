import { useQuery } from "@tanstack/react-query"
import { useAxiosPublic } from "../hooks/useAxiosPublic"
import { FaLocationDot } from "react-icons/fa6"
import { Link } from "react-router-dom"



const HotOffers = () => {

    const axiosPublic = useAxiosPublic()
   

    const { data: hotPackages = [] } = useQuery({
        queryKey: ['hotPackages'],
        queryFn: async () => {
            const res = await axiosPublic.get("/packages/discount")
            return res.data
        }
    })

    return (
        <div className="pt-20 md:pt-28 dark:text-gray-300">
        
            <h2 className="text-xl mt-6  font-bold text-ThirdColor text-center items-center justify-center md:text-2xl flex gap-1 dark:text-white">Discover Unbeatable Travel <p className="bg-SecondaryColor px-2 py-2 rounded-full text-white rotate-12 w-fit">Deals</p></h2>
            <p className=" md:text-lg text-center   ">Experience the thrill of new destinations with our exclusive offers.</p>

            <div>

                {/* package container */}
                <div className='flex flex-col items-center md:flex-row flex-wrap justify-center gap-5 md:gap-12 md:mb-12 my-7 px-4'>
                    {
                        hotPackages?.map((pack, id) => (
                            <div key={id} className="card  w-[310px] sm:w-[340px] shadow-xl bg-white relative pb-3">
                                <figure className='relative h-[190px] w-full' >
                                    <img
                                        src={pack.coverPhoto}
                                        alt="" className='h-full w-full' />
                                    <div className='absolute left-0 bottom-2 flex items-center text-PrimaryColor bg-gray-800/20 rounded-sm px-1 backdrop-blur-sm'>
                                        <FaLocationDot className='text-green-950' />
                                        {pack.location}
                                    </div>
                                </figure>
                                <div className="card-body pb-3 text-start px-4 gap-1.5 text-gray-600 ">
                                    <h2 className="card-title text-ThirdColor">
                                        {pack.tripTitle}

                                    </h2>
                                    <p className=''>Tour-Type:{pack.tourType}</p>
                                    <p className=''>Duration:{pack.duration}</p>
                                    <div className="flex items-center justify-center">
                                        <div className="absolute top-36 -right-5 sm:-right-8 w-20 h-20 bg-PrimaryColor text-white rounded-full flex flex-col items-center justify-center shadow-lg ">
                                            <span className="text-sm line-through decoration-white/70">৳{pack.price}</span>
                                            <span className="text-lg font-bold">৳{pack.finalPrice}</span>
                                            <span className="absolute -bottom-3 bg-SecondaryColor text-white text-xs px-2 py-1 rounded-full">
                                                {pack.discount} OFF
                                            </span>
                                        </div>
                                    </div>
                                    <p>Description:{pack.shortDescription}</p>

                                    <Link to={`/packages/${pack._id}`} className='btn mt-3 text-start hover:cursor-pointer text-lg bg-SecondaryColor text-white font-semibold hover:bg-green-900 '>View Details....</Link>
                                </div>
                            </div>

                        ))
                    }
                </div>
            </div>



        </div>
    )
}

export default HotOffers
