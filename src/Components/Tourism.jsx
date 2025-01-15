import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Typewriter } from 'react-simple-typewriter'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaLocationDot } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Autoplay, Pagination } from 'swiper/modules';

export const Tourism = () => {
    const [packages, setPackages] = useState([])
    const [guides, setGuides] = useState([])
    useEffect(() => {
        axios.get("packages.json")
            .then(res => setPackages(res.data));
        axios.get("guides.json")
            .then(res => setGuides(res.data))


    }, [])
    return (
        <div className="w-10/12 mx-auto text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800 items-center">
                <span className="text-PrimaryColor">
                    <Typewriter
                        words={['Explore', 'Discover', 'Experience']}
                        loop={0}
                        cursor
                        cursorStyle='_'
                        typeSpeed={70}
                        deleteSpeed={50}
                        delaySpeed={1000}
                    />
                </span>
                Like Never Before</h2>
            <div className="mt-4 text-gray-600 text-lg md:text-xl flex flex-col text-nowrap items-center">
                <div className='flex text-wrap'>
                    Choose from
                    <div className=" mx-3 rotate-6  z-20 relative py-2">

                        <span className="z-20 bg-transparent text-white   px-2 "> exclusive </span>
                        <div className="w-full  h-full -z-10 bg-gradient-to-br from-white to-SecondaryColor  absolute top-0 left-0">
                        </div>
                    </div>
                </div>
                <p>packages and meet expert guides to make your dream trip come true.</p>
            </div>
            <Tabs className="mt-8" >
                <TabList>
                    <Tab>Our Packages</Tab>
                    <Tab>Meet Our Tour Guides</Tab>
                </TabList>

                <TabPanel className="mt-6">
                    <h2 className="text-2xl md:text-4xl font-bold text-gray-800 items-center">Explore Our Exclusive Travel Packages</h2>
                    <p className='mt-2'>Choose from a variety of exciting travel packages designed for every type of explorer. Let us make your dream vacation a reality!</p>
                    <div className='flex flex-col items-center md:flex-row flex-wrap justify-center gap-5 md:gap-8 md:mb-12 my-7'>
                        {
                            packages?.map(pack => (
                                <div key={pack.location} className="card bg-base-100 w-80 shadow-xl relative py-3">
                                    <figure className='relative h-[200px] w-full' >
                                        <img
                                            src={pack.photo}
                                            alt="" className='h-full w-full' />
                                        <div className='absolute left-0 bottom-2 flex items-center text-PrimaryColor bg-gray-300/40 rounded-sm px-1 backdrop-blur-sm'>
                                            <FaLocationDot className='text-green-900' />
                                            {pack.location}
                                        </div>
                                    </figure>
                                    <div className="card-body text-start px-4 gap-1.5 text-gray-600">
                                        <h2 className="card-title text-ThirdColor">
                                            {pack.tripTitle}

                                        </h2>
                                        <p className=''>Tour-Type:{pack.tourType}</p>
                                        <p className=''>Duration:{pack.duration}</p>
                                        <p>Description:{pack.shortDescription}</p>
                                        <div className="bg-SecondaryColor text-white px-3 py-1.5 -rotate-[35deg] absolute -right-2 bottom-5">From   {pack.price}৳</div>
                                        <Link className='text-start hover:cursor-pointer text-PrimaryColor text-lg '>See Details....</Link>
                                    </div>
                                </div>

                            ))
                        }
                    </div>
                </TabPanel>
                <TabPanel >
                    <h2 className="text-2xl md:text-4xl font-bold text-gray-800 items-center">Meet Your Expert Tour Guides</h2>
                    <p className='mt-2'>Meet the passionate and experienced guides who will lead you on an unforgettable adventure, ensuring you make the most of your journey.</p>

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
                                guides.map(guide => <SwiperSlide className='mb-8' key={guide.name}>
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
                                            <Link className="card-actions justify-center mt-3">
                                                <button className="btn bg-SecondaryColor text-white hover:bg-ThirdColor ">See Details</button>
                                            </Link>
                                        </div>
                                    </div>
                                </SwiperSlide>)
                            }
                        </Swiper>
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    )
}
