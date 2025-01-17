import {  createBrowserRouter} from "react-router-dom";
import { RootLayout } from './../Layouts/RootLayout';
import { HomePage } from "../Pages/HomePage";
import { PackageDetails } from "../Pages/PackageDetails";


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
                
            }
        ]
    },
]);
