import {  createBrowserRouter} from "react-router-dom";
import { RootLayout } from './../Layouts/RootLayout';
import { HomePage } from "../Pages/HomePage";
import { PackageDetails } from "../Pages/PackageDetails";
import { Community } from "../Pages/Community";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout/>,
        children:[
            {
                path:"",
                element:<HomePage/>
            },
            {
                path:"packages/:id",
                element:<PackageDetails/>,
                
            },
            {
                path:"community",
                element:<Community/>,
                loader:() => fetch("http://localhost:5000/stories")
            },
        ]
    },
]);
