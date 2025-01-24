import { useContext } from "react"
import { AuthContext } from "../provider/AuthProvider"
import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export const Bookings = () => {

    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()

    const { data: bookings, isLoading, refetch } = useQuery({
        queryKey: ["bookings"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings/${user.email}`);
            return res.data;
        },
        enabled: !!user,
    });

    if (isLoading || !bookings) {
        return <p>Loading...</p>;
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            cancelButtonText: "No,Back",
            confirmButtonText: "Yes, Cancel"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/bookings/${id}`)
                    .then((res) => {
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
                            <th>Tour Guide</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Payment Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            bookings.map((booking, idx) => <tr key={idx}>
                                <th>{idx + 1}</th>
                                <td>{booking.package}</td>
                                <td>{booking.tourGuide}</td>
                                <td>{booking.date}</td>
                                <td>{booking.price}</td>
                                <td>{booking.status}</td>
                                {
                                    booking.status == "pending" ? <>
                                        <td>
                                            <Link to={`/dashboard/payment/${booking._id}`} className="btn bg-SecondaryColor hover:bg-SecondaryColor text-white">Pay</Link>
                                        </td>
                                        <td>
                                            <button onClick={() => handleDelete(booking._id)} className="btn bg-red-600 hover:bg-red-600 text-white">Cancel</button>
                                        </td>
                                    </> : <td>
                                        <button className="btn bg-PrimaryColor hover:bg-PrimaryColor">Paid</button>
                                    </td>
                                }



                            </tr>)
                        }


                    </tbody>
                </table>
            </div>

        </div>
    )
}
