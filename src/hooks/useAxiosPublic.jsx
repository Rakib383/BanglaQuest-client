import axios from "axios";

const axiosPublic = axios.create({
    baseURL: "https://bangla-quest-server.vercel.app/"
})

export const useAxiosPublic = () => {
    return axiosPublic
}