/* eslint-disable react/prop-types */
import '../app.css'
import { useRef, useState } from "react"
import { motion } from "motion/react"
import { Typewriter } from 'react-simple-typewriter'
import projectImg2 from "../assets/Images/bookNest3.png"
import projectImg3 from "../assets/Images/travel-axis1.png"
import contact from "../assets/Images/Contact us-bro.png"
import pic from "../assets/Images/pic10.jpg"
import { FaDownload, FaGithub, FaJs, FaNodeJs, FaPhoneAlt } from 'react-icons/fa'
import { BsTelephoneOutbound } from 'react-icons/bs'
import Marquee from "react-fast-marquee";
import { ImHtmlFive } from 'react-icons/im'
import { IoLogoCss3 } from 'react-icons/io'
import { SiExpress, SiMongodb, SiReactrouter, SiTailwindcss } from 'react-icons/si'
import { RiReactjsFill } from 'react-icons/ri'
import { FaTwitterSquare } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { CgMail } from 'react-icons/cg'
import { FaLocationDot } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2'

const getRandomDelay = () => Math.random() * 2;

const FloatingIcon = ({ children }) => (

    <motion.div
        animate={{
            y: [0, -20, 0], // Moves up and down
        }}
        transition={{
            duration: 2, // Duration of one cycle
            repeat: Infinity, 
            repeatType: "loop",
            repeatDelay: 0,
            ease: "easeInOut",
            delay: getRandomDelay(),
        }}
    >
        {children}
    </motion.div>
);



export const AboutUs = () => {


    
    const [active, setActive] = useState("/");
    const navigate = useNavigate();
    
    const form = useRef();
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
   
    const handleScroll = (e, sectionId) => {
        e.preventDefault();
       
        const section = document.getElementById(sectionId);
        navigate(`#${sectionId}`, { replace: true });
        if (section) {
            section.scrollIntoView({
                behavior: "smooth",
                block: sectionId === "projects" ? "start" : "center"
            });
            setActive(`#${sectionId}`);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault()


        emailjs
            .sendForm('service_dj3em5a', 'template_9hlqjyw', form.current, {
                publicKey: 'JwqtDSiPx5NnA4AMj',
            })
            .then(
                () => {
                    // console.log('SUCCESS!');
                    Swal.fire({
                        title: "Success",
                        text: "Email send successfully",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    e.target.reset()
                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
            );

    }

    return (
        <div >

            {/* banner */}
            <div id='home' className="  pt-28 md:pt-28 dark:text-white px-5 ">
                <div className=' flex  flex-col-reverse  items-center justify-center text-center gap-2 text-lg  md:text-xl px-5 max-w-6xl mx-auto'>
                    {/* text-content */}
                    <motion.div variants={containerVariants} initial="hidden" whileInView="visible" className='  max-w-4xl leading-7  mt-2 '>
                        <p >Hello,I am</p>
                        <motion.div initial={{ opacity: 0, x: 300 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 2 }} className='bg-gradient-to-r from-sky-500 to-sky-300 dark:from-sky-400 dark:to-white font-bold bg-clip-text text-transparent text-2xl md:text-3xl italic'>Rakib Hossen sarkar</motion.div>
                        <h4>I’m a Frontend Web developer.  </h4>
                        <p >I have expertise in building <span className='bg-gradient-to-r dark:from-sky-500 dark:to-white from-sky-500 to-sky-300 font-bold bg-clip-text text-transparent text-xl md:text-2xl'><Typewriter words={["Modern", "Responsive", "User-Friendly"]} cursor cursorStyle='_' loop={0} /> </span>web applications. </p>
                        <p >I focus on delivering clean code and intuitive designs. With a strong desire to learn and grow.</p>
                        <div className='flex justify-center gap-4 mt-5 md:mt-7 pb-10 '>
                            <button onClick={(e) => handleScroll(e, "contact")} className='btn rounded-full hover:bg-[#4BFFA5] hover:text-black transition duration-600 ease-in-out font-bold text-white text-lg border border-[#4BFFA5]'><BsTelephoneOutbound />Contact me</button>
                            <a href='https://drive.google.com/file/d/1TQ-eIDpmfIX72UVAGPvIld--rqvSb_n3/view?usp=sharing' target='_blank' className='btn rounded-full hover:bg-[#4BFFA5] hover:text-black transition duration-600 ease-in-out font-bold text-lg border border-[#4BFFA5] text-white'><FaDownload />My Resume</a>

                        </div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5 }} className="  w-[160px] md:w-[180px] md:h-[180px] h-[160px]     bg-black flex items-center justify-center rounded-full border border-[#4BFFA5] ">
                        <img className="  w-34 md:w-40  h-36 md:h-40  rounded-full" src={pic} alt="" />
                    </motion.div>
                </div>
            </div>

            {/* About Me */}
            <div className='text-center mt-4 px-5' id='about'>
                <h1 className='font-semibold text-sky-400 underline underline-offset-4 underline-  text-2xl md:text-3xl'>About Me</h1>
                <p className='mt-3 max-w-5xl mx-auto'>
                    I am a passionate Front-End Web Developer specializing in building modern, responsive, and user-friendly web applications. My expertise lies in React.js, where I develop interactive UIs using React Router, Firebase authentication, and Tailwind CSS for efficient styling.

                    While my primary focus is front-end development, I also have experience with back-end technologies like Express.js, MongoDB, and JWT authentication, allowing me to work on full-stack applications when needed.

                    Beyond coding, I have a strong passion for cricket, which keeps me active and motivated. I am always eager to learn new technologies, improve my problem-solving skills, and contribute to impactful projects.

                    Let’s build something amazing together!

                </p>
            </div>

            {/* skills */}
            <div className='text-center mt-5' id='skills'>
                <h1 className=' underline underline-offset-4  text-2xl md:text-3xl text-sky-400 font-semibold'>Technical Skills & Expertise</h1>
                <p className='mt-3 md:text-lg px-9'>The technologies and tools I use to build modern, high-performance applications.</p>


                <div className=' dark:bg-gray-900 bg-gray-200'>
                    <div className=' px-6 mx-auto max-w-6xl'>
                        <Marquee autoFill={true} speed={80} pauseOnHover={true} className='mt-8   h-36 md:h-44 '>
                            <div className='flex gap-5 mt-5'>
                                <FloatingIcon>
                                    <ImHtmlFive className="text-orange-600 text-5xl md:text-6xl" />
                                </FloatingIcon>
                                <FloatingIcon>
                                    <IoLogoCss3 className="text-blue-400 text-6xl" />
                                </FloatingIcon>
                                <FloatingIcon>
                                    <SiTailwindcss className="text-sky-400 text-5xl md:text-6xl" />
                                </FloatingIcon>
                                <FloatingIcon>
                                    <FaJs className="text-yellow-500 text-6xl " />
                                </FloatingIcon>
                                <FloatingIcon>
                                    <RiReactjsFill className="text-sky-500 text-5xl md:text-6xl" />
                                </FloatingIcon>
                                <FloatingIcon>
                                    <SiReactrouter className="text-red-500 text-5xl md:text-6xl" />
                                </FloatingIcon>
                                <FloatingIcon>
                                    <FaNodeJs className="text-lime-500 text-5xl md:text-6xl" />
                                </FloatingIcon>
                                <FloatingIcon>
                                    <SiExpress className="dark:text-gray-300 text-gray-500 text-5xl  md:text-6xl" />
                                </FloatingIcon>
                                <FloatingIcon>
                                    <SiMongodb className="text-lime-500 text-5xl md:text-6xl" />
                                </FloatingIcon>
                            </div>
                        </Marquee>
                    </div>
                </div>



            </div>


            {/* My Projects */}
            <div className='mt-7 text-center md:text-lg md:mt-20 ' id='projects'>
                <h3 className='text-3xl font-bold mb-2 text-sky-500 '>Featured Projects</h3>
                <p>A collection of my work showcasing skills in modern web development technologies.</p>
                {/* container */}
                <div className='mt-10 pb-10 md:pb-16 flex flex-col gap-10 justify-center items-center md:flex-row flex-wrap md:gap-16 md:px-7 md:mt-12 max-w-5xl mx-auto'>
                    {/* project 1 */}

                    <div className="card border  dark:bg-white/10   max-w-[340px] sm:max-w-[420px]  shadow-lg">
                        <figure className="p-3 transition ease-in hover:scale-105 ">
                            <img
                                src={projectImg2}
                                alt="Shoes"
                                className="rounded-md h-[220px] sm:h-[260px]" />
                        </figure>
                        <div className="card-body pt-1 px-4 pb-6 items-center text-center">
                            <h3 className='bg-gradient-to-r dark:from-sky-500 dark:to-white/80 from-sky-500 to-sky-300 font-bold bg-clip-text text-transparent text-2xl'>BookNest</h3>
                            <p className='text-start dark:text-gray-300'>BookNest is a web-based application designed for school to streamline the management of its library. The system provides an intuitive platform for handling library operations, ensuring efficient book management and seamless user interaction.</p>
                            <a href='https://booknest-9061c.web.app/' target='_blank' className=' border-2 w-full py-2 mt-1 rounded-md  border-sky-500 hover:bg-sky-400 hover:text-white font-bold'>
                                 Live Site
                            </a>

                        </div>
                    </div>

                      {/* project 2 */}

                    <div className="card border  dark:bg-white/10  max-w-[340px] sm:max-w-[420px] shadow-xl">
                        <figure className="p-3 transition ease-in hover:scale-105 ">
                            <img
                                src={projectImg3}
                                alt="Shoes"
                                className="rounded-md sm:h-[260px]" />
                        </figure>
                        <div className="card-body pt-1 px-4 pb-6 items-center text-center">
                            <h3 className='bg-gradient-to-r dark:from-sky-500 dark:to-white/80 from-sky-500 to-sky-300 font-bold bg-clip-text text-transparent text-2xl'>Travel-Axis</h3>
                            <p className='text-start dark:text-gray-300'> A user-friendly Visa Navigator Portal to simplify the process of
                                checking visa requirements, applying for visas online, and tracking applications.It has a dynamic user interface, robust functionality, and
                                seamless user experience.</p>
                            <a href='https://travel-axis-780d3.web.app/' target='_blank' className=' border-2 w-full py-2 mt-1 rounded-md  border-sky-500 hover:bg-sky-400 hover:text-white font-bold'>
                                Live Site
                            </a>

                        </div>
                    </div>


                </div>
            </div>

            {/* contact */}

            <div id='contact' className='text-center flex gap-5 dark:bg-white/5 bg-gray-100 justify-center items-center px-4 md:px-8'>

                <div className='hidden md:block max-w-md'>
                    <img src={contact} alt="" />
                </div>

                <div className="  flex flex-col items-center justify-center gap-4  py-14 ">
                    <div className='relative '>
                        <h2 className='font-bold secondaryColor text-xl '><span className='dark:text-white'>Let’s</span> Get In Touch.</h2>
                        <div className='w-16 h-16 z-10 bg-[#4BFFA5]/30 absolute -bottom-4 -left-4  rounded-full'></div>
                    </div>
                    <p>Feel free to reach out for any inquiries or collaborations.</p>
                    <div className="card dark:bg-white/5 bg-white w-[330px] md:w-[360px] shrink-0  relative shadow-lg mt-3 ">
                        <form ref={form} onSubmit={handleSubmit} className="card-body px-6 py-6 z-20">
                            <fieldset className="fieldset">
                                <input name='from_name' type="email" className="input h-12 w-full bg-gray-200 dark:bg-gray-700" placeholder="Email" />
                                <textarea rows={3} name='message' className="textarea mt-4 w-full bg-gray-200 dark:bg-gray-700" placeholder="Message"></textarea>
                                <button type='submit' className=" border-2 w-full py-2  rounded-md  border-sky-500 hover:bg-sky-500 hover:text-white font-bold text-base mt-4 cursor-pointer">Send</button>
                            </fieldset>
                        </form>

                    </div>
                </div>

            </div>


            {/* footer */}

            <footer id='footer' className="gap-3 flex flex-col  sm:justify-center  footer-center 
                p-10 max-w-7xl mx-auto text-center pb-5 ">
                <aside>

                    <div>
                        <p className=" text-xl ">Rakib Hossen</p>
                        <div className="flex gap-2 items-center justify-center font-sans"><CgMail className='text-2xl primaryColor ' />rakibhossensarkar1@gmail.com</div>
                        <div className="flex gap-2 mt-1 items-center justify-center font-sans ">
                            <FaPhoneAlt className='primaryColor' />01798879378</div>
                        <div className="flex gap-2 mt-1 items-center justify-center ">
                            <FaLocationDot className='primaryColor' />Dhaka,Bangladesh</div>
                        <div className="flex gap-2 mt-1 items-center justify-center ">Connect with me:
                            <a target="_blank" href="https://www.linkedin.com/in/rakibsarkar" >
                                <FaLinkedin className="hover:text-[#0ea5e9] cursor-pointer text-lg md:text-xl" /></a>
                            <a target="_blank" href="https://github.com/Rakib383" >
                                <FaGithub className="hover:text-[#0ea5e9] cursor-pointer text-lg md:text-xl" /></a>
                            <a target="_blank" href="https://www.facebook.com/rakibhossen.sarkar/"><FaFacebook className=" cursor-pointer text-lg md:text-xl hover:text-[#0ea5e9]" /></a>

                            <a target="_blank" href="https://x.com/rakib_hossen1"><FaTwitterSquare className="hover:text-[#0ea5e9] cursor-pointer text-lg md:text-xl" /></a>  </div>
                        <p></p>
                    </div>

                </aside>
                <p className="  text-white/60">Copyright © {new Date().getFullYear()} - All rights reserved</p>
            </footer>


        </div >
    )
}
