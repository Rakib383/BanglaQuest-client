import { useQuery } from "@tanstack/react-query"
import offers from "../assets/Images/offers2.png"
import { useAxiosPublic } from "../hooks/useAxiosPublic"
import { FaLocationDot } from "react-icons/fa6"
import { Link } from "react-router-dom"
import { useState } from "react"


const HotOffers = () => {

    const axiosPublic = useAxiosPublic()
    const [showPopup, setShowPopup] = useState(true)

    const { data: hotPackages = [] } = useQuery({
        queryKey: ['hotPackages'],
        queryFn: async () => {
            const res = await axiosPublic.get("/packages/discount")
            return res.data
        }
    })

    return (
        <div className="pt-20 md:pt-28">
          {
              showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-SecondaryColor rounded-lg  shadow-lg text-center relative  w-4/5 max-w-md">
                        {/* Close Button */}
                        <button
                            className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 text-black rounded-full w-6 h-6 flex items-center justify-center"
                            onClick={() => setShowPopup(false)}
                        >
                            ✖
                        </button>
    
                        {/* Popup Content */}
                        <img
                            src={offers}
                            alt="Discount Offer"
                            className="w-full rounded-md "
                        />
                        <h2 className="text-xl font-bold text-PrimaryColor">Limited Time Offer!</h2>
                        <p className="text-white mt-2">Get Up to <span className="font-bold text-lg"> 30% OFF</span> on your first booking.</p>
                        <button onClick={() => setShowPopup(false)} className=" bg-PrimaryColor my-2 mb-4 hover:bg-yellow-500  text-white font-semibold py-2 px-4 rounded">
                            Grab the Deal
                        </button>
                    </div>
                </div>)
          }
            <h2 className="text-xl mt-6  font-bold text-ThirdColor text-center items-center justify-center md:text-2xl flex gap-1 ">Discover Unbeatable Travel <p className="bg-SecondaryColor px-2 py-2 rounded-full text-white rotate-12 w-fit">Deals</p></h2>
            <p className=" md:text-lg text-center   ">Experience the thrill of new destinations with our exclusive offers.</p>

            <div>

                {/* package container */}
                <div className='flex flex-col items-center md:flex-row flex-wrap justify-center gap-5 md:gap-12 md:mb-12 my-7 px-4'>
                    {
                        hotPackages?.map((pack, id) => (
                            <div key={id} className="card bg-base-100 w-80 shadow-xl relative py-3">
                                <figure className='relative h-[180px] w-full' >
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
                                        <div className="absolute top-36 -right-8 w-20 h-20 bg-PrimaryColor text-white rounded-full flex flex-col items-center justify-center shadow-lg ">
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
