import {Activity, ArrowUpRight, FileDown, FileUp, ListFilter, Plus, Search,} from "lucide-react"
import Header from "@/components/Header.tsx";
import SideBar from "@/components/SideBar.tsx";
import {authenticate} from "@/utils/authenticate.ts";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {MdAlternateEmail} from "react-icons/md";
import ChunkCard from "@/components/ChunkCard.tsx";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import {DropdownMenuTrigger} from "@/components/ui/dropdown-menu.tsx";
import FileCard from "@/components/FileCard.tsx";
import {Input} from "@/components/ui/input.tsx";


const DashboardPage = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Get current route information

    // State to manage active sidebar item and corresponding content
    const [activeItemId, setActiveItemId] = useState(
        location.pathname === "/" ? "dashboard" : location.pathname.substring(1) // Set initial active item based on route
    );

    const [sizeFilter, setSizeFilter] = useState(false);
    const [dateFilter, setDateFilter] = useState(false);

    const handleFilterClick = (filterOption: string) => {
        switch (filterOption){
            case "size":
                setSizeFilter(!sizeFilter);
                setDateFilter(false);
                break;
            case "date":
                setDateFilter(!dateFilter);
                setSizeFilter(false);
                break;
        }

    };

    useEffect(() => {
        if (!authenticate()) {
            navigate("/");
        }

    }, [navigate]);

    const handleSidebarItemClick = (itemId: string) => {
        setActiveItemId(itemId);
        navigate(`/${itemId}`); // Update route and state simultaneously
    };

    const recentFileData = [
        {
            "fileType": "<img src=\"/files/icons/psd.png\" width=\"36\" height=\"36\" alt=\"Avatar\" />",
            "fileName": "Catherine's Restaurant Flyer.psd",
            "size": "45.11 MB",
            "date": "2024-05-12",
            "uploadedBy": "Aaron Will Djaba"
        },
        {
            "fileType": "<img src=\"/files/icons/html.png\" width=\"36\" height=\"36\" alt=\"Avatar\" />",
            "fileName": "index.html",
            "size": "215 KB",
            "date": "2024-03-26",
            "uploadedBy": "Petter Smith"
        },
        {
            "fileType": "<img src=\"/files/icons/ai.png\" width=\"36\" height=\"36\" alt=\"Avatar\" />",
            "fileName": "School Crest Design.ai",
            "size": "168.23 MB",
            "date": "2023-06-23",
            "uploadedBy": "Matthew Goth"
        },
        {
            "fileType": "<img src=\"/files/icons/pdf.png\" width=\"36\" height=\"36\" alt=\"Avatar\" />",
            "fileName": "Internship Application Forms.pdf",
            "size": "2.30 MB",
            "date": "2024-04-23",
            "uploadedBy": "Desmond Kwadwo"
        },
        {
            "fileType": "<img src=\"/files/icons/jpg.png\" width=\"36\" height=\"36\" alt=\"Avatar\" />",
            "fileName": "IMG_0025.jpg",
            "size": "5.71 MB",
            "date": "2023-06-23",
            "uploadedBy": "Mathew Goth"
        }
    ];

    function navigateTo() {
        setActiveItemId("files");
    }

    const getContent = () => {
        switch (activeItemId) {
            case "dashboard":
                return (
                    <>
                        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                            <ChunkCard
                                cardTitle="Total Files Uploaded"
                                cardContent="45,231.89"
                                cardIcon={<FileUp className="h-6 w-6 text-muted-foreground"/>}
                            />
                            <ChunkCard
                                cardTitle="Total File Downloads"
                                cardContent="45,231.89"
                                cardIcon={<FileDown className="h-6 w-6 text-muted-foreground"/>}
                            />
                            <ChunkCard
                                cardTitle="Total Emails Sent"
                                cardContent="12,234"
                                cardIcon={<MdAlternateEmail className="h-6 w-6 text-muted-foreground"/>}
                            />
                            <ChunkCard
                                cardTitle="Most Downloaded File Type"
                                cardContent="PDF"
                                cardIcon={<Activity className="h-6 w-6 text-muted-foreground"/>}
                            />
                        </div>
                        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                            <Card
                                className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
                            >
                                <CardHeader className="flex flex-row items-center">
                                    <div className="grid gap-2">
                                        <CardTitle>Recent Files</CardTitle>
                                        <CardDescription>
                                            Recent uploaded files.
                                        </CardDescription>
                                    </div>
                                    <Button asChild size="sm" onClick={navigateTo}  className="ml-auto gap-1">
                                        <div className="cursor-pointer">
                                            View All
                                            <ArrowUpRight className="h-4 w-4"/>
                                        </div>
                                    </Button>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>File Type</TableHead>
                                                <TableHead className="">File name</TableHead>
                                                <TableHead className="">Size</TableHead>
                                                <TableHead className="">Date</TableHead>
                                                <TableHead className="text-right">Uploaded by</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {recentFileData.map((row: {
                                                fileType: string,
                                                fileName: string,
                                                size: string,
                                                date: string,
                                                uploadedBy: string
                                            }) => (
                                                <TableRow key={row.fileName}>
                                                    <TableCell dangerouslySetInnerHTML={{__html: row.fileType}}/>
                                                    <TableCell className="">{row.fileName}</TableCell>
                                                    <TableCell className="">{row.size}</TableCell>
                                                    <TableCell className="">{row.date}</TableCell>
                                                    <TableCell className="text-right">{row.uploadedBy}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                            <Card x-chunk="dashboard-01-chunk-5">
                                <CardHeader>
                                    <CardTitle>Recent Emails</CardTitle>
                                </CardHeader>
                                <CardContent className="grid gap-8">
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-9 w-9">
                                            <AvatarImage src="/avatars/01.png" alt="Avatar"/>
                                            <AvatarFallback>OM</AvatarFallback>
                                        </Avatar>
                                        <div className="grid gap-1">
                                            <p className="text-sm font-medium leading-none">
                                                Olivia Martin
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                olivia.martin@email.com
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-9 w-9">
                                            <AvatarImage src="/avatars/02.png" alt="Avatar"/>
                                            <AvatarFallback>JL</AvatarFallback>
                                        </Avatar>
                                        <div className="grid gap-1">
                                            <p className="text-sm font-medium leading-none">
                                                Jackson Lee
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                jackson.lee@email.com
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-9 w-9">
                                            <AvatarImage src="/avatars/03.png" alt="Avatar"/>
                                            <AvatarFallback>IN</AvatarFallback>
                                        </Avatar>
                                        <div className="grid gap-1">
                                            <p className="text-sm font-medium leading-none">
                                                Isabella Nguyen
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                isabella.nguyen@email.com
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-9 w-9">
                                            <AvatarImage src="/avatars/04.png" alt="Avatar"/>
                                            <AvatarFallback>WK</AvatarFallback>
                                        </Avatar>
                                        <div className="grid gap-1">
                                            <p className="text-sm font-medium leading-none">
                                                William Kim
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                will@email.com
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-9 w-9">
                                            <AvatarImage src="/avatars/05.png" alt="Avatar"/>
                                            <AvatarFallback>SD</AvatarFallback>
                                        </Avatar>
                                        <div className="grid gap-1">
                                            <p className="text-sm font-medium leading-none">
                                                Sofia Davis
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                sofia.davis@email.com
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-9 w-9">
                                            <AvatarImage src="/avatars/05.png" alt="Avatar"/>
                                            <AvatarFallback>MT</AvatarFallback>
                                        </Avatar>
                                        <div className="grid gap-1">
                                            <p className="text-sm font-medium leading-none">
                                                Matt Tuff
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                matt.tuff@email.com
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </>
                );
            case "files":
                return (
                    <>
                        <div className="flex items-center">
                            <div className="ml-auto flex items-center gap-2">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="sm" className="h-7 gap-1">
                                            <ListFilter className="h-3.5 w-3.5"/>
                                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                            Filter
                                        </span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                        <DropdownMenuSeparator/>
                                        <DropdownMenuCheckboxItem onClick={() => handleFilterClick("size")} checked={sizeFilter}>
                                            Size
                                        </DropdownMenuCheckboxItem>
                                        <DropdownMenuCheckboxItem onClick={() => handleFilterClick("date")} checked={dateFilter}>
                                            Date
                                        </DropdownMenuCheckboxItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <Button size="sm" className="h-7 gap-1">
                                    <Plus className="h-3.5 w-3.5"/>
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
                                    Manage your files and view their sales performance.
                                    <div className="relative ml-auto flex-1 md:grow-0">
                                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
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
                                    <FileCard
                                        fileTitle="My Document.txt"
                                        fileIcon={<img src="/files/icons/txt.png" alt="Text File"
                                                       className="h-12 w-12 text-muted-foreground"/>}
                                        fileSize="50 KB"
                                    />
                                    <FileCard
                                        fileTitle="Presentation.pptx"
                                        fileIcon={<img src="/files/icons/ppt.png" alt="PowerPoint File" className="h-12 w-12 text-muted-foreground" />}
                                        fileSize="10.5 MB"
                                    />
                                    <FileCard
                                        fileTitle="Holiday Photo.jpg"
                                        fileIcon={<img src="/files/icons/jpg.png" alt="Image File" className="h-12 w-12 text-muted-foreground" />}
                                        fileSize="2.3 MB"
                                    />
                                    <FileCard
                                        fileTitle="Invoice.pdf"
                                        fileIcon={<img src="/files/icons/pdf.png" alt="PDF File" className="h-12 w-12 text-muted-foreground" />}
                                        fileSize="150 KB"
                                    />
                                    <FileCard
                                        fileTitle="Website Design.psd"
                                        fileIcon={<img src="/files/icons/psd.png" alt="Photoshop File" className="h-12 w-12 text-muted-foreground" />}
                                        fileSize="87.2 MB"
                                    />
                                    <FileCard
                                        fileTitle="Weekly Report and sales report.docx"
                                        fileIcon={<img src="/files/icons/word.png" alt="Word Document" className="h-12 w-12 text-muted-foreground" />}
                                        fileSize="2.1 MB"
                                    />
                                    <FileCard
                                        fileTitle="Project Design.ai"
                                        fileIcon={<img src="/files/icons/ai.png" alt="Adobe Illustrator File" className="h-12 w-12 text-muted-foreground" />}
                                        fileSize="5.8 MB"
                                    />
                                    <FileCard
                                        fileTitle="Proposal.pdf"
                                        fileIcon={<img src="/files/icons/pdf.png" alt="PDF File" className="h-12 w-12 text-muted-foreground" />}
                                        fileSize="320 KB"
                                    />
                                    <FileCard
                                        fileTitle="Vacation Photo.jpg"
                                        fileIcon={<img src="/files/icons/jpg.png" alt="Image File" className="h-12 w-12 text-muted-foreground" />}
                                        fileSize="3.5 MB"
                                    />
                                    <FileCard
                                        fileTitle="Presentation.pptx"
                                        fileIcon={<img src="/files/icons/ppt.png" alt="PowerPoint File" className="h-12 w-12 text-muted-foreground" />}
                                        fileSize="12.1 MB"
                                    />
                                    <FileCard
                                        fileTitle="Report.docx"
                                        fileIcon={<img src="/files/icons/word.png" alt="Word Document" className="h-12 w-12 text-muted-foreground" />}
                                        fileSize="1.6 MB"
                                    />
                                    <FileCard
                                        fileTitle="Financial Data.xlsx"
                                        fileIcon={<img src="/files/icons/excel.png" alt="Excel File" className="h-12 w-12 text-muted-foreground" />}
                                        fileSize="780 KB"
                                    />
                                    <FileCard
                                        fileTitle="Website HTML.html"
                                        fileIcon={<img src="/files/icons/html.png" alt="HTML File" className="h-12 w-12 text-muted-foreground" />}
                                        fileSize="420 KB"
                                    />
                                    <FileCard
                                        fileTitle="Random Document.txt"
                                        fileIcon={<img src="/files/icons/txt.png" alt="Text File" className="h-12 w-12 text-muted-foreground" />}
                                        fileSize="28 KB"
                                    />
                                    <FileCard
                                        fileTitle="Animation.gif"
                                        fileIcon={<img src="/files/icons/gif.png" alt="GIF File" className="h-12 w-12 text-muted-foreground" />}
                                        fileSize="780 KB"
                                    />
                                    <FileCard
                                        fileTitle="Unknown File.xyz"
                                        fileIcon={<img src="/files/icons/unknown.png" alt="Unknown File" className="h-12 w-12 text-muted-foreground" />}
                                        fileSize="125 KB"
                                    />
                                    <FileCard
                                        fileTitle="Project Design.ai"
                                        fileIcon={<img src="/files/icons/ai.png" alt="Adobe Illustrator File" className="h-12 w-12 text-muted-foreground" />}
                                        fileSize="5.8 MB"
                                    />
                                    <FileCard
                                        fileTitle="Proposal.pdf"
                                        fileIcon={<img src="/files/icons/pdf.png" alt="PDF File" className="h-12 w-12 text-muted-foreground" />}
                                        fileSize="320 KB"
                                    />
                                    <FileCard
                                        fileTitle="Vacation Photo.jpg"
                                        fileIcon={<img src="/files/icons/jpg.png" alt="Image File" className="h-12 w-12 text-muted-foreground" />}
                                        fileSize="3.5 MB"
                                    />
                                    <FileCard
                                        fileTitle="Presentation.pptx"
                                        fileIcon={<img src="/files/icons/ppt.png" alt="PowerPoint File" className="h-12 w-12 text-muted-foreground" />}
                                        fileSize="12.1 MB"
                                    />
                                    <FileCard
                                        fileTitle="Report.docx"
                                        fileIcon={<img src="/files/icons/word.png" alt="Word Document" className="h-12 w-12 text-muted-foreground" />}
                                        fileSize="1.6 MB"
                                    />
                                    <FileCard
                                        fileTitle="Financial Data.xlsx"
                                        fileIcon={<img src="/files/icons/excel.png" alt="Excel File" className="h-12 w-12 text-muted-foreground" />}
                                        fileSize="780 KB"
                                    />
                                    <FileCard
                                        fileTitle="Website HTML.html"
                                        fileIcon={<img src="/files/icons/html.png" alt="HTML File" className="h-12 w-12 text-muted-foreground" />}
                                        fileSize="420 KB"
                                    />
                                    <FileCard
                                        fileTitle="Random Document.txt"
                                        fileIcon={<img src="/files/icons/txt.png" alt="Text File" className="h-12 w-12 text-muted-foreground" />}
                                        fileSize="28 KB"
                                    />
                                    <FileCard
                                        fileTitle="Animation.gif"
                                        fileIcon={<img src="/files/icons/gif.png" alt="GIF File" className="h-12 w-12 text-muted-foreground" />}
                                        fileSize="780 KB"
                                    />
                                    <FileCard
                                        fileTitle="Unknown File.xyz"
                                        fileIcon={<img src="/files/icons/unknown.png" alt="Unknown File" className="h-12 w-12 text-muted-foreground" />}
                                        fileSize="45 MB"
                                    />

                                </div>
                            </CardContent>
                        </Card>
                    </>
                );
            case "products":
                return (
                    <p>Products content will be displayed here</p>
                );
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