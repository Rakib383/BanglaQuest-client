
import { Story } from "./Story"
import { useQuery } from "@tanstack/react-query"
import { useAxiosPublic } from "../hooks/useAxiosPublic"
import { Link } from "react-router-dom"

export const Stories = () => {

    const axiosPublic = useAxiosPublic()
    const { data: stories = [] } = useQuery({
        queryKey: ['stories'],
        queryFn: async () => {
            const res = await axiosPublic.get('/stories')
            return res.data
        }
    })


    return (
        <div className="text-center px-5 pt-4">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-800 dark:text-white items-center">The Voyager&apos;s Journal</h1>
            <p className="mt-3 text-gray-600 dark:text-gray-400 text-lg md:text-xl flex flex-col text-nowrap items-center">Travel stories that ignite the wanderlust in you.</p>

            <div className="space-y-9 my-5 mt-10 max-w-4xl mx-auto  ">
                {
                    stories.map((story, idx) => <Story key={idx} story={story} idx={idx} />
                    )
                }
            </div>


            <div className="space-x-5 mt-8 md:mt-12">
                <Link to="/community" className="btn  mt-3 bg-SecondaryColor hover:bg-green-900 text-white px-3 py-1.5">All Stories</Link>
                <Link to="/dashboard/addStories" className="btn  mt-3 bg-SecondaryColor hover:bg-green-900 text-white px-3 py-1.5">Add Stories</Link>
            </div>
        </div>
    )
}
