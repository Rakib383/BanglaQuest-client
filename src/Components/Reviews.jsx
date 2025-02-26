import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Rating } from 'react-simple-star-rating'
import { Autoplay } from 'swiper/modules';

const demoData = [
    {
        "userName": "Ayesha Rahman",
        "userPhoto": "https://i.ibb.co/04HPxGc/reviewF1.jpg",
        "rating": 5,
        "reviewText": "Had an amazing experience! Everything was well-organized from start to finish. The team was super friendly and made sure we were comfortable throughout the trip. The places we visited were absolutely stunning, and I couldn’t have asked for a better itinerary. I highly recommend their services to anyone looking for a hassle-free and enjoyable experience!"
    },
    {
        "userName": "Sohel Rana",
        "userPhoto": "https://i.ibb.co/kBzSdCc/headshot-attractive-man-smiling-pleased-looking-intrigued-standing-blue-background.jpg",
        "rating": 4.5,
        "reviewText": "The entire journey was fantastic! The accommodations were comfortable, and everything was well-planned. I really appreciated how responsive the team was to our needs and preferences. The only minor issue was that one of the transport arrangements was slightly delayed, but overall, it was a smooth and enjoyable trip. Definitely booking with them again!"
    },
    {
        "userName": "Sajid Hossain",
        "userPhoto": "https://i.ibb.co/TRgj9Q8/portrait-white-man-isolated.jpg",
        "rating": 4,
        "reviewText": "Beautiful locations and friendly guides made this a memorable experience. I loved how well thought out the itinerary was, and the team ensured we got the most out of our trip. The only downside was that some of the food options could have been better, but it didn’t take away from the amazing time I had. Looking forward to another trip soon!"
    },
    {
        "userName": "Mehide Hasan",
        "userPhoto": "https://i.ibb.co/7JwM0xC1/review3.jpg",
        "rating": 5,
        "reviewText": "Everything about this experience was perfect! From the first day to the last, I felt completely taken care of. The team was incredibly professional, and they went above and beyond to ensure we had a great time. The destinations were breathtaking, and I truly enjoyed every moment.Can’t wait for the next one! I will definitely be recommending this to all my friends!"
    },
    {
        "userName": "Samia chowdhury ",
        "userPhoto": "https://i.ibb.co/LddRTT2G/reviewF3.jpg",
        "rating": 4.8,
        "reviewText": "This was one of the best trips I’ve ever had! The guides were so knowledgeable and made sure we got to explore everything in depth. The planning was flawless, and I felt like I got way more than I expected. The scenery was breathtaking, and I loved the little details they put into making the experience special. Can’t wait for the next one!"
    }
]

const Reviews = () => {


    return (
        <div className="text-center mt-10 dark:text-gray-300">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800 items-center dark:text-white" >Customer Reviews & Experiences</h2>
            <p className='mt-2 px-3'>Hear from our happy customers! See what they have to say about our services and exclusive offers.</p>


            {/* carousel */}
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

                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}


                >
                    {
                        demoData.map((review, idx) => <SwiperSlide className='mb-10' key={idx}>
                            <div className="card rounded-md bg-gray-200 w-80 dark:bg-gray-100 relative ">
                                <div className="card-body gap-0.5  text-gray-600 text-center shadow-lg mb-1">

                                    <p>{review.reviewText}</p>
                                    <Rating
                                        initialValue={review.rating}
                                        readonly={true}
                                       className='flex'
                                        size={20}
                                        allowFraction={true}
                                        fillColor='#FFD700'
                                        style={{ color: '#ccc' }}
                                    />
                                    <h3 className='text-lg font-bold'>{review.userName}</h3>
                                    <p >Traveller</p>

                                </div>
                                
                                <figure className='absolute w-16 h-16 rounded-full -bottom-9 left-1/2 -translate-x-1/2 outline '>
                                    <img
                                        className='w-full h-full '
                                        src={review.userPhoto}
                                        alt="Shoes" />
                                </figure>

                            </div>

                        </SwiperSlide>)
                    }
                </Swiper>
            </div>

        </div >
    )
}

export default Reviews
