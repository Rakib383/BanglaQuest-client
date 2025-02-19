import { useContext } from "react"
import { AuthContext } from "../provider/AuthProvider"
import { Navigate, useLocation } from "react-router-dom"
import { Loading } from "../Components/Loding"

export const PrivateRoute = ({children}) => {
    const {user,loading} = useContext(AuthContext)
    const location = useLocation()

    if(loading) {
        return <Loading/>
    }
    if(user) {
        return children
    }
    return <Navigate to="/login" state={location.pathname} replace/>
}
