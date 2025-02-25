
import { Link, useLoaderData } from "react-router-dom"
import { useContext, useEffect, useState, } from "react"
import { Autoplay, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from 'swiper/react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { FaArrowCircleRight } from "react-icons/fa";
import { useForm, Controller } from "react-hook-form"
import { AuthContext } from "../provider/AuthProvider";
import { useAxiosSecure } from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Confetti from 'react-confetti'
import Swal from "sweetalert2";
import { useAxiosPublic } from "../hooks/useAxiosPublic";
// import { useWindowSize } from 'react-use'
export const PackageDetails = () => {

    const pack = useLoaderData()
    const { user } = useContext(AuthContext);
    const {
        register,
        handleSubmit,
        formState: { errors }, reset, control
    } = useForm()
    const axiosSecure = useAxiosSecure()
    const axiosPublic = useAxiosPublic()
    const [bookedPackages, setBookedPackages] = useState(0)
    const [showConfetti, setShowConfetti] = useState(false);
    const { photoGallery, shortDescription, timeline, tripTitle, price } = pack
    const [pageWidth, setPageWidth] = useState(window.innerWidth);
    const { data: guides } = useQuery({
        queryKey: ['guides'],
        queryFn: async () => {
            const res = await axiosPublic.get('/allTourGuides')
            return res.data
        }
    })
    useEffect(() => {
        const savedBookedPackages = parseInt(localStorage.getItem("bookedPackages")) || 0
        setBookedPackages(savedBookedPackages)
    }, [])


    const onSubmit = (data) => {

        const formateDate = new Date(data.date).toLocaleDateString("en-GB")
        data.date = formateDate
        data.package = tripTitle
        data.status = "pending"
        data.price = parseFloat(data.price)

        // console.log(data)
        axiosSecure.post("/bookings", data)
            .then(() => {
                const updateBookedPackages = bookedPackages + 1
                setBookedPackages(updateBookedPackages)
                localStorage.setItem("bookedPackages", updateBookedPackages)
                if (bookedPackages >= 3) {
                    setShowConfetti(true)
                    setTimeout(() => setShowConfetti(false), 5000)
                    Swal.fire({
                        title: "Congratulation.You Got Discount!",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1100
                    })

                    return setTimeout(() => document.getElementById('confirm_modal').showModal(), 4000)

                }
                document.getElementById('confirm_modal').showModal()
            })

    }


    useEffect(() => {
        const handleResize = () => setPageWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return (
        <div className=" pt-32   text-center dark:text-gray-300 text-gray-600 px-5">
            {showConfetti && (
                <Confetti
                    height={3000}
                    width={pageWidth}
                    confettiSource={{
                        x: pageWidth / 2 - 50,
                        y: 1800,
                        w: 100,
                        h: 100,
                    }}
                    numberOfPieces={400}
                />
            )}
            <div className="text-3xl md:text-5xl font-bold text-gray-800 justify-center flex flex-col sm:flex-row gap-2 items-center">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white" >A Glimpse of The </h2>
                <div className="rotate-6  z-20 relative pb-2">
                    <span className="z-20 bg-transparent text-white   px-2 text-xl">Destinations </span>
                    <div className="w-full  h-full -z-10 bg-SecondaryColor  absolute top-0 left-0">
                    </div>
                </div>
            </div>

            {/* gallery section */}

            <div className=" mx-auto grid  grid-cols-2 grid-rows-2 md:grid-rows-4 md:grid-cols-3   px-8 py-5 gap-5 h-[340px] max-w-[550px] md:max-w-[760px] md:h-[550px] ">

                <div className="md:col-span-2 md:row-span-2">
                    <img src={photoGallery[0]} className="h-full w-full" alt="" />
                </div>
                <div className="md:row-span-2" >
                    <img src={photoGallery[1]} className="h-full w-full " alt="" />
                </div>
                <div className="col-span-2 md:col-span-1 md:row-span-2 object-cover " >
                    <img src={photoGallery[2]} className="h-full w-full" alt="" />
                </div>
                <div className="hidden md:block md:col-span-2 md:row-span-2">
                    <img src={photoGallery[3]} className="w-full h-full" alt="" />
                </div>
            </div>

            <div className="text-xl flex justify-center items-center gap-2 mt-5  font-bold text-ThirdColor text-start md:text-center md:text-2xl dark:text-white">About This <div className=" bg-gradient-to-br rotate-6 from-white to-PrimaryColor w-fit dark:text-gray-700 text-xl md:text-3xl  ">Tour</div></div>

            <p className=" w-72 md:text-lg text-start mt-4 md:text-center md:mx-auto">{shortDescription}</p>

            <h3 className="text-xl mt-5 md:mt-10 underline font-bold text-ThirdColor dark:text-white text-start sm:pl-10 max-w-4xl mx-auto md:mb-12 mb-8">Tour Plan :</h3>

            {/* tour plan */}
            <ul className="timeline timeline-snap-icon max-md:timeline-compact   timeline-vertical mb-12 ">
                {
                    timeline.map((activity, idx) => (
                        <li key={idx}>
                            {idx !== 0 && <hr />}
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
                            <div className={`${idx % 2 == 1 ? "timeline-start md:text-end" : "timeline-end"} text-start mb-10`}>
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

            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white items-center mt-8">Meet Our Expert Tour Guides</h2>
            <p className='mt-2 px-4 md:px-20'>Meet the passionate and experienced guides who will lead you on an unforgettable adventure, ensuring you make the most of your journey.</p>

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
                        guides?.map((guide, idx) => <SwiperSlide className='mb-8' key={idx}>
                            <div className="card dark:bg-white rounded-md  w-80 shadow-xl ">
                                <figure>
                                    <img
                                        src={guide.photoURL}
                                        alt="Shoes" />
                                </figure>
                                <div className="card-body gap-0.5 text-start text-gray-600">
                                    <h2 className="card-title">{guide.name}</h2>
                                    <p className="truncate">Expertise: {guide.expertise} </p>
                                    <p>Experience: {guide.experience} years+ </p>
                                    <Link to={`/guideProfiles/${guide._id}`} className="btn bg-SecondaryColor text-white hover:bg-ThirdColor hover:cursor-pointer mt-3 ">See Details</Link>
                                </div>
                            </div>
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>


            {/* Booking Section  */}
            <div>

                <h2 className="font-black font-charm text-xl md:text-2xl text-primaryColor underline mb-3 sm:mb-6 text-center">Book Your Adventure</h2>
                <p className="text-gray-600 dark:text-gray-300 font-semibold mb-5 md:text-[17px] px-3 w-80 sm:w-[420px] mx-auto text-center">Fill out the form below to confirm your booking and embark on an unforgettable journey.</p>

                {/* Booking Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="sm:max-w-xl max-w-sm  mx-auto pt-10 shadow-lg  px-6 py-8 rounded-xl bg-gradient-to-tl from-white to-SecondaryColor mb-20 md:mb-24">
                    <h3 className="text-ThirdColor font-bold text-lg">{tripTitle}</h3>
                    <div className="grid gap-6 mb-6 sm:grid-cols-2">
                        <div >
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Tourist Name
                            </label>
                            <input
                                readOnly
                                type="text"
                                name="name"
                                value={user?.displayName}
                                {...register("name", { required: true })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="name"
                                required
                            />

                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Tourist Email
                            </label>
                            <input
                                {...register("email", { required: true })}
                                type="email"
                                value={user?.email}
                                name="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm w-full rounded-lg focus:ring-blue-500 focus:border-blue-500 block   p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="email"
                                required
                            />

                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Image
                            </label>
                            <input
                                {...register("photoURL", { required: true })}
                                type="text"
                                name="photoURL"
                                value={user?.photoURL}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm w-full rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="ImageURL"
                                required
                            />
                            {errors.photoURL && <span className="text-red-400 text-sm">This field is required</span>}

                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Price
                            </label>
                            <input
                                {...register("price", { required: true })}
                                type="number"
                                name="price"
                                value={price}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm w-full rounded-lg focus:ring-blue-500 focus:border-blue-500 block   p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="price"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Tour Date
                            </label>
                            <Controller
                                name="date"
                                control={control}
                                rules={{ required: "this field is required" }}
                                render={({ field }) => (
                                    <DatePicker
                                        {...field}
                                        dateFormat="dd/MM/yyyy"
                                        selected={field.value}
                                        onChange={(date) => field.onChange(date)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[270px] sm:w-[252px]"
                                    />
                                )}

                            />
                            {errors.date && <span className="text-red-500  text-sm">{errors.date.message}</span>}

                        </div>
                        <div>
                            <label

                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Tour Guide
                            </label>
                            <select  {...register("tourGuideEmail", { required: true })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

                                {
                                    guides?.map((guide, idx) => <option value={guide.email} key={idx}>{guide.name}</option>)
                                }

                            </select>
                            {errors.tourGuide && <span className="text-red-400 text-sm">This field is required</span>}
                        </div>

                    </div>

                    <div className="sm:flex">
                        <button
                            type="submit"
                            className="btn  bg-primaryColor   hover:text-white hover:bg-SecondaryColor sm:w-28 mx-auto w-full text-white mt-7 px-5 py-2.5 text-center"
                        >
                            Book Now
                        </button>
                    </div>
                </form>
            </div>



            <dialog id="confirm_modal" className="modal">
                <div className="modal-box w-[320px] sm:w-[500px] h-[300px] sm:h-[340px] items-center justify-center flex flex-col bg-gradient-to-tr from-SecondaryColor to-gray-300">
                    <h3 className="font-bold text-PrimaryColor text-lg md:text-xl">Confirm Your Booking</h3>
                    <div className="py-4 flex items-center gap-2 justify-center text-ThirdColor text-lg ">Go to : <Link to="/dashboard/bookings" className="underline font-bold flex items-center gap-1 text-xl flex-nowrap">My Booking <FaArrowCircleRight /></Link></div>
                </div>
            </dialog>

        </div>
    )
}
