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
import { PrivateRoute } from "./PrivateRoute";
import { DashBoardLayout } from "../Layouts/DashBoardLayout";
import { Profile } from "../Pages/Profile";
import { Bookings } from "../Pages/Bookings";
import { AddStories } from "../Pages/AddStories";
import { MyStories } from "../Pages/MyStories";
import { BecomeTourGuide } from "../Pages/BecomeTourGuide";
import { MyAssignedTours } from "../Pages/MyAssignedTours";
import { AdminProfile } from "../Pages/AdminProfile";
import { AddPackage } from "../Pages/AddPackage";
import { ManageUsers } from "../Pages/ManageUsers";
import { Candidates } from "../Pages/Candidates";
import { AboutUs } from "../Pages/AboutUs";


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
                element: <PrivateRoute><PackageDetails /></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/allPackages/${params.id}`)

            },
            {
                path: "community",
                element: <Community />,
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
            {
                path: "about",
                element: <AboutUs />,
            },
        ]
    },
    {
        path: "dashboard",
        element: <DashBoardLayout />,
        children: [
            {
                path: "profile",
                element: <Profile />
            },
            {
                path: "bookings",
                element: <Bookings />
            },
            {
                path: "addStories",
                element: <AddStories />
            },
            {
                path: "myStories",
                element: <MyStories />
            },
            {
                path: "apply",
                element: <BecomeTourGuide />
            },
            {
                path: "assignedTours",
                element: <MyAssignedTours />
            },
            {
                path: "adminProfile",
                element: <AdminProfile />
            },
            {
                path: "addPackage",
                element: <AddPackage />
            },
            {
                path: "manageUsers",
                element: <ManageUsers />
            },
            {
                path: "candidates",
                element: <Candidates/>
            },

        ]
    }
]);
