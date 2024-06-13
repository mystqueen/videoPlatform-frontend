import ChunkCard from "@/components/ChunkCard.tsx";
import {ArrowUpRight, FileDown, FileUp, User} from "lucide-react";
import {MdAlternateEmail} from "react-icons/md";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {useState} from "react";
import axios from "axios";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import getIconUrl from "@/utils/icons.ts";

const DashboardSheet = (props: { navigateTo: () => void }) => {

    const [totalFiles, setTotalFiles] = useState("0");
    const [totalFilesDownloads, setTotalFilesDownloads] = useState("0");
    const [totalEmailsSent, setTotalEmailsSent] = useState("0");
    const [usersCount, setUsersCount] = useState("0");
    const [recentFiles, setRecentFiles] = useState([]);
    const [recentEmails, setRecentEmails] = useState([]);
    const [loadedRecentEmails, setLoadedRecentEmails] = useState(false);
    const [loadedTotalFiles, setLoadedTotalFiles] = useState(false);
    const [loadedTotalFilesDownloads, setLoadedTotalFilesDownloads] = useState(false);
    const [loadedUserCount, setLoadedUserCount] = useState(false);
    const [loadedRecentFiles, setLoadedRecentFiles] = useState(false);
    const [loadedEmailCount, setLoadedEmailCount] = useState(false);
    const {navigateTo} = props;
    // const baseUrl = import.meta.env.PORT || "http://testserver.com:8080";
    const baseUrl = import.meta.env.PORT || "https://file-server-zr8t.onrender.com";

    const downloadsCountUrl = `${baseUrl}/admin/downloads/count`;
    const filesCountUrl = `${baseUrl}/admin/files/count`;
    const emailsCountUrl = `${baseUrl}/admin/emails/count`;
    const usersCountUrl = `${baseUrl}/admin/users/count`;
    const recentFilesUrl = `${baseUrl}/admin/files/recent`;
    const recentEmailsUrl = `${baseUrl}/admin/emails/recent`;

    const axiosInstance = axios.create({
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${sessionStorage.getItem("token")}`
        },
    });

    axiosInstance.get(downloadsCountUrl).then((response) => {
        if (response.status === 200) {
            setTotalFilesDownloads(response.data.data.count);
        } else {
            console.log("downloads count error:", response.data.error);
        }
    }).catch(() => {
        setLoadedTotalFilesDownloads(true);
    });

    axiosInstance.get(filesCountUrl).then((response) => {
        if (response.status === 200) {
            setTotalFiles(response.data.data.count);
            setLoadedTotalFiles(true);
        } else {
            console.log("files count error:", response.data.error);
        }
    }).catch(() => {
        setLoadedTotalFiles(true);
    });

    axiosInstance.get(emailsCountUrl).then((response) => {
        if (response.status === 200) {
            setTotalEmailsSent(response.data.data.count);
            setLoadedEmailCount(true);
        } else {
            console.log("emails count error:", response.data.error);
        }
    }).catch(() => {
        setLoadedEmailCount(true);
    });

    axiosInstance.get(usersCountUrl).then((response) => {
        if (response.status === 200) {
            setUsersCount(response.data.data.count);
            setLoadedUserCount(true);
        } else {
            console.log("most downloaded file error:", response.data.error);
        }
    }).catch(() => {
        setLoadedUserCount(true);
    });

    axiosInstance.get(recentFilesUrl).then((response) => {
        if (response.status === 200) {
            setRecentFiles(response.data.data);
            setLoadedRecentFiles(true);
        } else {
            console.log("recent files error:", response.data.error);
        }
    }).catch(() => {
        setLoadedRecentFiles(true);
    });

    axiosInstance.get(recentEmailsUrl).then((response) => {
        if (response.status === 200) {
            setRecentEmails(response.data.data);
            setLoadedRecentEmails(true);
        } else {
            console.log("recent emails error:", response.data.error);
        }
    }).catch(() => {
        setLoadedRecentEmails(true);
    });

    return (
        <>
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <ChunkCard
                    cardTitle="Total Files Uploaded"
                    cardContent={totalFiles.toLocaleString()}
                    cardIcon={<FileUp className="h-6 w-6 text-muted-foreground"/>}
                    isLoaded={loadedTotalFiles}/>
                <ChunkCard
                    cardTitle="Total File Downloads"
                    cardContent={totalFilesDownloads.toLocaleString()}
                    cardIcon={<FileDown className="h-6 w-6 text-muted-foreground"/>}
                    isLoaded={loadedTotalFilesDownloads}/>
                <ChunkCard
                    cardTitle="Total Emails Sent"
                    cardContent={totalEmailsSent.toLocaleString()}
                    cardIcon={<MdAlternateEmail className="h-6 w-6 text-muted-foreground"/>}
                    isLoaded={loadedEmailCount}/>
                <ChunkCard
                    cardTitle="Total Users"
                    cardContent={usersCount.toLocaleString()}
                    cardIcon={<User className="h-6 w-6 text-muted-foreground"/>}
                    isLoaded={loadedUserCount}/>
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
                        <Button asChild size="sm" onClick={navigateTo} className="ml-auto gap-1">
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
                                    <TableHead className="">Title</TableHead>
                                    <TableHead className="">Size</TableHead>
                                    <TableHead className="">Date</TableHead>
                                    <TableHead className="text-right">Uploaded by</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loadedRecentFiles ? (recentFiles.length > 0 ?
                                    (recentFiles.map((row: {
                                        _id: string,
                                        path: string,
                                        title: string,
                                        fileSize: string,
                                        createdAt: string,
                                        uploadedBy: { fullname: string }
                                    }) => (
                                        <TableRow key={row._id}>
                                            <TableCell dangerouslySetInnerHTML={{
                                                __html: `<img src=${getIconUrl(row.path)} class="h-8" alt="Avatar"/>`
                                            }}/>
                                            <TableCell className="">{row.title}</TableCell>
                                            <TableCell className="">{row.fileSize}</TableCell>
                                            <TableCell className="">{new Date(row.createdAt).toDateString()}</TableCell>
                                            <TableCell className="text-right">{row.uploadedBy.fullname}</TableCell>
                                        </TableRow>
                                    ))) : (
                                        <>
                                            <TableRow>
                                                <TableCell></TableCell>
                                                <TableCell></TableCell>
                                                <TableCell>
                                                    <div className="flex justify-center items-center gap-4">
                                                        <img src="/public/no-data.png" className="w-56" alt="inbox"/>
                                                    </div>
                                                </TableCell>
                                                <TableCell></TableCell>
                                                <TableCell></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell></TableCell>
                                                <TableCell></TableCell>
                                                <TableCell>
                                                    <div className="flex justify-center items-center gap-4">
                                                        <p className="text-center text-lg">
                                                            No Files!
                                                        </p>
                                                    </div>
                                                </TableCell>
                                                <TableCell></TableCell>
                                                <TableCell></TableCell>
                                            </TableRow>
                                        </>
                                    )) : (
                                    <>
                                        {[...Array(5)].map((_, index) => (
                                            <TableRow key={index}>
                                                <TableCell><Skeleton className="h-4 w-[50px]"/></TableCell>
                                                <TableCell><Skeleton className="h-4 w-[150px]"/></TableCell>
                                                <TableCell><Skeleton className="h-4 w-[50px]"/></TableCell>
                                                <TableCell><Skeleton className="h-4 w-[80px]"/></TableCell>
                                                <TableCell>
                                                    <Skeleton className="h-4 w-[80px] float-end"/>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </>

                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                <Card x-chunk="dashboard-01-chunk-5">
                    <CardHeader>
                        <CardTitle>Recent Emails</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-8">
                        {loadedRecentEmails ? (recentEmails.length > 0 ?
                            (recentEmails.map((row: {
                                _id: string,
                                subject: string,
                                sentBy: { fullname: string, email: string },
                                file: { title: string }
                            }) => (
                                <div key={row._id} className="flex items-center gap-4">
                                    <Avatar className="h-9 w-9">
                                        <AvatarImage src="/avatars/01.png" alt="Avatar"/>
                                        <AvatarFallback>{row.sentBy.fullname.slice(0, 2).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div className="grid gap-1">
                                        <p className="text-sm font-medium leading-none">
                                            {row.subject}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {row.sentBy.fullname} ({row.sentBy.email})
                                        </p>
                                    </div>
                                </div>
                            ))) : (
                                <>
                                    <div className="flex justify-center items-center gap-4">
                                        <img src="/public/inbox.png" className="w-56" alt="inbox"/>
                                    </div>
                                    <p className="text-center text-lg">
                                        No Emails!
                                    </p>
                                </>
                            )) : (
                            [...Array(5)].map((_, index) => (
                                    <div key={index} className="flex items-center gap-4">
                                        <Skeleton className="h-9 w-9 rounded-full"/>
                                        <div className="grid gap-1">
                                            <p className="text-sm font-medium leading-none">
                                                <Skeleton className="h-6 w-[150px]"/>
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                <Skeleton className="h-5 w-[250px]"/>
                                            </p>
                                        </div>
                                    </div>
                                )
                            ))}
                    </CardContent>
                </Card>
            </div>
        </>
    )
        ;
};

export default DashboardSheet;