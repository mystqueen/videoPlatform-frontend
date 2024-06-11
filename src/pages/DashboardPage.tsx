import Header from "@/components/Header.tsx";
import SideBar from "@/components/SideBar.tsx";
import {authenticate} from "@/utils/authenticate.ts";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import DashboardSheet from "@/pages/sheets/DashboardSheet.tsx";
import FilesSheet from "@/pages/sheets/FilesSheet.tsx";
import ProductsSheet from "@/pages/sheets/ProductsSheet.tsx";


const DashboardPage = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Get current route information

    // State to manage active sidebar item and corresponding content
    const [activeItemId, setActiveItemId] = useState(
        location.pathname === "/" ? "dashboard" : location.pathname.substring(1) // Set initial active item based on route
    );


    useEffect(() => {
        if (!authenticate()) {
            navigate("/");
        }

    }, [navigate]);

    const handleSidebarItemClick = (itemId: string) => {
        setActiveItemId(itemId);
        navigate(`/${itemId}`); // Update route and state simultaneously
    };


    function navigateTo() {
        setActiveItemId("files");
    }

    const getContent = () => {
        switch (activeItemId) {
            case "dashboard":
                return <DashboardSheet navigateTo={navigateTo}/>
            case "files":
                return <FilesSheet/>
            case "products":
                return <ProductsSheet/>
            case "customers":
                return (
                    <p>Customers content will be displayed here</p>
                );
            case "analytics":
                return (
                    <p>Analytics content will be displayed here</p>
                );
            case "settings":
                return (
                    <p>Settings content will be displayed here</p>
                );
            case "profile":
                return (
                    <p>Profile content will be displayed here</p>
                );
            default:
                return <p>Invalid content</p>;
        }
    };


    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <SideBar handleActiveItem={handleSidebarItemClick}/>
            {/**/}
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <Header pageTitle={activeItemId}/>
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    {getContent()}
                </main>
            </div>
        </div>
    )
}
export default DashboardPage;