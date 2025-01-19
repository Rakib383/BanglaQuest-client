import { useContext } from "react"
import { AuthContext } from "../provider/AuthProvider"
import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "../hooks/useAxiosSecure";

export const Bookings = () => {

    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()

    const { data: bookings, isLoading } = useQuery({
        queryKey: ["bookings"],
        queryFn: async () => {
            const res = await axiosSecure.get('/bookings');
            return res.data;
        },
        enabled: !!user,
    });

    if (isLoading || !bookings) {
        return <p>Loading...</p>;
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
                                            <button className="btn bg-SecondaryColor hover:bg-SecondaryColor text-white">Pay</button>
                                        </td>
                                        <td>
                                            <button className="btn bg-red-600 hover:bg-red-600 text-white">Cancel</button>
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
