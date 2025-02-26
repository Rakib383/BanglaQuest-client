import CountUp from "react-countup"
import { BiWorld } from "react-icons/bi"
import { CiFaceSmile } from "react-icons/ci"
import { FaMedal, FaUserTie } from "react-icons/fa"
import { motion } from 'motion/react';

export const Info = () => {
    return (
        <div className="bg-gray-200/60 dark:bg-gray-800 backdrop-blur-md my-12 mt-16 py-5">

            <div className="px-5 flex justify-center sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center  py-4 flex-wrap max-w-2xl lg:max-w-6xl mx-auto">
                <motion.div initial={{ x: -200, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 1.5 }} className="flex items-center border-r-ThirdColor  gap-1 w-fit">
                    <CiFaceSmile className="text-3xl text-ThirdColor dark:text-white" />
                    <div className="font-bold text-PrimaryColor md:text-xl">
                        <CountUp className="text-2xl md:text-3xl" end={37} enableScrollSpy={true} duration={7} delay={3} /><span className="">K+</span>
                        <p className="text-SecondaryColor mr-10 dark:text-lime-600">Satisfied Client</p>
                    </div>

                </motion.div>
                <motion.div initial={{ x: 200, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 1.5 }} className="flex items-center border-r-ThirdColor  gap-1 w-fit">
                    <BiWorld className="text-3xl md:text-4xl text-ThirdColor dark:text-white" />
                    <div className="font-bold text-PrimaryColor md:text-xl">
                        <CountUp className="text-2xl md:text-3xl" end={56} enableScrollSpy={true} duration={5} delay={1} />
                        <span className="">+</span>
                        <p className="text-SecondaryColor mr-2 dark:text-lime-600 ">Destination Covered</p>
                    </div>

                </motion.div>
                <motion.div initial={{ x: -200, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 1.5 }} className="flex items-center  border-r-ThirdColor  gap-1 w-fit">
                    <FaUserTie className="text-3xl text-ThirdColor dark:text-white" />
                    <div className="font-bold text-PrimaryColor md:text-xl">
                        <CountUp className="text-2xl md:text-3xl" end={35} enableScrollSpy={true} duration={5} delay={1} /><span className="">+</span>
                        <p className="text-SecondaryColor mr-3 dark:text-lime-600">Professional Guides</p>
                    </div>

                </motion.div>
                <motion.div initial={{ x: 200, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 1.5 }} className="flex items-center border-r-ThirdColor  gap-1 w-fit">
                    <FaMedal className="text-3xl text-ThirdColor dark:text-white" />
                    <div className="font-bold text-PrimaryColor md:text-xl">
                        <CountUp className="text-2xl md:text-3xl" end={12} enableScrollSpy={true} duration={5} delay={1} /><span className="">+</span>
                        <p className="text-SecondaryColor mr-2 dark:text-lime-600">Years of Experience</p>
                    </div>

                </motion.div>

            </div>
        </div>
    )
}
