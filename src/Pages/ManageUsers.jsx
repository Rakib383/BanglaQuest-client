
import { useAxiosSecure } from "../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import Select from 'react-select'
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import emptyIcon from "../assets/Images/emptyContent.png"

export const ManageUsers = () => {

    const axiosSecure = useAxiosSecure()
    const [searchByEmail, setSearchByEmail] = useState("")
    const [role, setRole] = useState("")
    const [currentUsers, setCurrentUsers] = useState([])
    const [totalCount, setTotalCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)


    const numberOfPages = Math.ceil(totalCount / 10)

    const pages = [...Array(numberOfPages).keys()];
    console.log(pages, currentPage);

    const fetchUsers = async (currentPage = 1, searchByEmail = "", role = "") => {
        const limit = 10;
        const skip = (currentPage - 1) * limit;
        const params = new URLSearchParams();
        params.append("skip", skip);
        params.append("limit", limit);
        if (searchByEmail) {
            params.append("email", searchByEmail);
        }
        if (role) {
            params.append("role", role);
        }

        try {
            const response = await axiosSecure(`/users?${params.toString()}`);

            const data = await response.data;
            return data

        } catch (error) {
            console.error("Error fetching users:", error);
            return { totalCount: 0, items: [] };
        }
    };

    useEffect(() => {
        fetchUsers(currentPage, searchByEmail, role).then(data => {
            setTotalCount(data.totalCount)
            setCurrentUsers(data.users)
        });
    }, [currentPage, searchByEmail, role]);


    const options = [
        { value: '', label: 'All' },
        { value: 'Tourist', label: 'Tourist' },
        { value: 'Tour Guide', label: 'Tour Guide' },
        { value: 'Admin', label: 'Admin' }
    ]

    return (
        <div className="mx-5 dark:text-gray-300">
            <h2 className="text-xl md:text-2xl font-bold text-ThirdColor dark:text-white text-center mb-5">All Users</h2>

            <div className="flex items-center  mx-auto gap-4  justify-center mb-5">
                <input type="text" value={searchByEmail} onChange={(e) => {
                    setSearchByEmail(e.target.value)
                    setCurrentPage(1)
                }} placeholder="Search By Email" className="input input-bordered w-32 sm:w-full h-[37px] bg-white dark:bg-gray-600 dark:text-white outline-1 outline outline-gray-400  max-w-xs" />
                <Select className=" dark:text-black w-36 shrink-0  text-nowrap " onChange={(e) => {
                    setRole(e.value)
                    setCurrentPage(1)
                }} placeholder="Search By Role" options={options} />
            </div>

            <div className="overflow-x-auto">
                <table className="table ">
                    {/* head */}
                    <thead className="dark:text-white text-black">
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

            {
                currentUsers.length === 0 && <div className="flex flex-col items-center justify-center my-10 md:my-20" >
                    <img className="w-28 md:w-36" src={emptyIcon} alt="" />
                    <h4 className="mt-4">No Results Found</h4>
                </div>
            }



            <div className="pagination flex justify-center items-center space-x-2 mt-7">

                <button disabled={currentPage == 1} onClick={() => { setCurrentPage(currentPage - 1) }} className="btn h-10 min-h-10 hover:text-white bg-transparent  dark:text-white dark:hover:border-white   text-black  disabled:text-gray-500 "><FaArrowLeft className="text-lg" /></button>
                <div className="join">
                    {
                        pages.map(page => <button onClick={() => {
                            setCurrentPage(page + 1);

                        }} key={page} className={`join-item btn bg-gray-500  text-white ${currentPage - 1 == page && "selected"}`}>{page + 1}</button>)
                    }

                </div>
                <button disabled={currentPage == pages.length || pages.length == 0} onClick={() => setCurrentPage(currentPage + 1)} className="btn  h-10 min-h-10 hover:text-white bg-transparent    dark:text-white disabled:text-gray-500 text-black  dark:hover:border-white "><FaArrowRight className="text-lg" /></button>
            </div>


        </div>
    )
}
