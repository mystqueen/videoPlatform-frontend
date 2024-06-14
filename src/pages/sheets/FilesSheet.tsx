import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ListFilter, Plus, Search } from "lucide-react";
import FileCard from "@/components/FileCard";
import FileCardSkeleton from "@/components/FileCardSkeleton";
import getIconUrl from "@/utils/icons";
import { BASE_URL } from "@/config";

const FilesSheet = () => {
    const [sizeFilter, setSizeFilter] = useState(false);
    const [dateFilter, setDateFilter] = useState(false);
    const [files, setFiles] = useState([]);
    const [isFilesLoaded, setIsFilesLoaded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const axiosInstance = axios.create({
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${sessionStorage.getItem("token")}`
                },
            });

            try {
                const response = await axiosInstance.get(`${BASE_URL}/admin/files`);
                setFiles(response.data.data);
                setIsFilesLoaded(true);
            } catch (error) {
                setIsFilesLoaded(true);
                console.error("Error fetching files:", error);
            }
        };

        fetchData();
    }, []);

    const handleFilterClick = (filterOption: string) => {
        setSizeFilter(filterOption === "size" ? !sizeFilter : false);
        setDateFilter(filterOption === "date" ? !dateFilter : false);
    };

    return (
        <>
            <div className="flex items-center">
                <div className="ml-auto flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-7 gap-1">
                                <ListFilter className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Filter
                </span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuCheckboxItem onClick={() => handleFilterClick("size")} checked={sizeFilter}>
                                Size
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem onClick={() => handleFilterClick("date")} checked={dateFilter}>
                                Date
                            </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button size="sm" className="h-7 gap-1">
                        <Plus className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Upload File
            </span>
                    </Button>
                </div>
            </div>
            <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                    <CardTitle>Files</CardTitle>
                    <CardDescription className="justify-between items-center flex gap-2">
                        Manage and view your files here.
                        <div className="relative ml-auto flex-1 md:grow-0">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search..."
                                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                            />
                        </div>
                    </CardDescription>
                </CardHeader>
                <CardContent className="overflow-auto h-[400px]">
                    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-6">
                        {isFilesLoaded ? (
                            files.length > 0 ? (
                                files.map((file: {
                                    _id: string,
                                    title: string,
                                    path: string,
                                    fileSize: string,
                                    description: string
                                }) => (
                                    <FileCard
                                        key={file._id}
                                        fileID={file._id}
                                        fileTitle={file.title}
                                        fileIcon={<img src={getIconUrl(file.path)} alt="File Icon" className="h-12 w-12 text-muted-foreground" />}
                                        fileSize={`${parseFloat(file.fileSize.split(" ")[0]).toFixed(1)} ${file.fileSize.split(" ")[1]}`}
                                        fileDescription={file.description}
                                    />
                                ))
                            ) : (
                                <div className="flex justify-center items-center gap-4">
                                    <img src="/public/no-data.png" className="w-56" alt="inbox" />
                                </div>
                            )
                        ) : (
                            [...Array(12)].map((_, index) => <FileCardSkeleton key={index} />)
                        )}
                    </div>
                </CardContent>
            </Card>
        </>
    );
};

export default FilesSheet;
