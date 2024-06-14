import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import {useEffect, useState} from "react";
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
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {z} from "zod";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {useToast} from "@/components/ui/use-toast.ts";
import axios from "axios";
import {BASE_URL} from "@/config.ts";

const formSchema = z.object({
    title: z.string().min(1, {message: "Title is required!"}),
    description: z.string().min(1, {message: "Please enter a description!"}),
});

const FileCard = (props: {
    fileID: string,
    fileTitle: string,
    fileSize: string,
    fileIcon: React.ReactNode,
    fileDescription?: string
}) => {
    const {fileID, fileTitle, fileSize, fileIcon, fileDescription} = props;

    const [isDisabled, setIsDisabled] = useState(true);
    const {toast} = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: fileTitle,
            description: fileDescription || "",
        },
    });

    const truncateFileName = (name: string, maxLength: number) => {
        if (name.length <= maxLength) return name;
        return name.substring(0, maxLength) + '...';
    };

    const {reset, watch, formState} = form;
    const {isDirty, dirtyFields} = formState;

    useEffect(() => {
        reset({title: fileTitle, description: fileDescription || ""});
    }, [fileTitle, fileDescription, reset]);

    const axiosInstance = axios.create({
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${sessionStorage.getItem("token")}`
        },
    });
    const handleView = () => {
        setIsDisabled(true);
    };

    const handleEdit = () => {
        setIsDisabled(!isDisabled);
    };

    const handleSave = () => {
        if (isDirty) {
            const updatedData = {
                title: dirtyFields.title ? watch("title") : fileTitle,
                description: dirtyFields.description ? watch("description") : fileDescription,
            };
            alert(`Title: ${updatedData.title}\nDescription:  ${updatedData.description}`);
            setIsDisabled(true);
        } else {
            toast({description: "No changes made!"});
        }
    };

    const handleDelete = (fileData: object) => {
        console.log(`deleting ${JSON.stringify(fileData)}`);
    };

    const handleDownload = (fileData: object) => {
        axiosInstance.get(`${BASE_URL}/file/download/request/${fileID}`).then(() => {
            toast({
                description: "Download initiated!"
            });
        }).catch(() => {
            toast({
                description: "An error occurred!",
                variant: "destructive"
            })
        })
        console.log(`downloading ${JSON.stringify(fileData)}`);
    };

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
                                <DropdownMenuItem onClick={handleView}>
                                    View
                                </DropdownMenuItem>
                            </DialogTrigger>
                            <DropdownMenuItem onClick={() => handleDelete(props)}>Delete</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDownload(props)}>Download</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DialogContent className="sm:max-w-md">
                        <FormProvider {...form}>
                            <form
                                onSubmit={form.handleSubmit(handleSave)}>
                                <DialogHeader>
                                    <DialogTitle>Edit File</DialogTitle>
                                    <DialogDescription>
                                        Edit and update the file.
                                    </DialogDescription>
                                </DialogHeader>

                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    placeholder="title"
                                                    disabled={isDisabled}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                            </FormDescription>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="description"
                                                    disabled={isDisabled}
                                                    rows={4}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                            </FormDescription>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                <DialogFooter className="sm:justify-start">
                                    <Button type="button" onClick={handleEdit} variant="ghost">
                                        {isDisabled ? "Edit" : "Cancel"}
                                    </Button>
                                    <Button type="submit" className="px-3">
                                        Save
                                    </Button>
                                </DialogFooter>
                            </form>
                        </FormProvider>
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
