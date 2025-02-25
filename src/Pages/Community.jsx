
import { Story } from "../Components/Story"
import { useAxiosSecure } from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


export const Community = () => {

    const axiosSecure = useAxiosSecure()

    const { data: stories, isLoading } = useQuery({
        queryKey: ["stories"],
        queryFn: async () => {
            const res = await axiosSecure.get('/allStories');
            return res.data;
        },
        
    });

    if (isLoading || !stories) {
        return <p>Loading...</p>;
    }

    return (
        <div className="pt-28 px-5 max-w-4xl mx-auto text-center">

            <h1 className="text-2xl md:text-4xl font-bold text-gray-800 items-center mt-5 dark:text-white">The Voyager&apos;s Journal</h1>
            <p className="mt-3 text-gray-600 dark:text-gray-300 text-lg md:text-xl flex flex-col text-nowrap items-center mb-6 md:mb-10">Travel stories that ignite the wanderlust in you.</p>
            {
                stories.map((story, idx) => <Story key={idx} idx={idx} story={story} />)
            }
        </div>
    )
}
