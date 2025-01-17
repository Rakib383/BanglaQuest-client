import axios from "axios"
import { useEffect, useState } from "react"
import { Story } from "./Story"

export const Stories = () => {
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
                    stories.slice(0,4).map((story, idx) => <Story key={idx} story={story} idx={idx}/>
                   )
                }
            </div>

        </div>
    )
}
