import { Outlet } from "react-router-dom"
import { Footer } from "../Components/Footer"
import { Navbar } from "../Components/Navbar"
import { ScrollRestoration } from "react-router-dom";


export const RootLayout = () => {
    return (
        <>
        <ScrollRestoration />
            <Navbar />
            <Outlet/>

            <Footer />
        </>
    )
}
