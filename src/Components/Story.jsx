import moment from "moment"
import { FaPencilAlt } from "react-icons/fa"
import { FaLocationDot, FaShare } from "react-icons/fa6"
import { SlCalender } from "react-icons/sl"
import { FacebookShareButton } from "react-share"
import PropTypes from 'prop-types';
import { useContext } from "react"
import { AuthContext } from "../provider/AuthProvider"
import { useNavigate } from "react-router-dom"

export const Story = ({ story, idx }) => {
    const { images, sharedBy, sharedOn, title, location } = story
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    return (
        <div className={`flex flex-col  my-4 gap-4 items-center justify-center ${idx % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"} `} key={sharedBy}>
            <div className="sm:flex-1 h-52 w-9/12 sm:w-auto  sm:h-auto md:h-64">
                <img src={images[0]} className="h-full w-full" alt="" />
            </div>
            <div className="flex-1 flex flex-col items-center justify-center dark:text-gray-300">
                <p className="font-bold text-lg  hover:bg-gradient-to-r from-yellow-600  to-yellow-300 bg-clip-text hover:text-transparent hover:cursor-pointer dark:text-white">{title}</p>
                <div className="flex gap-1 items-center justify-center "> <FaPencilAlt />By {sharedBy} </div>

                <div className="flex gap-1 items-center justify-center "><SlCalender />{moment(new Date(sharedOn)).format("MMMM D, YYYY")}</div>
                <div className="flex items-center gap-1">
                    <FaLocationDot />{location}
                </div>

                {user ? (
                    <FacebookShareButton url={"https://www.facebook.com/"}>
                        <div className="btn mt-3 bg-SecondaryColor hover:bg-green-900 text-white px-3 py-1.5">
                            <FaShare /> Share
                        </div>
                    </FacebookShareButton>
                ) : (
                    <div
                        onClick={() => {
                            navigate("/login");
                        }}
                        className="btn mt-3 bg-SecondaryColor hover:bg-green-900 text-white px-3 py-1.5 cursor-pointer"
                    >
                        <FaShare /> Share
                    </div>
                )}


            </div>
        </div>
    )
}

Story.propTypes = {
    story: PropTypes.object,
    idx: PropTypes.number
}
