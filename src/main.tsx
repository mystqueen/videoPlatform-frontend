import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import SignInPage from "@/pages/SignInPage.tsx";
import SignUpPage from './pages/SignUpPage';
import {Toaster} from "@/components/ui/toaster.tsx";
import OtpVerification from "@/pages/OtpVerificationPage.tsx";
import DashboardPage from "@/pages/DashboardPage.tsx";
import TestPage from "@/pages/TestPage.tsx";
import Error404Page from "@/pages/Error404Page.tsx";
import React from 'react';


const router = createBrowserRouter([
    {
        path: "/",
        element: <SignInPage/>
    },
    {
        path: "/signup",
        element: <SignUpPage/>
    },
    {
        path: "/verify",
        element: <OtpVerification/>
    },
    {
        path: "/dashboard",
        element: <DashboardPage/>,
        errorElement: <Error404Page/>,
    },
    {
        path: "/files",
        element: <DashboardPage/>,
        errorElement: <Error404Page/>
    },
    {
        path: "/customers",
        element: <DashboardPage/>,
        errorElement: <Error404Page/>
    },
    {
        path: "/products",
        element: <DashboardPage/>,
        errorElement: <Error404Page/>
    },
    {
        path: "/analytics",
        element: <DashboardPage/>,
        errorElement: <Error404Page/>
    },
    {
        path: "/settings",
        element: <DashboardPage/>,
        errorElement: <Error404Page/>
    },
    {
        path: "/profile",
        element: <DashboardPage/>,
        errorElement: <Error404Page/>
    },
    {
        path: "/upload",
        element: <DashboardPage/>,
        errorElement: <Error404Page/>
    },
    {
        path: "/test",
        element: <TestPage/>
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
        <Toaster/>
    </React.StrictMode>,
)
