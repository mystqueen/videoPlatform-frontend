import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
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

const FilesSheet: React.FC<{ navigateTo: (page: string, id?: number) => void }> = ({ navigateTo }) => {
    const [files, setFiles] = useState<File[]>([]);
    const [isFilesLoaded, setIsFilesLoaded] = useState(false);

    // Retrieve user type from session storage
    const userType = sessionStorage.getItem("user_type");

    const fetchVideos = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/v1/admin/getVideos`);
            if (response.data && Array.isArray(response.data.data)) {
                setFiles(response.data.data);
            } else {
                console.error("Expected array but got", response.data);
            }
            setIsFilesLoaded(true);
        } catch (error) {
            console.error("Error fetching videos:", error);
            setIsFilesLoaded(false);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    return (
        <>
            <div className="flex items-center">
                {userType === 'admin' && (
                    <div className="ml-auto flex items-center gap-2">
                        <Button size="sm" className="h-7 gap-1" onClick={() => navigateTo("upload")}>
                            <Plus className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Upload File</span>
                        </Button>
                    </div>
                )}
            </div>
            <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader className="flex flex-col items-center">
                    <img src="@/components/ui/business_logo.png" alt="Business Logo" className="w-16 h-16 mb-2" />
                    <CardTitle>List Of Videos</CardTitle>
                </CardHeader>
                <CardContent className="overflow-auto h-[400px] flex flex-col items-center">
                    {isFilesLoaded ? (
                        files.length > 0 ? (
                            files.map((file) => (
                                <div key={file.id} className="mb-4">
                                    <h2 className="text-lg font-semibold">{file.title}</h2>
                                    <p className="text-sm text-muted-foreground">{file.description}</p>
                                    <Button onClick={() => navigateTo("videoPage", file.id)}>Watch</Button>
                                </div>
                            ))
                        ) : (
                            <p>No files available.</p>
                        )
                    ) : (
                        <FileCardSkeleton />
                    )}
                </CardContent>
            </Card>
        </>
    );
};

export default FilesSheet;
