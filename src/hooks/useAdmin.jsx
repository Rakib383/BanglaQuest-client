import { useContext } from "react"
import { useAxiosSecure } from "./useAxiosSecure"
import { AuthContext } from "../provider/AuthProvider"
import { useQuery } from "@tanstack/react-query"

export const useAdmin = () => {

    const {user} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const { data: isAdmin, isLoading:isAdminLoading } = useQuery({
        queryKey: [user.email,"isAdmin"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${user.email}`)
            return res.data?.admin
    
        },
        enabled: !!user
    
    })
    return [isAdmin,isAdminLoading]
}
