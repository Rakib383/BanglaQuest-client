import axios from "axios"
import moment from "moment"
import { useEffect, useState } from "react"
import { FaPencilAlt } from "react-icons/fa"
import { FaShare } from "react-icons/fa6"
import { SlCalender } from "react-icons/sl"
import {
    FacebookShareButton,
} from "react-share";

export const Story = () => {
    const [stories, setStories] = useState([])
    useEffect(() => {
        axios.get('stories.json')
            .then(res => setStories(res.data))
    }, [])


    return (
        <div className="text-center px-5 pt-4">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-800 items-center">The Voyager&apos;s Journal</h1>
            <p className="mt-3 text-gray-600 text-lg md:text-xl flex flex-col text-nowrap items-center">Travel stories that ignite the wanderlust in you.</p>

            <div className="space-y-9 my-5 mt-10 max-w-4xl mx-auto  ">
                {
                    stories.map((story, idx) => <div className={`flex flex-col  my-4 gap-4 items-center ${idx % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"} `} key={story.sharedBy}>
                        <div className="sm:flex-1 h-52 w-9/12 sm:w-auto  sm:h-auto md:h-64">
                            <img src={story.img} className="h-full w-full" alt="" />
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-lg  hover:bg-gradient-to-r from-yellow-600  to-yellow-300 bg-clip-text hover:text-transparent hover:cursor-pointer">{story.title}</p>
                            <div className="flex gap-1 items-center justify-center "> <FaPencilAlt />By {story.sharedBy} </div>
                            <div className="flex gap-1 items-center justify-center "><SlCalender />{moment(story.sharedOn).format("MMMM D,YYYY")}</div>
                            <FacebookShareButton url={"https://www.facebook.com/"} >
                                <button className="btn mt-3 bg-SecondaryColor hover:bg-green-900 text-white px-3 py-1.5 ">
                                  <FaShare/> Share</button>
                            </FacebookShareButton>

                        </div>
                    </div>)
                }
            </div>

        </div>
    )
}
