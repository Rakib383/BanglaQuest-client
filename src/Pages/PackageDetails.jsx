
import { useQuery } from "@tanstack/react-query"
import { Link, useParams } from "react-router-dom"
import { useAxiosPublic } from "../hooks/useAxiosPublic"
import { useEffect, useState } from "react"
import axios from "axios"
import { Autoplay, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from 'swiper/react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

export const PackageDetails = () => {
    const { id } = useParams()
    const axiosPublic = useAxiosPublic()
    const [guides, setGuides] = useState([])
    const [startDate, setStartDate] = useState(new Date());

    useEffect(() => {
        axios.get("/guides.json")
            .then(res => setGuides(res.data))


    }, [])
    const { data: pack } = useQuery({
        queryKey: ['pack'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/packages/${id}`)
            return res.data

        }
    })


    return (
        <div className=" pt-32  text-center text-gray-600 px-5">

            <div className="text-3xl md:text-5xl font-bold text-gray-800 justify-center flex flex-col sm:flex-row gap-2 items-center">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 " >A Glimpse of The </h2>
                <div className="rotate-6  z-20 relative pb-2">
                    <span className="z-20 bg-transparent text-white   px-2 text-xl">Destinations </span>
                    <div className="w-full  h-full -z-10 bg-SecondaryColor  absolute top-0 left-0">
                    </div>
                </div>
            </div>

            {/* gallery section */}

            <div className=" mx-auto grid  grid-cols-2 grid-rows-2 md:grid-rows-4 md:grid-cols-3   px-8 py-5 gap-5 h-[340px] max-w-[550px] md:max-w-[760px] md:h-[550px] ">

                <div className="md:col-span-2 md:row-span-2">
                    <img src={pack?.photoGallery[0]} className="h-full w-full" alt="" />
                </div>
                <div className="md:row-span-2" >
                    <img src={pack?.photoGallery[1]} className="h-full w-full " alt="" />
                </div>
                <div className="col-span-2 md:col-span-1 md:row-span-2 object-cover " >
                    <img src={pack?.photoGallery[2]} className="h-full w-full" alt="" />
                </div>
                <div className="hidden md:block md:col-span-2 md:row-span-2">
                    <img src={pack?.photoGallery[3]} className="w-full h-full" alt="" />
                </div>
            </div>

            <h3 className="text-xl mt-5 underline font-bold text-ThirdColor text-start ">About This <span className=" bg-gradient-to-br from-white to-PrimaryColor text-xl md:text-2xl  ">Tour</span></h3>

            <p className=" w-72 text-start mt-4">{pack?.shortDescription}</p>

            <h3 className="text-xl mt-5 underline font-bold text-ThirdColor text-start ">Tour Plan :</h3>

            {/* tour plan */}
            <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical text-start">
                {
                    pack?.timeline.map((activity, idx) => (
                        <li key={idx}>
                            <div className="timeline-middle">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="h-5 w-5">
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                        clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="timeline-start mb-10 md:text-end">
                                <time className="font-mono italic">Day-{activity.day}</time>
                                <div className="text-lg font-black">{activity.title}

                                </div>
                                {activity.activities}
                            </div>
                            <hr />
                        </li>
                    ))
                }

            </ul>

            {/* Tour guides */}

            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 items-center mt-8">Meet Our Expert Tour Guides</h2>
            <p className='mt-2 px-4'>Meet the passionate and experienced guides who will lead you on an unforgettable adventure, ensuring you make the most of your journey.</p>

            <div className="my-10 w-80  sm:w-[560px] md:w-[760px] lg:w-[920px] xl:w-[1100px] mx-auto" >
                <Swiper

                    breakpoints={{
                        slidesPerView: 1,
                        560: {
                            slidesPerView: 1.5
                        },
                        768: {
                            slidesPerView: 2
                        },
                        1024: {
                            slidesPerView: 2.5
                        },
                        1200: {
                            slidesPerView: 3
                        }
                    }}
                    spaceBetween={20}
                    centeredSlides={true}
                    pagination={{
                        clickable: true,
                    }}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay, Pagination]}


                >
                    {
                        guides?.map(guide => <SwiperSlide className='mb-8' key={guide.name}>
                            <div className="card rounded-md bg-base-100 w-80 shadow-xl ">
                                <figure>
                                    <img
                                        src={guide.photo}
                                        alt="Shoes" />
                                </figure>
                                <div className="card-body gap-0.5 text-start text-gray-600">
                                    <h2 className="card-title">{guide.name}</h2>
                                    <p>{guide.expertise} </p>
                                    <p>Experience: {guide.experience} </p>
                                    <Link className="btn bg-SecondaryColor text-white hover:bg-ThirdColor hover:cursor-pointer mt-3 ">See Details</Link>
                                </div>
                            </div>
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>


            {/* Booking Form  */}
            <div>
                <h2 className="font-black font-charm text-xl md:text-2xl text-primaryColor underline mb-3 sm:mb-6 text-center">Book Your Adventure</h2>
                <p className="text-gray-600 font-semibold mb-5 md:text-[17px] px-3 w-80 sm:w-[420px] mx-auto text-center">Fill out the form below to confirm your booking and embark on an unforgettable journey.</p>


                <form className="sm:max-w-xl max-w-sm mx-auto pt-10 shadow-lg  px-6 py-8 rounded-xl bg-gradient-to-tl from-white to-SecondaryColor mb-20 md:mb-24">
                    <h3 className="text-ThirdColor font-bold text-lg">{pack.tripTitle}</h3>
                    <div className="grid gap-6 mb-6 sm:grid-cols-2">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Tourist Name
                            </label>
                            <input
                                type="text"
                                name="name"

                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="name"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Tourist Email
                            </label>
                            <input
                                type="text"
                                name="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="email"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Image
                            </label>
                            <input
                                type="text"
                                name="imageURL"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="ImageURL"
                                required
                            />


                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Price
                            </label>
                            <input
                                type="number"
                                name="price"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="price"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Tour Date
                            </label>
                            <DatePicker  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  w-[332px] sm:w-[252px] " selected={startDate} onChange={(date) => setStartDate(date)} />
                        </div>
                        <div>
                            <label

                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Tour Guide
                            </label>
                            <select required name="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                
                           
                               {
                                guides.map((guide,idx) =>  <option value={`${guide.name}`} key={idx}>{guide.name}</option>)
                               }
                             
                            </select>
                        </div>

                    </div>

                    <div className="sm:flex">
                        <button
                            type="submit"
                            className="btn  bg-primaryColor   hover:text-white hover:bg-SecondaryColor sm:w-28 mx-auto w-full  mt-7 px-5 py-2.5 text-center"
                        >
                            Book Now
                        </button>
                    </div>
                </form>
            </div>



        </div>
    )
}
