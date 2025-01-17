import { motion } from 'motion/react';

export const Overview = () => {

    return (
        <section className="bg-white py-16 px-6 ">
            <div className="max-w-7xl mx-auto text-center  place-items-center ">
                <div className="text-3xl md:text-5xl font-bold text-gray-800 flex flex-col sm:flex-row gap-2 items-center">
                    <div className="-rotate-6  z-20 relative py-2">
                        <span className="z-20 bg-transparent text-white   px-2 ">Discover </span>
                        <div className="w-full  h-full -z-10 bg-SecondaryColor  absolute top-0 left-0">
                        </div>
                    </div>
                    <span> the Wonders of Bangladesh</span>

                </div>
                <p className="mt-4 text-gray-600 text-lg md:text-xl">
                    Explore breathtaking beaches, majestic mountains, and vibrant culture with <span className=" bg-gradient-to-r from-white to-PrimaryColor text-xl md:text-2xl ">BanglaQuest.</span>
                </p>
                <motion.div initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: "easeOut" }} className="mt-8 w-full sm:w-[600px] md:w-[700px]  h-[300px] sm:h-[370px] md:h-[400px]">
                    <iframe className="w-full h-full" src="https://www.youtube.com/embed/_e_hEWZP8mU?si=9RBZ8ptAc_CTEIkc" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                </motion.div>
            </div>
        </section>

    )
}
