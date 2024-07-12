import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from 'react-router-dom';
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {BASE_URL} from "@/config";
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

const VideoPage: React.FC<{ navigateTo: (page: string, id?: number) => void }> = ({navigateTo}) => {
    const {id} = useParams<{ id: string }>();
    const [currentFile, setCurrentFile] = useState<File | null>(null);
    const [nextFile, setNextFile] = useState<File | null>(null);
    const [previousFile, setPreviousFile] = useState<File | null>(null);
    const [isFilesLoaded, setIsFilesLoaded] = useState(false);
    const [email, setEmail] = useState<string>("");

    const fetchVideoData = async (id: number) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/v1/video/${id}`);
            setCurrentFile(response.data.data.video);
            setNextFile(response.data.data.nextVideo);
            setPreviousFile(response.data.data.previousVideo);
            setIsFilesLoaded(true);
        } catch (error) {
            console.error("Error fetching video data:", error);
            setIsFilesLoaded(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchVideoData(parseInt(id));
        }
    }, [id]);

    const handlePreviousClick = () => {
        setCurrentFile(null);
        if (previousFile) {
            navigateTo("videoPage", previousFile.id);
        }
    };

    const handleNextClick = () => {
        setCurrentFile(null);
        if (nextFile) {
            navigateTo("videoPage", nextFile.id);
        }
    };

    const handleShareClick = () => {
        if (currentFile) {
            axios.post(`${BASE_URL}/api/v1/video/share`, {
                email: email,
                videoUrl: currentFile.url // Use the video URL instead of the page URL
            }).then(() => {
                alert("Video link sent successfully");
            }).catch((error) => {
                console.error("Error sending video link:", error);
                alert("Failed to send video link");
            });
        }
    };

    return (
        <Card>
            <CardHeader className="flex flex-col items-center">
                <img src="@/components/ui/business_logo.png" alt="Business Logo" className="w-16 h-16 mb-2"/>
                <CardTitle>Video Page</CardTitle>
            </CardHeader>
            <CardContent className="overflow-auto h-[400px] flex flex-col items-center">
                {isFilesLoaded ? (
                    <>
                        {currentFile && (
                            <>
                                <div className="mt-4 text-center">
                                    <h2 className="text-lg font-semibold">Title: {currentFile.title}</h2>
                                    <p className="text-sm text-muted-foreground">Description: {currentFile.description}</p>
                                </div>
                                <video controls className="w-full max-w-md">
                                    <source src={currentFile.url} type="video/mp4"/>
                                    Your browser does not support the video tag.
                                </video>
                            </>
                        )}
                        <div className="mt-4 flex gap-2">
                            {previousFile && <Button onClick={handlePreviousClick}>Previous</Button>}
                            {nextFile && <Button onClick={handleNextClick}>Next</Button>}
                        </div>
                        <div className="mt-4 flex flex-col items-center">
                            <Input
                                type="email"
                                placeholder="Enter email to share"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mb-2"
                            />
                            <Button onClick={handleShareClick}>Share</Button>
                        </div>
                    </>
                ) : (
                    <FileCardSkeleton/>
                )}
            </CardContent>
        </Card>
    );
};

export default VideoPage;
