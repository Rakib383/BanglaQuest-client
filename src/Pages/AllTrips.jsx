import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { FaLocationDot } from "react-icons/fa6"
import { useAxiosSecure } from "../hooks/useAxiosSecure"
import { useEffect, useState } from "react"

export const AllTrips = () => {

    const axiosSecure = useAxiosSecure()
    const [sortedPackages, setSortedPackages] = useState([])
    const { data: packages,isLoading } = useQuery({
        queryKey: ['packages'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allPackages')
            return res.data
        }
    })

    useEffect(() => {
        setSortedPackages(packages)
    }, [packages])

    const handleSorting = (e) => {
        const sortBy = e.target.value;
        let sorted = [...packages]
        if (sortBy === "Price (Low to High)") {
            sorted.sort((a, b) => a.price - b.price)
        } else {
            sorted.sort((a, b) => b.price - a.price)
        }

        setSortedPackages(sorted)

    }

    return (

        <div className="pt-32 text-center md:pb-5 min-h-screen dark:text-gray-300">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800 items-center dark:text-white">Trips for Every Traveler</h2>
            <p className='mt-2 px-4'>Explore all our trip options and embark on the journey of your dreams.</p>
            {/* sort by price */}
            <select onChange={handleSorting} defaultValue="Sort By" className="select border text-center w-40 h-10 min-h-10 border-black focus:outline-black dark:focus:outline-white dark:border-white bg-white dark:bg-black mt-4">
                <option disabled={true}>Sort By </option>
                <option className="text-start">Price (Low to High)</option>
                <option className="text-start ">Price (High to Low)</option>

            </select>

            {
                isLoading ?   <div className="h-44 flex justify-center items-center ">
               <span className="loading loading-bars loading-xl"></span>
            </div> : <div className='flex flex-col items-center md:flex-row flex-wrap justify-center gap-5 md:gap-12 md:mb-12 my-7 md:px-8 max-w-6xl mx-auto px-4'>
                {
                    sortedPackages?.map((pack, id) => (
                        <div key={id} className="card  dark:bg-white w-80 shadow-xl relative pb-3">
                            <figure className='relative h-[190px] w-full' >
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
                                <Link to={`/packages/${pack._id}`} className='btn mt-3 text-start hover:cursor-pointer text-lg bg-SecondaryColor text-white font-semibold hover:bg-SecondaryColor/95 '>View Details....</Link>
                            </div>
                        </div>

                    ))
                }
            </div>
            }
           
            
        </div>
    )
}
