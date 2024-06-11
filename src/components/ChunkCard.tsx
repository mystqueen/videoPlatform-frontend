import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";

const ChunkCard = (props: { cardTitle: string, cardContent: string, cardSubText?: string, cardIcon: React.ReactElement }) => {
    const {cardTitle, cardContent, cardSubText, cardIcon} = props;
    return (
        <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    {cardTitle}
                </CardTitle>
                <>{cardIcon}</>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{cardContent || <Skeleton className="h-6 w-[30px]"/>}</div>
                <p className="text-xs text-muted-foreground">
                    {cardSubText || ""}
                </p>
            </CardContent>
        </Card>
    );
};

export default ChunkCard;