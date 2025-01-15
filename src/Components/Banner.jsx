import { Swiper, SwiperSlide } from 'swiper/react';
import quakata from "../assets/Images/sea-beach.jpg"
import coxbazar from "../assets/Images/coxbazar2.jpg"
import saintMartin from "../assets/Images/saintMartin2.jpg"
import sundarban from "../assets/Images/sundarban2.jpg"
import bandarban from "../assets/Images/bandarban2.jpg"
import { motion } from "motion/react"


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
export const Banner = () => {
    return (
        <>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2800,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="w-full h-full"
            >
                <SwiperSlide className='relative'>
                    <img className='w-full h-[460px] sm:h-[500px] md:h-[650px] lg:h-[720px]' src={saintMartin} alt="" />
                    <div className='   absolute right-16 top-60  px-6 py-4 z-20 '>
                        <h2 className='text-PrimaryColor text-3xl md:text-4xl lg:text-5xl font-fresh text-nowrap'>Saint Martins Island</h2>
                        <div className='text-white text-xl '><motion.span initial={{ opacity: 0, x: -100, y: -200 }} whileInView={window.innerWidth >= 768 ? { x: 88, y: 0, opacity: 1 } : { x: 56, y: 0, opacity: 1 }} className='text-2xl' style={{ display: 'block' }} transition={{ type: "spring", stiffness: 50, damping: 6, delay: 0.3 }}>The Pearl</motion.span>
                            <p className='ml-8'>of the Bay of Bengal</p>
                        </div>
                    </div>
                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 2 }} className='w-28 h-28 rounded-full  bg-white/40 backdrop-blur-[2px] absolute top-60 right-32 lg:right-48 z-10 '>

                    </motion.div>
                </SwiperSlide>

                <SwiperSlide className='relative'>
                    <img className='w-full h-[460px] sm:h-[500px] md:h-[650px] lg:h-[720px]' src={sundarban} alt="" />
                    <div className='absolute  bottom-16 sm:bottom-32 sm:right-8 md:bottom-80 md:right-16 lg:right-32 lg:bottom-96 right-2 rounded-lg z-20'>
                        <motion.p initial={{ y: -100, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.8 }} className='text-PrimaryColor font-fresh text-3xl sm:text-4xl md:text-5xl '>Sundarban</motion.p>
                        <motion.p className='text-white text-lg' initial={{ y: -100, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 1 }}>A Paradise of Biodiversity</motion.p>
                    </div>
                    <motion.div initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 1, rotate: 45 }} transition={{ duration: 0.5 }} className='absolute backdrop-blur-md bottom-14 right-8 sm:bottom-32 sm:right-8 md:bottom-80 md:right-16 lg:right-32 lg:bottom-96  w-20 h-20    bg-white/40 z-10'>
                    </motion.div>
                </SwiperSlide>
                <SwiperSlide className='relative'>
                    <img className='w-full h-[460px] sm:h-[500px] md:h-[650px] lg:h-[720px]' src={bandarban} alt="" />
                    <div className='absolute  bottom-16 sm:bottom-32 sm:right-8 md:bottom-80 md:right-16 lg:right-32 lg:bottom-96 right-4 rounded-lg z-20'>
                        <motion.p initial={{ y: -100, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.8 }} className='text-PrimaryColor font-fresh text-3xl sm:text-4xl md:text-5xl '>Bandarban</motion.p>
                        <motion.p className='text-white md:text-lg' initial={{ y: -100, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 1 }}>Hills of Harmony</motion.p>
                    </div>
                    <motion.div initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 1, rotate: 45 }} transition={{ duration: 0.5 }} className='absolute backdrop-blur-md bottom-14 right-8 sm:bottom-32 sm:right-8 md:bottom-80 md:right-16 lg:right-32 lg:bottom-96  w-20 h-20    bg-white/40 z-10'>
                    </motion.div>
                </SwiperSlide>
                <SwiperSlide className='relative'>
                    <img className='w-full h-[460px] sm:h-[500px] md:h-[650px] lg:h-[720px]' src={quakata} alt="" />
                    <div className='absolute  bottom-16 sm:bottom-32 sm:right-8 md:bottom-80 md:right-16 lg:right-32 lg:bottom-96 right-4 rounded-lg z-20'>
                        <motion.p initial={{ y: -100, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.8 }} className='text-PrimaryColor font-fresh text-3xl sm:text-4xl md:text-5xl '>Kuakata</motion.p>
                        <motion.p className='text-white md:text-lg' initial={{ y: -100, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 1 }}>Land of Sunsets</motion.p>
                    </div>
                    <motion.div initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 1, rotate: 45 }} transition={{ duration: 0.5 }} className='absolute backdrop-blur-md bottom-14 right-8 sm:bottom-32 sm:right-8 md:bottom-80 md:right-16 lg:right-32 lg:bottom-96  w-20 h-20    bg-white/40 z-10'>
                    </motion.div>
                </SwiperSlide>
                <SwiperSlide className='relative'>
                    <img className='w-full h-[460px] sm:h-[500px] md:h-[650px] lg:h-[720px]' src={coxbazar} alt="" />
                    <div className='absolute  bottom-16 sm:bottom-32 sm:right-8 md:bottom-80 md:right-16 lg:right-32 lg:bottom-96 right-4 rounded-lg z-20'>
                        <motion.p initial={{ y: -100, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.7 }} className='text-PrimaryColor font-fresh text-3xl sm:text-4xl md:text-5xl '>Coxs Bazar</motion.p>
                        <motion.p className='text- md:text-lg' initial={{ y: -100, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 1 }}>Coastal Magic</motion.p>
                    </div>
                    <motion.div initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 1, rotate: 45 }} transition={{ duration: 0.5 }} className='absolute backdrop-blur-md bottom-14 right-8 sm:bottom-32 sm:right-8 md:bottom-80 md:right-16 lg:right-32 lg:bottom-96  w-20 h-20    bg-white/40 z-10'>
                    </motion.div>

                </SwiperSlide>

            </Swiper>
        </>
    )
}
