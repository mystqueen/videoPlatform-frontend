import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BASE_URL } from "@/config";
import FileCardSkeleton from "@/components/FileCardSkeleton";

interface File {
    id: number;
    title: string;
    description: string;
    size: number;
    type: string;
    url: string;
    createdAt: Date;
    updatedAt: Date;
}

const VideoPage: React.FC<{ videoId: number, navigateTo: (page: string) => void }> = ({ videoId, navigateTo }) => {
    const [currentFile, setCurrentFile] = useState<File | null>(null);
    const [nextFile, setNextFile] = useState<File | null>(null);
    const [previousFile, setPreviousFile] = useState<File | null>(null);
    const [isFilesLoaded, setIsFilesLoaded] = useState(false);

    const fetchVideoData = async (id: number) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/v1/video/${id}`);
            setCurrentFile(response.data.video);
            setNextFile(response.data.nextVideo);
            setPreviousFile(response.data.previousVideo);
            setIsFilesLoaded(true);
        } catch (error) {
            console.error("Error fetching video data:", error);
            setIsFilesLoaded(false);
        }
    };

    useEffect(() => {
        fetchVideoData(videoId);
    }, [videoId]);

    const handlePreviousClick = () => {
        if (previousFile) {
            navigateTo("videoPage", previousFile.id);
        }
    };

    const handleNextClick = () => {
        if (nextFile) {
            navigateTo("videoPage", nextFile.id);
        }
    };

    const handleShareClick = () => {
        if (currentFile){
            const shareData = {
                title: currentFile.title,
                text: `Check out this video: ${currentFile.title}`,
                url: window.location.href,
            };
            if (navigator.share) {
                navigator.share(shareData).catch(console.error);
            } else {
                console.log("Web Share API is not supported in this browser.");
            }
        }
    };

    return (
        <Card x-chunk="video-page-chunk-0">
            <CardHeader>
                <CardTitle>Video Page</CardTitle>
            </CardHeader>
            <CardContent className="overflow-auto h-[400px] flex flex-col items-center">
                {isFilesLoaded ? (
                    <>
                        <video controls className="w-full max-w-md">
                            <source src={currentFile?.url} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <div className="mt-4 text-center">
                            <h2 className="text-lg font-semibold">{currentFile?.title}</h2>
                            <p className="text-sm text-muted-foreground">{currentFile?.description}</p>
                        </div>
                        <div className="mt-4 flex gap-2">
                            {previousFile && <Button onClick={handlePreviousClick}>Previous</Button>}
                            {nextFile && <Button onClick={handleNextClick}>Next</Button>}
                            <Button onClick={handleShareClick}>Share</Button>
                        </div>
                    </>
                ) : (
                    <FileCardSkeleton />
                )}
            </CardContent>
        </Card>
    );
};

export default VideoPage;
