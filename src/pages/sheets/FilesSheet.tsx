import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ListFilter, Plus, Search} from "lucide-react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Input} from "@/components/ui/input.tsx";
import FileCard from "@/components/FileCard.tsx";
import {useState} from "react";

const FilesSheet = () => {

    const [sizeFilter, setSizeFilter] = useState(false);
    const [dateFilter, setDateFilter] = useState(false);
    const handleFilterClick = (filterOption: string) => {
        switch (filterOption) {
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
                            <DropdownMenuCheckboxItem onClick={() => handleFilterClick("size")}
                                                      checked={sizeFilter}>
                                Size
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem onClick={() => handleFilterClick("date")}
                                                      checked={dateFilter}>
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
                            fileIcon={<img src="/files/icons/ppt.png" alt="PowerPoint File"
                                           className="h-12 w-12 text-muted-foreground"/>}
                            fileSize="10.5 MB"
                        />
                        <FileCard
                            fileTitle="Holiday Photo.jpg"
                            fileIcon={<img src="/files/icons/jpg.png" alt="Image File"
                                           className="h-12 w-12 text-muted-foreground"/>}
                            fileSize="2.3 MB"
                        />
                        <FileCard
                            fileTitle="Invoice.pdf"
                            fileIcon={<img src="/files/icons/pdf.png" alt="PDF File"
                                           className="h-12 w-12 text-muted-foreground"/>}
                            fileSize="150 KB"
                        />
                        <FileCard
                            fileTitle="Website Design.psd"
                            fileIcon={<img src="/files/icons/psd.png" alt="Photoshop File"
                                           className="h-12 w-12 text-muted-foreground"/>}
                            fileSize="87.2 MB"
                        />
                        <FileCard
                            fileTitle="Weekly Report and sales report.docx"
                            fileIcon={<img src="/files/icons/word.png" alt="Word Document"
                                           className="h-12 w-12 text-muted-foreground"/>}
                            fileSize="2.1 MB"
                        />
                        <FileCard
                            fileTitle="Project Design.ai"
                            fileIcon={<img src="/files/icons/ai.png" alt="Adobe Illustrator File"
                                           className="h-12 w-12 text-muted-foreground"/>}
                            fileSize="5.8 MB"
                        />
                        <FileCard
                            fileTitle="Proposal.pdf"
                            fileIcon={<img src="/files/icons/pdf.png" alt="PDF File"
                                           className="h-12 w-12 text-muted-foreground"/>}
                            fileSize="320 KB"
                        />
                        <FileCard
                            fileTitle="Vacation Photo.jpg"
                            fileIcon={<img src="/files/icons/jpg.png" alt="Image File"
                                           className="h-12 w-12 text-muted-foreground"/>}
                            fileSize="3.5 MB"
                        />
                        <FileCard
                            fileTitle="Presentation.pptx"
                            fileIcon={<img src="/files/icons/ppt.png" alt="PowerPoint File"
                                           className="h-12 w-12 text-muted-foreground"/>}
                            fileSize="12.1 MB"
                        />
                        <FileCard
                            fileTitle="Report.docx"
                            fileIcon={<img src="/files/icons/word.png" alt="Word Document"
                                           className="h-12 w-12 text-muted-foreground"/>}
                            fileSize="1.6 MB"
                        />
                        <FileCard
                            fileTitle="Financial Data.xlsx"
                            fileIcon={<img src="/files/icons/excel.png" alt="Excel File"
                                           className="h-12 w-12 text-muted-foreground"/>}
                            fileSize="780 KB"
                        />
                        <FileCard
                            fileTitle="Website HTML.html"
                            fileIcon={<img src="/files/icons/html.png" alt="HTML File"
                                           className="h-12 w-12 text-muted-foreground"/>}
                            fileSize="420 KB"
                        />
                        <FileCard
                            fileTitle="Random Document.txt"
                            fileIcon={<img src="/files/icons/txt.png" alt="Text File"
                                           className="h-12 w-12 text-muted-foreground"/>}
                            fileSize="28 KB"
                        />
                        <FileCard
                            fileTitle="Animation.gif"
                            fileIcon={<img src="/files/icons/gif.png" alt="GIF File"
                                           className="h-12 w-12 text-muted-foreground"/>}
                            fileSize="780 KB"
                        />
                        <FileCard
                            fileTitle="Unknown File.xyz"
                            fileIcon={<img src="/files/icons/unknown.png" alt="Unknown File"
                                           className="h-12 w-12 text-muted-foreground"/>}
                            fileSize="125 KB"
                        />
                        <FileCard
                            fileTitle="Project Design.ai"
                            fileIcon={<img src="/files/icons/ai.png" alt="Adobe Illustrator File"
                                           className="h-12 w-12 text-muted-foreground"/>}
                            fileSize="5.8 MB"
                        />
                        <FileCard
                            fileTitle="Proposal.pdf"
                            fileIcon={<img src="/files/icons/pdf.png" alt="PDF File"
                                           className="h-12 w-12 text-muted-foreground"/>}
                            fileSize="320 KB"
                        />
                        <FileCard
                            fileTitle="Vacation Photo.jpg"
                            fileIcon={<img src="/files/icons/jpg.png" alt="Image File"
                                           className="h-12 w-12 text-muted-foreground"/>}
                            fileSize="3.5 MB"
                        />
                        <FileCard
                            fileTitle="Presentation.pptx"
                            fileIcon={<img src="/files/icons/ppt.png" alt="PowerPoint File"
                                           className="h-12 w-12 text-muted-foreground"/>}
                            fileSize="12.1 MB"
                        />
                        <FileCard
                            fileTitle="Report.docx"
                            fileIcon={<img src="/files/icons/word.png" alt="Word Document"
                                           className="h-12 w-12 text-muted-foreground"/>}
                            fileSize="1.6 MB"
                        />
                        <FileCard
                            fileTitle="Financial Data.xlsx"
                            fileIcon={<img src="/files/icons/excel.png" alt="Excel File"
                                           className="h-12 w-12 text-muted-foreground"/>}
                            fileSize="780 KB"
                        />
                        <FileCard
                            fileTitle="Website HTML.html"
                            fileIcon={<img src="/files/icons/html.png" alt="HTML File"
                                           className="h-12 w-12 text-muted-foreground"/>}
                            fileSize="420 KB"
                        />
                        <FileCard
                            fileTitle="Random Document.txt"
                            fileIcon={<img src="/files/icons/txt.png" alt="Text File"
                                           className="h-12 w-12 text-muted-foreground"/>}
                            fileSize="28 KB"
                        />
                        <FileCard
                            fileTitle="Animation.gif"
                            fileIcon={<img src="/files/icons/gif.png" alt="GIF File"
                                           className="h-12 w-12 text-muted-foreground"/>}
                            fileSize="780 KB"
                        />
                        <FileCard
                            fileTitle="Unknown File.xyz"
                            fileIcon={<img src="/files/icons/unknown.png" alt="Unknown File"
                                           className="h-12 w-12 text-muted-foreground"/>}
                            fileSize="45 MB"
                        />

                    </div>
                </CardContent>
            </Card>
        </>
    );
};

export default FilesSheet;