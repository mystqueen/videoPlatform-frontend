import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import SideBar from '@/components/SideBar';
import { authenticate } from '@/utils/authenticate';
import FilesSheet from '@/pages/sheets/FilesSheet';
import UploadSheet from "@/pages/sheets/UploadSheet.tsx";
import VideoPage from '@/pages/sheets/VideoPage';
import Customers from "@/pages/sheets/Customers.tsx";

const DashboardPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams<{ id: string }>();

    const [activeItemId, setActiveItemId] = useState(
        location.pathname === '/' ? 'files' : location.pathname.substring(1).split('/')[0]
    );
    const [currentVideoId, setCurrentVideoId] = useState<number | null>(id ? parseInt(id) : null);

    useEffect(() => {
        if (!authenticate()) {
            navigate('/');
        }
    }, [navigate]);

    const handleSidebarItemClick = useCallback((itemId: string) => {
        setActiveItemId(itemId);
        navigate(`/${itemId}`);
    }, [navigate]);

    const navigateTo = useCallback((page: string, id?: number) => {
        setActiveItemId(page);
        if (page === 'videoPage' && id) {
            setCurrentVideoId(id);
        }
        navigate(`/${page}${id ? `/${id}` : ''}`);
    }, [navigate]);

    const getContent = useCallback(() => {
        switch (activeItemId) {
            case 'files':
                return <FilesSheet navigateTo={navigateTo} />;
            case 'upload':
                return <UploadSheet navigateTo={navigateTo} />;
            case 'videoPage':
                return currentVideoId !== null ? <VideoPage videoId={currentVideoId} navigateTo={navigateTo} /> : <p>No video selected</p>;
            case 'customers':
                return <Customers navigateTo={navigateTo} />;
            case 'deleteUser':
                return <Customers navigateTo={navigateTo} />;
            case 'settings':
                return <p>Settings content will be displayed here</p>;
            case 'profile':
                return <p>Profile content will be displayed here</p>;
            default:
                return <p>Invalid content</p>;
        }
    }, [activeItemId, navigateTo, currentVideoId]);

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <SideBar handleActiveItem={handleSidebarItemClick} />
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <Header pageTitle={activeItemId} />
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    {getContent()}
                </main>
            </div>
        </div>
    );
};

export default DashboardPage;
