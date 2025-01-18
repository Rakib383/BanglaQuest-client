import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from './../Layouts/RootLayout';
import { HomePage } from "../Pages/HomePage";
import { PackageDetails } from "../Pages/PackageDetails";
import { Community } from "../Pages/Community";
import { AllTrips } from "../Pages/AllTrips";
import { GuideProfile } from "../Pages/GuideProfile";
import { Login } from "../Pages/Login";
import { Register } from "../Pages/Register";
import { Reset } from "../Pages/Reset";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                path: "",
                element: <HomePage />
            },
            {
                path: "packages/:id",
                element: <PackageDetails />,
                loader: ({ params }) => fetch(`http://localhost:5000/packages/${params.id}`)

            },
            {
                path: "community",
                element: <Community />,
                loader: () => fetch("http://localhost:5000/allStories")
            },
            {
                path: "allTrips",
                element: <AllTrips />,
            },
            {
                path: "guideProfiles/:id",
                element: <GuideProfile />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
            {
                path: "reset",
                element: <Reset />,
            },
        ]
    },
]);
