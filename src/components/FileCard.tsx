import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import React, {useState} from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {MoreHorizontal} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";

const FileCard = (props: { fileTitle: string, fileSize: string, fileIcon: React.ReactNode, fileDescription?: string }) => {
    const {fileTitle, fileSize, fileIcon, fileDescription} = props;

    const [_fileTitle, setFileTitle] = useState(fileTitle);
    const [_fileDescription, setFileDescription] = useState(fileDescription || "");

    const truncateFileName = (name: string, maxLength: number) => {
        if (name.length <= maxLength) return name;
        return name.substring(0, maxLength) + '...';
    };


    const handleEdit = () => {
        setFileTitle(_fileTitle);
        setFileDescription(_fileDescription);
    }; // TODO: handleEdit


    const handleSave = () => {
        alert(`Title: ${_fileTitle }\nDescription:  ${_fileDescription}`);
    }; // TODO: handleSave

    
    const handleDelete = (fileData: object) => {
        console.log(`deleting ${JSON.stringify(fileData)}`);
    }; // TODO: handleEdit

    const handleDownload = (fileData: object) => {
        console.log(`downloading ${JSON.stringify(fileData)}`);
    }; // TODO: handleEdit

    return (
        <Card x-chunk="dashboard-01-chunk-0" className="hover:bg-gray-50 cursor-pointer relative">
            <div className="absolute top-2 right-3">
                <Dialog>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                            >
                                <MoreHorizontal className="h-4 w-4"/>
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DialogTrigger asChild>
                                <DropdownMenuItem onClick={handleEdit}>
                                    Edit
                                </DropdownMenuItem>
                            </DialogTrigger>
                            <DropdownMenuItem onClick={() => handleDelete(props)}>Delete</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDownload(props)}>Download</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Edit File</DialogTitle>
                            <DialogDescription>
                               Edit and update the file.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex items-center space-x-2">
                            <div className="grid flex-1 gap-2">
                                <Label htmlFor="title" >
                                    Title
                                </Label>
                                <Input
                                    id="title"
                                    defaultValue={_fileTitle}
                                    onChange={(e) => setFileTitle(e.target.value)}
                                />
                                <Label htmlFor="description" >
                                    Description
                                </Label>
                                <Input
                                    id="description"
                                    defaultValue={_fileDescription}
                                    onChange={(e) => setFileDescription(e.target.value)}
                                />
                            </div>

                        </div>
                        <DialogFooter className="sm:justify-start">
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                    Close
                                </Button>
                            </DialogClose>
                            <Button onClick={handleSave} className="px-3">
                            Save
                        </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            <CardHeader className="flex flex-row items-center justify-center space-y-5 pb-2">
                {fileIcon}
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center">
                <div className="truncate">{truncateFileName(fileTitle, 15)}</div>
                <p className="text-xs justify-between gap-2 text-muted-foreground">
                    {fileSize} ● 2022-01-01
                </p>
            </CardContent>
        </Card>

    );
};

export default FileCard;