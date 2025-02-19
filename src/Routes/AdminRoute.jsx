
import { Navigate, useLocation } from "react-router-dom"
import { useAdmin } from "../hooks/useAdmin"
import { useContext } from "react"
import { AuthContext } from "../provider/AuthProvider"
import { Loading } from "../Components/Loding"

export const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const [isAdmin, isAdminLoading] = useAdmin()
    const location = useLocation()

    if (loading || isAdminLoading) {
        return <Loading/>
    }
    if (user && isAdmin) {
        return children
    }

    return <Navigate to="/" state={location.pathname} replace></Navigate>
}
