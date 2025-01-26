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
import { Payment } from "../Components/Payment";
import { EditStories } from "../Pages/EditStories";
import { AdminRoute } from "./AdminRoute";
import { Error } from "../Pages/Error";


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
                element: <PrivateRoute> <Community /></PrivateRoute>,
            },
            {
                path: "allTrips",
                element: <PrivateRoute><AllTrips /></PrivateRoute>,
            },
            {
                path: "guideProfiles/:id",
                element: <PrivateRoute><GuideProfile /></PrivateRoute>,
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
            {
                path: "stories/edit/:id",
                element: <EditStories />
            },
            {
                path: "*",
                element: <Error />
            }

        ]
    },
    {
        path: "dashboard",
        element: <PrivateRoute><DashBoardLayout /></PrivateRoute>,
        children: [
            {
                path: "profile",
                element: <PrivateRoute><Profile /></PrivateRoute>
            },
            {
                path: "bookings",
                element: <PrivateRoute><Bookings /></PrivateRoute>
            },
            {
                path: "addStories",
                element: <PrivateRoute><AddStories /></PrivateRoute>
            },
            {
                path: "myStories",
                element: <PrivateRoute> <MyStories /></PrivateRoute>
            },
            {
                path: "apply",
                element: <PrivateRoute><BecomeTourGuide /></PrivateRoute>
            },
            {
                path: "assignedTours",
                element: <PrivateRoute><MyAssignedTours /></PrivateRoute>
            },
            {
                path: "adminProfile",
                element: <AdminRoute><AdminProfile /></AdminRoute>
            },
            {
                path: "addPackage",
                element: <AdminRoute><AddPackage /></AdminRoute>
            },
            {
                path: "manageUsers",
                element: <AdminRoute><ManageUsers /></AdminRoute>
            },
            {
                path: "candidates",
                element: <AdminRoute><Candidates /></AdminRoute>
            },
            {
                path: "payment/:id",
                element: <PrivateRoute><Payment /></PrivateRoute>
            },
            {
                path: "*",
                element: <Error />
            }


        ]
    }
]);
