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
        element: <SignInPage />
    },
    {
        path: "/signup",
        element: <SignUpPage />
    },
    {
        path: "/verify",
        element: <OtpVerification />
    },
    {
        path: "/dashboard",
        element: <DashboardPage activePageId="dashboard"/>,
        errorElement: <Error404Page />,
    },
    {
        path: "/orders",
        element: <DashboardPage activePageId="orders" />
    },
    {
        path: "/customers",
        element: <DashboardPage activePageId="customers" />
    },
    {
        path: "/products",
        element: <DashboardPage activePageId="products" />
    },
    {
        path: "/analytics",
        element: <DashboardPage activePageId="analytics" />
    },
    {
        path: "/settings",
        element: <DashboardPage activePageId="settings" />
    },
    {
        path: "/profile",
        element: <DashboardPage activePageId="profile" />
    },
    {
        path: "/test",
        element: <TestPage />
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
        <Toaster />
    </React.StrictMode>,
)
