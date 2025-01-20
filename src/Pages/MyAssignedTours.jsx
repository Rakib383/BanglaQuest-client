import { useContext } from "react"
import { AuthContext } from "../provider/AuthProvider"
import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";

export const MyAssignedTours = () => {

    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()

    const { data: assignedTours, isLoading, refetch } = useQuery({
        queryKey: ["assignedTours"],
        queryFn: async () => {
            const result = await axiosSecure.get(`/allTourGuides/${user.email}`)
            const tourGuideInfo = result.data
            const res = await axiosSecure.get(`/assignedTours/${tourGuideInfo._id}`);
            return res.data;
        },
        enabled: !!user,
    });

    if (isLoading || !user) {
        return <p>Loading...</p>;
    }

    const handleAccept = (id) => {
        axiosSecure.patch(`/bookings/${id}`, { status: "Accepted" })
            .then(() => {

                Swal.fire({
                    title: "Accepted",
                    icon: "success"
                });
                refetch()

            })


    }
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Reject"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/bookings/${id}`, { status: "Rejected" })
                    .then(() => {

                        Swal.fire({
                            title: "Rejected!",
                            icon: "success"
                        });
                        refetch()

                    })

            }
        });

    }

    return (
        <div>
            <h2 className="text-xl md:text-2xl font-bold text-ThirdColor text-center mb-5">My Booking History</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Package Name</th>
                            <th>Tourist Name</th>
                            <th>Tour Date</th>
                            <th>Tour Price</th>
                            <th>Status</th>
                            <th>Action</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            assignedTours.map((tours, idx) => <tr key={idx}>
                                <th>{idx + 1}</th>
                                <td>{tours.package}</td>
                                <td>{tours.name}</td>
                                <td>{tours.date}</td>
                                <td>{tours.price}</td>
                                <td className={` font-bold ${tours.status == "In Review" && "bg-blue-400"} ${tours.status == "Rejected" && "bg-red-500"} ${tours.status == "pending" && "bg-PrimaryColor"} ${tours.status == "Accepted" && "bg-SecondaryColor"}`}>{tours.status}</td>
                                {
                                    tours.status == "pending" && <>
                                        <td>
                                            <button disabled className="btn bg-SecondaryColor hover:bg-SecondaryColor text-white">Accept</button>
                                        </td>
                                        <td>
                                            <button disabled className="btn bg-red-600 hover:bg-red-600 text-white">Reject</button>
                                        </td>
                                    </>
                                }
                                {
                                    tours.status == "In Review" && <>
                                        <td>
                                            <button onClick={() => handleAccept(tours._id)} className="btn bg-SecondaryColor hover:bg-SecondaryColor text-white">Accept</button>
                                        </td>
                                        <td>
                                            <button onClick={() => handleDelete(tours._id)} className="btn bg-red-600 hover:bg-red-600 text-white">Reject</button>
                                        </td>
                                    </>
                                }



                            </tr>)
                        }


                    </tbody>
                </table>
            </div>

        </div>
    )
}
