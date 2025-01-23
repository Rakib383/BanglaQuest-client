

import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";

export const Candidates = () => {

    const axiosSecure = useAxiosSecure()

    const { data: guideApplications, isLoading, refetch } = useQuery({
        queryKey: ["guideApplications"],
        queryFn: async () => {
            const result = await axiosSecure.get('/guideApplications')

            return result.data
        },
    });

    if (isLoading) {
        return <p>Loading...</p>;
    }

    const handleAccept = (email, applicant) => {
        const updateInfo = {
            Role: "Tour Guide",
            description: applicant.description,
            expertise: applicant.expertise,
            experience: applicant.experience,
            CV_Link: applicant.CV_Link
        }
        axiosSecure.patch(`/allUsers/${email}`, updateInfo)
            .then(() => {
                axiosSecure.delete(`/guideApplications/${email}`)
                    .then(() => {
                        Swal.fire({
                            title: "Successfully Done",
                            icon: "success"
                        });
                        refetch()

                    })
            })


    }
    const handleDelete = (email) => {
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
                axiosSecure.delete(`/guideApplications/${email}`)
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
            <h2 className="text-xl md:text-2xl font-bold text-ThirdColor text-center mb-5">Tour Guide Applications</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>

                            <th>Candidate's Name</th>
                            <th>Candidate's Email</th>
                            <th>Apply Date</th>
                            <th>CV</th>
                            <th>Current Role</th>
                            <th>Action</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            guideApplications.map((applicant, idx) => <tr key={idx}>
                                <th>{idx + 1}</th>
                                <td>{applicant.name}</td>
                                <td>{applicant.email}</td>
                                <td>{applicant.appliedDate}</td>
                                <td>{applicant.CV_Link}</td>
                                <td>{applicant.Role}</td>
                                <td>
                                    <button onClick={() => handleAccept(applicant.email, applicant)} className="btn bg-SecondaryColor hover:bg-SecondaryColor text-white">Accept</button>
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(applicant.email)} className="btn bg-red-600 hover:bg-red-600 text-white">Reject</button>
                                </td>

                            </tr>)
                        }


                    </tbody>
                </table>
            </div>

        </div>
    )
}
