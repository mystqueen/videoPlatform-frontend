import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { BASE_URL } from "@/config";
import { Loader2 } from "lucide-react";

const FormSchema = z.object({
    title: z.string().min(4, {
        message: "Title must be at least 4 characters.",
    }),
    description: z.string().min(1, {
        message: "Description must not be empty.",
    }),
    file: z.instanceof(FileList).refine((fileList) => fileList.length > 0, {
        message: "File list must not be empty.",
    })
});

const UploadSheet: React.FC<{ navigateTo: (page: string) => void }> = ({ navigateTo }) => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: "",
            description: "",
            file: undefined
        },
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            title: "Uploading file....!",
            action: <Loader2 className="mr-2 h-4 w-4 animate-spin" />,
        });

        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("file", data.file[0]);

        console.log('formData', formData);

        const axiosInstance = axios.create({
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        try {
            await axiosInstance.post(`${BASE_URL}/api/v1/admin/upload`, formData);
            toast({ description: "Uploaded successfully" });
            navigateTo("files"); // Navigate to the files page or refresh the list
        } catch (error) {
            toast({ description: "Upload failed. Please try again." });
            console.error('Upload error', error);
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Upload File</CardTitle>
                <CardDescription className="justify-between items-center flex gap-2">
                    Upload file as a new document
                </CardDescription>
            </CardHeader>
            <CardContent className="overflow-auto h-[400px]">
                <div className="grid gap-4 md:gap-8 lg:grid-cols-3">
                    <div></div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Title" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Description" rows={4} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="file"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>File</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="file"
                                                onChange={(event) => field.onChange(event.target.files)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Upload</Button>
                        </form>
                    </Form>
                    <div></div>
                </div>
            </CardContent>
        </Card>
    );
};

export default UploadSheet;
