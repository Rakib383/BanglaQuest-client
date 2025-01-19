import { useQuery } from "@tanstack/react-query"
import { useAxiosSecure } from "../hooks/useAxiosSecure"
import { useContext } from "react"
import { AuthContext } from "../provider/AuthProvider"
import { SlCalender } from "react-icons/sl"
import Swal from "sweetalert2"

export const MyStories = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useContext(AuthContext)

    const { data: myStories, isLoading,refetch } = useQuery({
        queryKey: ['myStories'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allStories/${user.email}`)
            return res.data
        },
        enabled: !!user

    })

    if (isLoading || !user) {
        return <p>Loading...</p>;
    }
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/allStories/${id}`)
                    .then(() => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                        refetch()
                    })

            }
        });


    }

    return (
        <div className=" px-5 mt-6 max-w-4xl mx-auto text-center">

            <h1 className="text-3xl md:text-4xl   items-center mb-10 underline text-PrimaryColor font-fresh">Your Stories</h1>

            {
                myStories.map((story, idx) => <div className={`flex flex-col  my-4 gap-4 items-center justify-center ${idx % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"} `} key={idx}>
                    <div className="sm:flex-1 h-52 w-9/12 sm:w-auto  sm:h-auto md:h-64">
                        <img src={story.images[0]} className="h-full w-full" alt="" />
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <p className="font-bold text-lg  hover:bg-gradient-to-r from-yellow-600  to-yellow-300 bg-clip-text hover:text-transparent hover:cursor-pointer">{story.title}</p>

                        <div className="flex gap-1 items-center justify-center "><SlCalender />Published On: {story.sharedOn}</div>
                        <div className="space-x-2 mt-3">
                            <button className="bg-SecondaryColor text-white rounded-md font-medium px-4 py-2">Edit</button>
                            <button onClick={() => handleDelete(story._id)} className="bg-red-500 text-white rounded-md font-medium px-4 py-2">Delete</button>
                        </div>


                    </div>
                </div>)
            }
        </div>
    )
}
