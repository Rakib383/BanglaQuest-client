

import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import emptyIcon from "../assets/Images/emptyContent.png"

export const Candidates = () => {

    const axiosSecure = useAxiosSecure()
    const [count, setCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)



    const numberOfPages = Math.ceil(count / 10)

    const pages = [...Array(numberOfPages).keys()];

    const { data: guideApplications, isLoading, refetch } = useQuery({
        queryKey: ["guideApplications", currentPage],
        queryFn: async () => {
            const result = await axiosSecure.get(`/guideApplications?page=${currentPage}`)

            return result.data
        },
    });

    useEffect(() => {
        axiosSecure.get("/countCandidate")
            .then(res => setCount(res.data.count))
    }, [])

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
            <h2 className="text-xl md:text-2xl font-bold text-ThirdColor text-center mb-5 dark:text-white">Tour Guide Applications</h2>

            <div className="overflow-x-auto">
                <table className="table dark:table-zebra">
                    {/* head */}
                    <thead className="dark:text-white text-ThirdColor">
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

             {
                            guideApplications.length === 0 && <div className="flex flex-col items-center justify-center my-10 md:my-20" >
                                <img className="w-28 md:w-36" src={emptyIcon} alt="" />
                                <h4 className="mt-4">No Results Found</h4>
                            </div>
                        }

            <div className="pagination flex justify-center space-x-2 mt-7">

                <button disabled={currentPage == 0} onClick={() => { setCurrentPage(currentPage - 1) }} className="btn bg-PrimaryColor disabled:text-gray-500">Prev</button>
                <div className="join">
                    {
                        pages.map(page => <button onClick={() => {
                            setCurrentPage(page);
                        }} key={page} className={`join-item btn hover:bg-ThirdColor hover:text-white ${currentPage == page && "selected"}`}>{page + 1}</button>)
                    }

                </div>
                <button disabled={currentPage === pages.length-1 || pages.length === 0} onClick={() => setCurrentPage(currentPage + 1)} className="btn bg-PrimaryColor disabled:text-gray-500 ">Next</button>
            </div>

        </div>
    )
}
