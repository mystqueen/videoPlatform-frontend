import React from 'react'
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


const router = createBrowserRouter([
    {
        path: "/",
        element: <SignInPage />,
        // errorElement: <ErrorPage />,
    },
    {
        path: "/signup",
        element: <SignUpPage />,
        // errorElement: <ErrorPage />,
    },
    {
        path: "/verify",
        element: <OtpVerification />,
        // errorElement: <ErrorPage />,
    },
    {
        path: "/dashboard",
        element: <DashboardPage />,
        errorElement: <Error404Page />,
    },
    {
        path: "/test",
        element: <TestPage />,
        // errorElement: <ErrorPage />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
        <Toaster />
    </React.StrictMode>,
)
