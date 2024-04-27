import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ArrowUpRight} from "lucide-react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";

const TableSkeleton = () => {
    return (
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
                <Button asChild size="sm" className="ml-auto gap-1">
                    <a href="/files">
                        View All
                        <ArrowUpRight className="h-4 w-4"/>
                    </a>
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead><Skeleton className="h-4 w-[50px]"/></TableHead>
                            <TableHead className=""><Skeleton className="h-4 w-[50px]"/></TableHead>
                            <TableHead className=""><Skeleton className="h-4 w-[50px]"/></TableHead>
                            <TableHead className=""><Skeleton className="h-4 w-[50px]"/></TableHead>
                            <TableHead className="items-right"><Skeleton className="h-4 w-[50px]"/></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className=""><Skeleton className="h-10 w-10 rounded-full"/></TableCell>
                            <TableCell className=""><Skeleton className="h-4 w-[70px]"/></TableCell>
                            <TableCell className=""><Skeleton className="h-4 w-[70px]"/></TableCell>
                            <TableCell className=""><Skeleton className="h-4 w-[70px]"/></TableCell>
                            <TableCell className=""><Skeleton className="h-4 w-[70px]"/></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className=""><Skeleton className="h-10 w-10 rounded-full"/></TableCell>
                            <TableCell className=""><Skeleton className="h-4 w-[70px]"/></TableCell>
                            <TableCell className=""><Skeleton className="h-4 w-[70px]"/></TableCell>
                            <TableCell className=""><Skeleton className="h-4 w-[70px]"/></TableCell>
                            <TableCell className=""><Skeleton className="h-4 w-[70px]"/></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className=""><Skeleton className="h-10 w-10 rounded-full"/></TableCell>
                            <TableCell className=""><Skeleton className="h-4 w-[70px]"/></TableCell>
                            <TableCell className=""><Skeleton className="h-4 w-[70px]"/></TableCell>
                            <TableCell className=""><Skeleton className="h-4 w-[70px]"/></TableCell>
                            <TableCell className=""><Skeleton className="h-4 w-[70px]"/></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className=""><Skeleton className="h-10 w-10 rounded-full"/></TableCell>
                            <TableCell className=""><Skeleton className="h-4 w-[70px]"/></TableCell>
                            <TableCell className=""><Skeleton className="h-4 w-[70px]"/></TableCell>
                            <TableCell className=""><Skeleton className="h-4 w-[70px]"/></TableCell>
                            <TableCell className=""><Skeleton className="h-4 w-[70px]"/></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className=""><Skeleton className="h-10 w-10 rounded-full"/></TableCell>
                            <TableCell className=""><Skeleton className="h-4 w-[70px]"/></TableCell>
                            <TableCell className=""><Skeleton className="h-4 w-[70px]"/></TableCell>
                            <TableCell className=""><Skeleton className="h-4 w-[70px]"/></TableCell>
                            <TableCell className=""><Skeleton className="h-4 w-[70px]"/></TableCell>
                        </TableRow>
                        
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default TableSkeleton;