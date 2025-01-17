import { useLoaderData } from "react-router-dom"

import { Story } from "../Components/Story"


export const Community = () => {

    const stories = useLoaderData()

    return (
        <div className="pt-28 px-5 max-w-4xl mx-auto text-center">

            <h1 className="text-2xl md:text-4xl font-bold text-gray-800 items-center mt-5">The Voyager&apos;s Journal</h1>
            <p className="mt-3 text-gray-600 text-lg md:text-xl flex flex-col text-nowrap items-center">Travel stories that ignite the wanderlust in you.</p>
            {
                stories.map((story, idx) => <Story key={idx} idx={idx} story={story} />)
            }
        </div>
    )
}
