import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { BASE_URL } from "@/config";
import FileCardSkeleton from "@/components/FileCardSkeleton.tsx";


interface File {
    id: number;
    title: string;
    description: string;
    size: number;
    type: string;
    url: string;
    createdAt: Date;
    updatedAt: Date;
    // Add any other properties specific to your File object
}
const FilesSheet: React.FC<{ navigateTo: (page: string) => void }> = ({ navigateTo }) => {
    const [currentFile, setCurrentFile] = useState<File | null>(null);
    const [nextFile, setNextFile] = useState<File | null>(null);
    const [previousFile, setPreviousFile] = useState<File | null>(null);
    const [isFilesLoaded, setIsFilesLoaded] = useState(false);
    const [currentFileId, setCurrentFileId] = useState(1); // Starting with the first video ID

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
        fetchVideoData(currentFileId);
    }, [currentFileId]);

    const handlePreviousClick = () => {
        if (previousFile) {
            setCurrentFileId(previousFile.id);
        }
    };

    const handleNextClick = () => {
        if (nextFile) {
            setCurrentFileId(nextFile.id);
        }
    };

    const handleShareClick = () => {
        if (currentFile){
            const shareData = {
                title: currentFile.title,
                text: `Check out this video: ${currentFile.title}`,
                url: window.location.href, // Assuming this URL points to the video page
            };
            if (navigator.share) {
                navigator.share(shareData).catch(console.error);
            } else {
                console.log("Web Share API is not supported in this browser.");
            }
        }
    };

    return (
        <>
            <div className="flex items-center">
                <div className="ml-auto flex items-center gap-2">
                    <Button size="sm" className="h-7 gap-1" onClick={() => navigateTo("upload")}>
                        <Plus className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Upload File</span>
                    </Button>
                </div>
            </div>
            <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                    <CardTitle>
                        <img src="C:\Users\DELL\Documents\Projects\Video Platform\src\main\resources\static\img" alt="Business Logo" className="w-16 h-16 inline-block mr-2" />
                        Video Page
                    </CardTitle>
                </CardHeader>
                <CardContent className="overflow-auto h-[400px] flex flex-col items-center">
                    {isFilesLoaded ? (
                        <>
                            <video controls className="w-full max-w-md">
                                <source src={currentFile.url} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                            <div className="mt-4 text-center">
                                <h2 className="text-lg font-semibold">{currentFile.title}</h2>
                                <p className="text-sm text-muted-foreground">{currentFile.description}</p>
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
        </>
    );
};
export default FilesSheet;
