import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";

const FileCardSkeleton = () => {

    return (
        <Card x-chunk="dashboard-01-chunk-0" className="hover:bg-gray-50 cursor-pointer relative">
            <CardHeader className="flex flex-row items-center justify-center space-y-5 pb-2">
                <Skeleton className="h-[50px] w-[50px]"/>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center">
                <div className="truncate mb-3"><Skeleton className="h-6 w-[130px]"/></div>
                <p className="text-xs justify-between gap-2 text-muted-foreground">
                    <Skeleton className="h-4 w-[80px]"/>
                </p>
            </CardContent>
        </Card>
    );
};

export default FileCardSkeleton;