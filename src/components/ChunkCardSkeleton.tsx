import React from "react";
import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";

const ChunkCardSkeleton = () => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-[150px]"/>
                <Skeleton className="h-7 w-6 text-sm font-medium"/>
            </CardHeader>
            <CardContent>
                <Skeleton className="h-8 w-[145px]"/>
            </CardContent>
        </Card>
    );
};

export default ChunkCardSkeleton;