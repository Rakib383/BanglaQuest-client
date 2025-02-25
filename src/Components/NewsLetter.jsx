import natural from "../assets/Images/natural2.jpg"
export const NewsLetter = () => {
    return (
        <div className="w-11/12 max-w-6xl h-[300px] md:h-[360px] relative mx-auto rounded-2xl mb-5  mt-24" style={{
            backgroundImage: `url(${natural})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
           
        }}>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-96  rounded-lg bg-white/40 backdrop-blur-md px-6 py-3.5 md:py-7 text-center">
                <h3 className="text-PrimaryColor text-lg md:text-xl">Stay Updated with Our Newsletters</h3>
                <p className="text-sm md:text-base dark:text-black  my-1">Get the latest updates, exclusive offers, and travel inspiration directly to your inbox!</p>
                <div className="mt-3 space-y-3 md:space-y-0 md:mt-5 md:flex gap-3 items-center ">
                    <input type="email" placeholder="Write Your Email" className="input input-bordered bg-white dark:text-white dark:bg-gray-800 w-full max-w-xs" />
                    <div className="btn  hover:bg-[#466948] bg-SecondaryColor text-white">Subscribe</div>

                </div>
            </div>
        </div>
    )
}
