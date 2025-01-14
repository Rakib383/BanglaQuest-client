import { Outlet } from "react-router-dom"
import { Footer } from "../Components/Footer"
import { Navbar } from "../Components/Navbar"

export const RootLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet/>

            <Footer />
        </>
    )
}
