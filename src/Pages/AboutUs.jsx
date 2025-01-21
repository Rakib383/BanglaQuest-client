import { Typewriter } from 'react-simple-typewriter'
import { motion } from 'motion/react';
import projectImg1 from "../assets/Images/bookNest3.png"
import projectImg2 from "../assets/Images/travel-axis1.png"
import projectImg3 from "../assets/Images/banglaQuest1.png"

export const AboutUs = () => {


    const containerVariants = {
        hidden: { opacity: 0, y: 100 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 1.5,
            }
        }
    }

    return (
        <div className="bg-[#0C1323]  pt-32 md:pt-44 text-white px-5 ">
            <div className=' flex  flex-col-reverse md:flex-row items-center justify-center lg:justify-start gap-2 lg:gap-12 text-lg  md:text-xl px-5 max-w-6xl mx-auto'>
                <motion.div variants={containerVariants} initial="hidden" whileInView="visible" className='md:mt-16 self-end  max-w-4xl leading-7 md:leading-8 md:w-3/5'>
                    <p >Hello,My Name Is</p>
                    <motion.div initial={{ opacity: 0, x: 300 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 2 }} className='bg-gradient-to-r from-sky-400 to-white font-bold bg-clip-text text-transparent text-2xl md:text-3xl italic'>Rakib Hossen</motion.div>
                    <h4>I’m a junior web developer.  </h4>
                    <p >I have expertise in building <span className='bg-gradient-to-r from-sky-500 to-white font-bold bg-clip-text text-transparent text-xl md:text-2xl'><Typewriter words={["Modern", "Responsive", "User-Friendly"]} cursor cursorStyle='_' loop={0} /> </span>web applications. </p>
                    <p >I focus on delivering clean code and intuitive designs. With a strong desire to learn and grow.</p>

                </motion.div>
                <motion.div initial={{opacity:0,scale:0}}  whileInView={{opacity:1,scale:1}} transition={{duration:1.5}} className=" lg:w-[300px] lg:h-[300px] w-[180px] h-[180px] md:w-[210px] md:h-[210px] md:self-center  bg-black/15 flex items-center justify-center rounded-full ">
                    <img className=" lg:w-52 lg:h-52 w-36 md:w-40 md:h-40 h-36  rounded-full" src="https://i.ibb.co/SXkr1wL/myImage2.png" alt="" />
                </motion.div>
            </div>

            {/* My Projects */}
            <div className='mt-7 text-center md:text-lg md:mt-20 '>
                <h3 className='text-3xl font-bold mb-2 text-sky-500 '>Featured Projects</h3>
                <p>A collection of my work showcasing skills in modern web development technologies.</p>
                {/* container */}
                <div className='mt-10 pb-10 md:pb-16 flex flex-col gap-10 justify-center items-center md:flex-row flex-wrap md:gap-16 md:px-7 md:mt-12 max-w-5xl mx-auto'>

                    <div className="card border  bg-white/10  max-w-[340px] sm:max-w-[420px]  shadow-xl">
                        <figure className="p-3 transition ease-in hover:scale-105">
                            <img
                                src={projectImg1}
                                alt="Shoes"
                                className="rounded-md" />
                        </figure>
                        <div className="card-body pt-1 px-4 pb-6 items-center text-center">
                            <h3 className='bg-gradient-to-r from-sky-500 to-white/80 font-bold bg-clip-text text-transparent text-2xl'>BookNest</h3>
                            <p className='text-start text-gray-300'>BookNest is a web-based application designed for school to streamline the management of its library. The system provides an intuitive platform for handling library operations, ensuring efficient book management and seamless user interaction.</p>
                            <a href='https://booknest-9061c.web.app/' target='_blank' className=' border-2 w-full py-2 mt-1 rounded-md  border-sky-500 hover:bg-sky-400 hover:text-white font-bold'>
                                See Project
                            </a>

                        </div>
                    </div>

                    <div className="card border  bg-white/10  max-w-[340px] sm:max-w-[420px] shadow-xl">
                        <figure className="p-3 transition ease-in hover:scale-105 ">
                            <img
                                src={projectImg2}
                                alt="Shoes"
                                className="rounded-md" />
                        </figure>
                        <div className="card-body pt-1 px-4 pb-6 items-center text-center">
                            <h3 className='bg-gradient-to-r from-sky-500 to-white/80 font-bold bg-clip-text text-transparent text-2xl'>Travel-Axis</h3>
                            <p className='text-start text-gray-300'> A user-friendly Visa Navigator Portal to simplify the process of
                                checking visa requirements, applying for visas online, and tracking applications.It has a dynamic user interface, robust functionality, and
                                seamless user experience.</p>
                            <a href='https://travel-axis-780d3.web.app/' target='_blank' className=' border-2 w-full py-2 mt-1 rounded-md  border-sky-500 hover:bg-sky-400 hover:text-white font-bold'>
                                See Project
                            </a>

                        </div>
                    </div>
                    <div className="card border  bg-white/10  max-w-[340px] sm:max-w-[420px] shadow-xl">
                        <figure className="p-3 transition ease-in hover:scale-105 ">
                            <img
                                src={projectImg3}
                                alt="Shoes"
                                className="rounded-md" />
                        </figure>
                        <div className="card-body pt-1 px-4 pb-6 items-center text-center">
                            <h3 className='bg-gradient-to-r from-sky-500 to-white/80 font-bold bg-clip-text text-transparent text-2xl'>BanglaQuest</h3>
                            <p className='text-start text-gray-300'> A user-friendly Visa Navigator Portal to simplify the process of
                                checking visa requirements, applying for visas online, and tracking applications.It has a dynamic user interface, robust functionality, and
                                seamless user experience.</p>
                            <a href='https://banglaquest-13b4d.web.app/' target='_blank' className=' border-2 w-full py-2 mt-1 rounded-md  border-sky-500 hover:bg-sky-400 hover:text-white font-bold'>
                                See Project
                            </a>

                        </div>
                    </div>

                </div>
            </div>


        </div>
    )
}
