
import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import Select from 'react-select'


export const ManageUsers = () => {

    const axiosSecure = useAxiosSecure()
    const [search, setSearch] = useState("")
    const [currentUsers, setCurrentUsers] = useState([])
    const [count, setCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)


    const numberOfPages = Math.ceil(count / 10)

    const pages = [...Array(numberOfPages).keys()];

    useEffect(() => {
        axiosSecure.get("/usersCount")
            .then(res => setCount(res.data.count))
    }, [])

    useEffect(() => {
        axiosSecure.get(`/allUsers?page=${currentPage}`)
            .then(res => {
                setCurrentUsers(res.data)
            })
    }, [currentPage, !search])


    const { data: users, isLoading } = useQuery({
        queryKey: ["users", search],
        queryFn: async () => {
            const url = `/users?email=${search}`
            const res = await axiosSecure.get(url)
            setCurrentUsers(res.data)
            return res.data;
        },
        enabled: !!search

    });


    const options = [
        { value: 'Tourist', label: 'Tourist' },
        { value: 'Tour Guide', label: 'Tour Guide' },
        { value: 'Admin', label: 'Admin' }
    ]
    const handleRole = (e) => {
        const value = e.value
        const filteredUser = users.filter(user => user.Role == value)
        setCurrentUsers(filteredUser)
    }

    return (
        <div>
            <h2 className="text-xl md:text-2xl font-bold text-ThirdColor text-center mb-5">All Users</h2>

            <div className="flex items-center gap-4  justify-center mb-5">
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search By Email" className="input input-bordered sm:w-full h-10  max-w-xs" />
                <Select onChange={handleRole} placeholder="Search By Role" options={options} />
            </div>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>

                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>

                        </tr>
                    </thead>
                    <tbody>

                        {
                            currentUsers?.map((user, idx) => <tr key={idx}>
                                <th>{idx + 1}</th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img

                                                    src={user.photoURL}
                                                    alt="image" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{user.name}</div>

                                        </div>
                                    </div>
                                </td>
                                <td>{user.email}</td>
                                <td>{user.Role}</td>



                            </tr>)
                        }


                    </tbody>
                </table>
            </div>



            <div className="pagination flex justify-center space-x-2 mt-7">

                <button disabled={currentPage == 0} onClick={() => { setCurrentPage(currentPage - 1) }} className="btn bg-PrimaryColor ">Prev</button>
                <div className="join">
                    {
                        pages.map(page => <button onClick={() => {
                            setCurrentPage(page);
                            setSearch("")
                        }} key={page} className={`join-item btn hover:bg-ThirdColor hover:text-white ${currentPage == page && "selected"}`}>{page + 1}</button>)
                    }

                </div>
                <button disabled={currentPage == pages.length-1} onClick={() => setCurrentPage(currentPage + 1)} className="btn bg-PrimaryColor ">Next</button>
            </div>


        </div>
    )
}
