import { useContext } from "react"
import { AuthContext } from "../provider/AuthProvider"
import { useNavigate } from "react-router-dom"
import axios from "axios"


const axiosSecure = axios.create({
    baseURL: "https://bangla-quest-server.vercel.app/"
})
export const useAxiosSecure = () => {
    const { logOut } = useContext(AuthContext)
    const navigate = useNavigate()

    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        config.headers.authorization = `Bearer ${token}`
        return config
    }, function (error) {
        return Promise.reject(error)
    })

    axiosSecure.interceptors.response.use(function (response) {
        return response
    }, async function (error) {
        const status = error.response.status
        if (status === 401 || status === 403) {
            await logOut()
            navigate("/login")
        }
        return Promise.reject(error)
    })
    return axiosSecure
}
